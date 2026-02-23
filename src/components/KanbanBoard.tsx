import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, EllipsisHorizontalIcon, CalendarIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { authService } from "@/lib/auth";

interface KanbanBoardProps {
  projectId: string;
  onBack: () => void;
}

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

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800"
};

export function KanbanBoard({ projectId, onBack }: KanbanBoardProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (authService.isAuthenticated()) {
          const tasksData = await authService.makeAuthenticatedRequest<Task[]>('/api/tasks');
          // Filter tasks for this project
          const projectTasks = tasksData.filter(task => task.projectId.toString() === projectId);
          setTasks(projectTasks);
        }
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [projectId]);

  // Group tasks by status (since we don't have status in the backend, we'll use a simple grouping)
  const todoTasks = tasks.slice(0, Math.ceil(tasks.length / 3));
  const inProgressTasks = tasks.slice(Math.ceil(tasks.length / 3), Math.ceil(tasks.length * 2 / 3));
  const doneTasks = tasks.slice(Math.ceil(tasks.length * 2 / 3));

  // Helper function to format due date
  const formatDueDate = (dateString: string | null): string => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Helper function to get initials from title
  const getInitials = (title: string): string => {
    return title.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeftIcon className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">Project Board</h1>
          </div>
          <Button>
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </header>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* To Do Column */}
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-700">To Do</h3>
              <Badge variant="secondary">{todoTasks.length}</Badge>
            </div>
            <div className="space-y-3">
              {todoTasks.map((task) => (
                <Card key={task.taskId} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{task.title}</h4>
                      <Button variant="ghost" size="icon" className="w-6 h-6">
                        <EllipsisHorizontalIcon className="w-4 h-4" />
                      </Button>
                    </div>

                    {task.type && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        <Badge variant="outline" className="text-xs">
                          {task.type}
                        </Badge>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">{getInitials(task.title)}</AvatarFallback>
                        </Avatar>
                        {task.priority && (
                          <Badge className={`text-xs ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                            {task.priority}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <CalendarIcon className="w-3 h-3 mr-1" />
                        {formatDueDate(task.dueDate)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full justify-start text-gray-500">
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>
          </div>

          {/* In Progress Column */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-blue-700">In Progress</h3>
              <Badge variant="secondary">{inProgressTasks.length}</Badge>
            </div>
            <div className="space-y-3">
              {inProgressTasks.map((task) => (
                <Card key={task.taskId} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{task.title}</h4>
                      <Button variant="ghost" size="icon" className="w-6 h-6">
                        <EllipsisHorizontalIcon className="w-4 h-4" />
                      </Button>
                    </div>

                    {task.type && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        <Badge variant="outline" className="text-xs">
                          {task.type}
                        </Badge>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">{getInitials(task.title)}</AvatarFallback>
                        </Avatar>
                        {task.priority && (
                          <Badge className={`text-xs ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                            {task.priority}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <CalendarIcon className="w-3 h-3 mr-1" />
                        {formatDueDate(task.dueDate)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full justify-start text-gray-500">
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>
          </div>

          {/* Done Column */}
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-green-700">Done</h3>
              <Badge variant="secondary">{doneTasks.length}</Badge>
            </div>
            <div className="space-y-3">
              {doneTasks.map((task) => (
                <Card key={task.taskId} className="cursor-pointer hover:shadow-md transition-shadow opacity-75">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium line-through">{task.title}</h4>
                      <Button variant="ghost" size="icon" className="w-6 h-6">
                        <EllipsisHorizontalIcon className="w-4 h-4" />
                      </Button>
                    </div>

                    {task.type && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        <Badge variant="outline" className="text-xs">
                          {task.type}
                        </Badge>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">{getInitials(task.title)}</AvatarFallback>
                        </Avatar>
                        {task.priority && (
                          <Badge className={`text-xs ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                            {task.priority}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <CalendarIcon className="w-3 h-3 mr-1" />
                        {formatDueDate(task.dueDate)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}