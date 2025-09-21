import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeftIcon, PlusIcon, EllipsisHorizontalIcon, CalendarIcon, UserIcon } from "@heroicons/react/24/outline";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface KanbanBoardProps {
  projectId: string;
  onBack: () => void;
}

const mockTasks = {
  todo: [
    {
      id: "1",
      title: "Literature Review - AI Bias Papers",
      description: "Review recent papers on algorithmic bias in healthcare AI systems",
      priority: "high",
      assignee: { name: "Emily Johnson", initials: "EJ" },
      dueDate: "Dec 20",
      labels: ["research", "literature"]
    },
    {
      id: "2", 
      title: "Survey Design",
      description: "Create patient survey for ethics perception study",
      priority: "medium",
      assignee: { name: "Michael Kim", initials: "MK" },
      dueDate: "Dec 18",
      labels: ["survey", "design"]
    },
    {
      id: "3",
      title: "IRB Approval Documentation",
      description: "Prepare ethics review board submission",
      priority: "high",
      assignee: { name: "Dr. Sarah Chen", initials: "SC" },
      dueDate: "Dec 15",
      labels: ["approval", "documentation"]
    }
  ],
  inProgress: [
    {
      id: "4",
      title: "Data Collection - Hospital A",
      description: "Collecting anonymized patient data from partner hospital",
      priority: "high",
      assignee: { name: "Alex Rivera", initials: "AR" },
      dueDate: "Dec 22",
      labels: ["data", "collection"]
    },
    {
      id: "5",
      title: "Interview Analysis",
      description: "Transcribe and analyze healthcare provider interviews",
      priority: "medium",
      assignee: { name: "Emily Johnson", initials: "EJ" },
      dueDate: "Dec 25",
      labels: ["interviews", "analysis"]
    }
  ],
  done: [
    {
      id: "6",
      title: "Ethics Framework Development",
      description: "Created comprehensive ethics evaluation framework",
      priority: "high",
      assignee: { name: "Dr. Sarah Chen", initials: "SC" },
      dueDate: "Dec 10",
      labels: ["framework", "ethics"]
    },
    {
      id: "7",
      title: "Research Proposal",
      description: "Finalized and submitted research proposal",
      priority: "high",
      assignee: { name: "Dr. Sarah Chen", initials: "SC" },
      dueDate: "Nov 30",
      labels: ["proposal", "documentation"]
    },
    {
      id: "8",
      title: "Team Formation",
      description: "Assembled research team and defined roles",
      priority: "medium",
      assignee: { name: "Dr. Sarah Chen", initials: "SC" },
      dueDate: "Nov 25",
      labels: ["team", "planning"]
    }
  ]
};

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800", 
  low: "bg-green-100 text-green-800"
};

export function KanbanBoard({ projectId, onBack }: KanbanBoardProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Button>
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Task
      </Button>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* To Do Column */}
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-700">To Do</h3>
              <Badge variant="secondary">{mockTasks.todo.length}</Badge>
            </div>
            <div className="space-y-3">
              {mockTasks.todo.map((task) => (
                <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{task.title}</h4>
                      <Button variant="ghost" size="icon" className="w-6 h-6">
                        <EllipsisHorizontalIcon className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {task.labels.map((label) => (
                        <Badge key={label} variant="outline" className="text-xs">
                          {label}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">{task.assignee.initials}</AvatarFallback>
                        </Avatar>
                        <Badge className={`text-xs ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                          {task.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <CalendarIcon className="w-3 h-3 mr-1" />
                        {task.dueDate}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full justify-start text-gray-500">
                <PlusIcon className="w-4 h-4 mr-2" />
                1, 2, 3
              </Button>
            </div>
          </div>

          {/* In Progress Column */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-blue-700">In Progress</h3>
              <Badge variant="secondary">{mockTasks.inProgress.length}</Badge>
            </div>
            <div className="space-y-3">
              {mockTasks.inProgress.map((task) => (
                <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{task.title}</h4>
                      <Button variant="ghost" size="icon" className="w-6 h-6">
                        <EllipsisHorizontalIcon className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {task.labels.map((label) => (
                        <Badge key={label} variant="outline" className="text-xs">
                          {label}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">{task.assignee.initials}</AvatarFallback>
                        </Avatar>
                        <Badge className={`text-xs ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                          {task.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <CalendarIcon className="w-3 h-3 mr-1" />
                        {task.dueDate}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full justify-start text-gray-500">
                <PlusIcon className="w-4 h-4 mr-2" />
                View more tasks
              </Button>
            </div>
          </div>

          {/* Done Column */}
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-green-700">Done</h3>
              <Badge variant="secondary">{mockTasks.done.length}</Badge>
            </div>
            <div className="space-y-3">
              {mockTasks.done.map((task) => (
                <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow opacity-75">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium line-through">{task.title}</h4>
                      <Button variant="ghost" size="icon" className="w-6 h-6">
                        <EllipsisHorizontalIcon className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {task.labels.map((label) => (
                        <Badge key={label} variant="outline" className="text-xs">
                          {label}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">{task.assignee.initials}</AvatarFallback>
                        </Avatar>
                        <Badge className={`text-xs ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                          {task.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <CalendarIcon className="w-3 h-3 mr-1" />
                        {task.dueDate}
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