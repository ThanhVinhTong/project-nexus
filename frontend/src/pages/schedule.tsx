import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, ClockIcon, UserIcon, FlagIcon } from '@heroicons/react/24/outline';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

// Mock data for tasks
const mockTasks = [
  // October 8, 2025 (Today)
  {
    id: "1",
    title: "Ethics Committee Meeting",
    description: "Present findings to ethics review board",
    status: "done",
    assignee: "Dr. Sarah Chen",
    priority: "high",
    dueDate: "2025-10-08",
    dueTime: "09:00",
    projectId: "1"
  },
  {
    id: "2",
    title: "Team Sync Meeting",
    description: "Weekly project status update",
    status: "in-progress",
    assignee: "All Team",
    priority: "medium",
    dueDate: "2025-10-08",
    dueTime: "11:00",
    projectId: "1"
  },
  {
    id: "3",
    title: "Literature Review",
    description: "Review existing research on AI ethics frameworks",
    status: "todo",
    assignee: "Maya Patel",
    priority: "high",
    dueDate: "2025-10-08",
    dueTime: "14:00",
    projectId: "1"
  },
  {
    id: "4",
    title: "Statistical Analysis",
    description: "Run regression models on collected data",
    status: "todo",
    assignee: "Lisa Wong",
    priority: "high",
    dueDate: "2025-10-08",
    dueTime: "16:30",
    projectId: "2"
  },
  // October 9, 2025
  {
    id: "5",
    title: "Data Collection",
    description: "Gather climate data from weather stations",
    status: "todo",
    assignee: "David Kim",
    priority: "medium",
    dueDate: "2025-10-09",
    dueTime: "10:30",
    projectId: "2"
  },
  {
    id: "6",
    title: "Data Validation",
    description: "Verify accuracy of climate measurements",
    status: "in-progress",
    assignee: "Prof. Michael Green",
    priority: "high",
    dueDate: "2025-10-09",
    dueTime: "13:00",
    projectId: "2"
  },
  {
    id: "7",
    title: "Research Paper Outline",
    description: "Draft outline for publication",
    status: "todo",
    assignee: "Dr. Sarah Chen",
    priority: "medium",
    dueDate: "2025-10-09",
    dueTime: "15:30",
    projectId: "1"
  },
  // October 10, 2025
  {
    id: "8",
    title: "Algorithm Design Review",
    description: "Review quantum algorithm specifications",
    status: "done",
    assignee: "Dr. Emily Watson",
    priority: "high",
    dueDate: "2025-10-10",
    dueTime: "10:00",
    projectId: "3"
  },
  {
    id: "9",
    title: "Grant Proposal Draft",
    description: "Complete first draft of NSF grant proposal",
    status: "in-progress",
    assignee: "Alex Rodriguez",
    priority: "high",
    dueDate: "2025-10-10",
    dueTime: "14:00",
    projectId: "1"
  },
  // October 11, 2025
  {
    id: "10",
    title: "Code Review Session",
    description: "Review implementation of data processing pipeline",
    status: "todo",
    assignee: "James Liu",
    priority: "medium",
    dueDate: "2025-10-11",
    dueTime: "11:00",
    projectId: "3"
  },
  // October 12, 2025
  {
    id: "11",
    title: "Workshop Preparation",
    description: "Prepare materials for AI ethics workshop",
    status: "todo",
    assignee: "Maya Patel",
    priority: "high",
    dueDate: "2025-10-12",
    dueTime: "09:00",
    projectId: "1"
  },
  {
    id: "12",
    title: "Climate Model Testing",
    description: "Run validation tests on climate prediction model",
    status: "todo",
    assignee: "Lisa Wong",
    priority: "medium",
    dueDate: "2025-10-12",
    dueTime: "13:30",
    projectId: "2"
  },
  // October 15, 2025
  {
    id: "13",
    title: "Algorithm Implementation",
    description: "Implement quantum optimization algorithm",
    status: "in-progress",
    assignee: "James Liu",
    priority: "high",
    dueDate: "2025-10-15",
    dueTime: "10:00",
    projectId: "3"
  },
  {
    id: "14",
    title: "Stakeholder Meeting",
    description: "Present project updates to stakeholders",
    status: "todo",
    assignee: "All Team",
    priority: "high",
    dueDate: "2025-10-15",
    dueTime: "15:00",
    projectId: "2"
  },
  // October 20, 2025
  {
    id: "15",
    title: "Final Report Review",
    description: "Review and finalize quarterly progress report",
    status: "todo",
    assignee: "Dr. Sarah Chen",
    priority: "high",
    dueDate: "2025-10-20",
    dueTime: "11:00",
    projectId: "1"
  }
];

