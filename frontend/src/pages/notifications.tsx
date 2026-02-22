"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, CheckCircleIcon, TrashIcon, Cog6ToothIcon, BellIcon } from "@heroicons/react/24/outline";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function NotificationsPage() {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl">Notifications</h1>
          <p className="text-gray-600">Stay updated on your projects</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Cog6ToothIcon className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="important">Important</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-4">
            {[
              {
                id: 1,
                title: "New Task Assigned",
                message: "You've been assigned to 'Review API documentation' in Nexus Core Platform.",
                time: "10 minutes ago",
                unread: true,
                type: "task"
              },
              {
                id: 2,
                title: "Project Milestone Reached",
                message: "AI Research Initiative project has reached 50% completion.",
                time: "2 hours ago",
                unread: true,
                type: "project"
              },
              {
                id: 3,
                title: "Meeting Reminder",
                message: "Strategic planning meeting starts in 30 minutes.",
                time: "30 minutes ago",
                unread: false,
                type: "meeting"
              },
              {
                id: 4,
                title: "Note Updated",
                message: "Carol Singh updated the note 'Research Methodology'.",
                time: "1 day ago",
                unread: false,
                type: "note"
              }
            ].map((notification) => (
              <Card key={notification.id} className={`${notification.unread ? 'border-l-4 border-l-blue-600 bg-blue-50/30' : 'bg-white'} border-0 shadow-sm overflow-hidden`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${notification.type === 'task' ? 'bg-orange-100 text-orange-600' :
                          notification.type === 'project' ? 'bg-green-100 text-green-600' :
                            notification.type === 'meeting' ? 'bg-blue-100 text-blue-600' :
                              'bg-purple-100 text-purple-600'
                        }`}>
                        <BellIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <span className="text-xs text-gray-400 mt-2 block">{notification.time}</span>
                      </div>
                    </div>
                    {notification.unread && (
                      <Badge variant="default" className="bg-blue-600">New</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
