"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, CheckCircleIcon, TrashIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockNotifications } from "@/lib/mock-data";

const mockUpdates = [
  {
    id: "1",
    type: "system",
    title: "New version available",
    message: "Research Hub v2.1 is now available with improved collaboration features",
    createdAt: "2024-01-15T10:00:00Z",
    read: false
  },
  {
    id: "2",
    type: "feature",
    title: "New integration: Zotero",
    message: "You can now sync your Zotero library with Document Hub",
    createdAt: "2024-01-08T14:30:00Z",
    read: true
  },
  {
    id: "3",
    type: "maintenance",
    title: "Scheduled maintenance",
    message: "System maintenance scheduled for Dec 20, 2024 from 2-4 AM EST",
    createdAt: "2024-01-01T09:00:00Z",
    read: true
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "info": return "💬";
    case "warning": return "📋";
    case "success": return "✅";
    case "error": return "❌";
    case "system": return "🔧";
    case "feature": return "✨";
    case "maintenance": return "⚠️";
    default: return "📢";
  }
};

const getRelativeTime = (dateString: string) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return "Just now";
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} days ago`;
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  return `${diffInWeeks} weeks ago`;
};

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
            <CheckCircleIcon className="w-4 h-4 mr-2" />
            Mark all read
          </Button>
          <Button variant="outline" size="sm">
            <Cog6ToothIcon className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="activity" className="w-full">
        <TabsList>
          <TabsTrigger value="activity">
            Activity
            <Badge variant="secondary" className="ml-2">
              {mockNotifications.filter(n => !n.read).length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="updates">
            Updates
            <Badge variant="secondary" className="ml-2">
              {mockUpdates.filter(n => !n.read).length}
            </Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="activity" className="mt-6">
          <div className="space-y-4 max-w-3xl">
            {mockNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`transition-colors ${
                  !notification.read ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {notification.title}
                            {!notification.read && (
                              <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                            )}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-2">{getRelativeTime(notification.createdAt)}</p>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          {notification.actionUrl && (
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          )}
                          <Button variant="ghost" size="icon" className="w-8 h-8">
                            <CheckIcon className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="w-8 h-8">
                            <TrashIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="updates" className="mt-6">
          <div className="space-y-4 max-w-3xl">
            {mockUpdates.map((update) => (
              <Card 
                key={update.id} 
                className={`transition-colors ${
                  !update.read ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                      {getNotificationIcon(update.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {update.title}
                            {!update.read && (
                              <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                            )}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">{update.message}</p>
                          <p className="text-xs text-gray-500 mt-2">{getRelativeTime(update.createdAt)}</p>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          <Button variant="ghost" size="icon" className="w-8 h-8">
                            <CheckIcon className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="w-8 h-8">
                            <TrashIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
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