// Project titles mapping
const projectTitles: { [key: string]: string } = {
  "1": "AI Ethics Research",
  "2": "Climate Change Analysis", 
  "3": "Quantum Computing Study"
};

interface ScheduleProps {
  onBack: () => void;
}

export function Schedule({ onBack }: ScheduleProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Format date to YYYY-MM-DD for comparison
  const formatDateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Get tasks for the selected date
  const selectedDateString = formatDateToString(selectedDate);
  const tasksForDate = mockTasks.filter(task => task.dueDate === selectedDateString);
  
  // Sort tasks by time
  const sortedTasks = [...tasksForDate].sort((a, b) => {
    const timeA = a.dueTime || '00:00';
    const timeB = b.dueTime || '00:00';
    return timeA.localeCompare(timeB);
  });

  // Format time to 12-hour format
  const formatTime = (time24: string): string => {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${hour12}:${minutes} ${period}`;
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

  const timeSlots = generateTimeSlots();

  // Get tasks for a specific hour
  const getTasksForHour = (hour: number) => {
    return sortedTasks.filter(task => {
      if (!task.dueTime) return false;
      const taskHour = parseInt(task.dueTime.split(':')[0]);
      return taskHour === hour;
    });
  };

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
                <span className="text-orange-900">Unfinished Tasks</span>
                <span className="text-orange-600">
                  {tasksForDate.filter(t => t.status !== 'done').length}
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
                    key={task.id}
                    className={`bg-white rounded-lg border-2 p-5 hover:shadow-md transition-shadow ${getStatusColor(task.status)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-start space-x-3">
                          {/* Time */}
                          <div className="flex items-center space-x-2 min-w-[100px]">
                            <ClockIcon className="w-5 h-5 text-gray-500" />
                            <span className="text-gray-900">
                              {task.dueTime ? formatTime(task.dueTime) : 'No time'}
                            </span>
                          </div>

                          {/* Task Details */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="text-gray-900 mb-1">{task.title}</h4>
                                <p className="text-gray-600 mb-3">{task.description}</p>
                                
                                {/* Meta Information */}
                                <div className="flex flex-wrap items-center gap-4">
                                  {/* Project */}
                                  <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                    <span className="text-gray-700">
                                      {projectTitles[task.projectId] || 'Unknown Project'}
                                    </span>
                                  </div>

                                  {/* Assignee */}
                                  <div className="flex items-center space-x-2 text-gray-600">
                                    <UserIcon className="w-4 h-4" />
                                    <span>{task.assignee}</span>
                                  </div>

                                  {/* Priority */}
                                  <div className="flex items-center space-x-2">
                                    <FlagIcon className="w-4 h-4" />
                                    <span
                                      className={`px-2 py-0.5 rounded border text-xs ${getPriorityColor(task.priority)}`}
                                    >
                                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                    </span>
                                  </div>

                                  {/* Status */}
                                  <div className="px-2 py-0.5 bg-white rounded border border-gray-300 text-xs text-gray-700">
                                    {task.status === 'in-progress' ? 'In Progress' : 
                                     task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                                  </div>
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