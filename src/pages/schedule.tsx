import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, ClockIcon, UserIcon, FlagIcon } from '@heroicons/react/24/outline';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { authService } from '@/lib/auth';

// Interface for task data from backend
interface Task {
  taskId: number;
  projectId: number;
  title: string;
  type: string | null;
  priority: string | null;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

// Interface for project data
interface Project {
  projectId: number;
  title: string;
}

interface ScheduleProps {
  onBack: () => void;
}

export function Schedule({ onBack }: ScheduleProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const sampleTasks = [
        {
          taskId: 1,
          projectId: 1,
          title: "Core API Review",
          type: "Review",
          priority: "high",
          dueDate: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          taskId: 2,
          projectId: 2,
          title: "Model Training Session",
          type: "Implementation",
          priority: "medium",
          dueDate: new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          taskId: 3,
          projectId: 3,
          title: "UI Component Library Audit",
          type: "Design",
          priority: "low",
          dueDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];

      const sampleProjects = [
        { projectId: 1, title: "Nexus Core Platform" },
        { projectId: 2, title: "AI Research Initiative" },
        { projectId: 3, title: "Website Revamp" }
      ];

      const setSampleData = () => {
        setTasks(sampleTasks);
        setProjects(sampleProjects);
      };

      try {
        if (authService.isAuthenticated()) {
          try {
            // Fetch tasks and projects in parallel
            const [tasksData, projectsData] = await Promise.all([
              authService.makeAuthenticatedRequest<Task[]>('/api/tasks'),
              authService.makeAuthenticatedRequest<Project[]>('/api/projects')
            ]);

            if (Array.isArray(tasksData) && tasksData.length > 0) {
              setTasks(tasksData);
            } else {
              setTasks(sampleTasks);
            }

            if (Array.isArray(projectsData) && projectsData.length > 0) {
              setProjects(projectsData);
            } else {
              setProjects(sampleProjects);
            }
          } catch (e) {
            console.warn('API call failed, using sample schedule data:', e);
            setSampleData();
          }
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setSampleData();
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format date to YYYY-MM-DD for comparison
  const formatDateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Get tasks for the selected date
  const selectedDateString = formatDateToString(selectedDate);
  const tasksForDate = tasks.filter(task => {
    if (!task.dueDate) return false;
    const taskDate = new Date(task.dueDate).toISOString().split('T')[0];
    return taskDate === selectedDateString;
  });

  // Sort tasks by due date time
  const sortedTasks = [...tasksForDate].sort((a, b) => {
    if (!a.dueDate || !b.dueDate) return 0;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  // Get project title by ID
  const getProjectTitle = (projectId: number): string => {
    const project = projects.find(p => p.projectId === projectId);
    return project ? project.title : `Project #${projectId}`;
  };

  // Format time to 12-hour format
  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Format selected date for display
  const formatDisplayDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  // Get priority color
  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  // Get status color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'done':
        return 'bg-green-50 border-green-200';
      case 'in-progress':
        return 'bg-blue-50 border-blue-200';
      case 'review':
        return 'bg-purple-50 border-purple-200';
      case 'todo':
        return 'bg-gray-50 border-gray-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  // Generate time slots for the day (6 AM to 10 PM)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 6; hour <= 22; hour++) {
      const time24 = `${String(hour).padStart(2, '0')}:00`;
      const time12 = formatTime(time24);
      slots.push({ time24, time12 });
    }
    return slots;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse mx-auto mb-4"></div>
          <p className="text-gray-600">Loading schedule...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1>Schedule</h1>
                <p className="text-gray-600 mt-1">View and manage task deadlines</p>
              </div>
            </div>
            <CalendarIcon className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-89px)]">
        {/* Left Sidebar - Calendar */}
        <div className="w-80 bg-white border-r border-gray-200 p-6">
          <div className="mb-6">
            <h3>Select Date</h3>
          </div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-md border"
          />

          {/* Quick Stats */}
          <div className="mt-6 space-y-3">
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-center justify-between">
                <span className="text-orange-900">Tasks Today</span>
                <span className="text-orange-600">
                  {tasksForDate.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Day View */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Date Header */}
            <div className="mb-6 bg-white rounded-lg border border-gray-200 p-6">
              <h2>{formatDisplayDate(selectedDate)}</h2>
              <p className="text-gray-600 mt-1">
                {tasksForDate.length} {tasksForDate.length === 1 ? 'task' : 'tasks'} scheduled
              </p>
            </div>

            {/* Tasks List */}
            {sortedTasks.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-gray-900 mb-2">No tasks scheduled</h3>
                <p className="text-gray-600">
                  There are no tasks with deadlines on this date.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {sortedTasks.map((task) => (
                  <div
                    key={task.taskId}
                    className="bg-white rounded-lg border-2 p-5 hover:shadow-md transition-shadow border-gray-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-start space-x-3">
                          {/* Time */}
                          <div className="flex items-center space-x-2 min-w-[100px]">
                            <ClockIcon className="w-5 h-5 text-gray-500" />
                            <span className="text-gray-900">
                              {task.dueDate ? formatTime(task.dueDate) : 'No time'}
                            </span>
                          </div>

                          {/* Task Details */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="text-gray-900 mb-1">{task.title}</h4>

                                {/* Meta Information */}
                                <div className="flex flex-wrap items-center gap-4">
                                  {/* Project */}
                                  <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                    <span className="text-gray-700">
                                      {getProjectTitle(task.projectId)}
                                    </span>
                                  </div>

                                  {/* Type */}
                                  {task.type && (
                                    <div className="flex items-center space-x-2 text-gray-600">
                                      <span className="text-sm">{task.type}</span>
                                    </div>
                                  )}

                                  {/* Priority */}
                                  {task.priority && (
                                    <div className="flex items-center space-x-2">
                                      <FlagIcon className="w-4 h-4" />
                                      <span
                                        className={`px-2 py-0.5 rounded border text-xs ${getPriorityColor(task.priority)}`}
                                      >
                                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedule;