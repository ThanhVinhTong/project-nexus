"use client";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { MagnifyingGlassIcon, FunnelIcon, ArrowUpTrayIcon, ArrowDownTrayIcon, EyeIcon, DocumentTextIcon, DocumentIcon, FolderIcon } from "@heroicons/react/24/outline";

const mockUpcomingTasks = [
  {
    id: "1",
    title: "Review Ethics Framework",
    dueDate: "2025-09-23",
    project: "AI Ethics Research",
    assignee: "Dr. Sarah Chen",
    priority: "High",
    tags: ["review", "ethics"]
  },
  {
    id: "2",
    title: "Data Analysis Meeting",
    dueDate: "2025-09-25",
    project: "Climate Analysis",
    assignee: "Alex Rivera",
    priority: "Medium",
    tags: ["meeting", "data"]
  },
  {
    id: "3",
    title: "Submit Literature Review",
    dueDate: "2025-09-28",
    project: "AI Bias Study",
    assignee: "Emily Johnson",
    priority: "High",
    tags: ["submit", "review"]
  }
];

const mockEvents = [
  {
    id: "1",
    title: "Team Sync Meeting",
    date: "2025-09-22 10:00 AM",
    duration: "1 hour",
    participants: ["Sarah", "Alex", "Emily"],
    type: "meeting"
  },
  {
    id: "2",
    title: "Conference Presentation",
    date: "2025-10-05 2:00 PM",
    duration: "45 minutes",
    participants: ["Sarah"],
    type: "presentation"
  }
];

const mockCompleted = [
  {
    id: "1",
    title: "Initial Research Proposal",
    completedDate: "2025-09-15",
    project: "AI Ethics",
    assignee: "Team"
  }
];

export default function SchedulePage() {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl">Schedule</h1>
          <p className="text-gray-600">Upcoming tasks and events</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <ArrowUpTrayIcon className="w-4 h-4 mr-2" />
            Add Event
          </Button>
          <Button variant="outline">
            <FunnelIcon className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-2xl">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input 
            placeholder="Search tasks and events..." 
            className="pl-12 py-3"
          />
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Tasks</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-6">
          <div className="space-y-4">
            {mockUpcomingTasks.map((task) => (
              <Card key={task.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <DocumentTextIcon className="w-5 h-5 text-blue-500" />
                      <div>
                        <h4 className="font-medium">{task.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Due: {task.dueDate}</span>
                          <span>Project: {task.project}</span>
                          <span>Assignee: {task.assignee}</span>
                        </div>
                        <div className="flex gap-1 mt-2">
                          {task.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={task.priority === 'High' ? 'destructive' : 'secondary'}>
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="events" className="mt-6">
          <div className="space-y-4">
            {mockEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-600 cursor-pointer hover:underline">
                        {event.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {event.date} • {event.duration}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>Participants: {event.participants.join(", ")}</span>
                      </div>
                      <Badge variant="outline" className="mt-3">
                        {event.type}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <EyeIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          <div className="space-y-4">
            {mockCompleted.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-gray-600">
                    Completed: {item.completedDate} • Project: {item.project} • By: {item.assignee}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
