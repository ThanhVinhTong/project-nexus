"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeftIcon, UsersIcon, CalendarIcon, Cog6ToothIcon, ArrowTopRightOnSquareIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { KanbanBoard } from "@/components/KanbanBoard";
import { authService } from "@/lib/auth";

// Interfaces for data from backend
interface Project {
  projectId: number;
  title: string;
  description: string;
  status: string;
  deadline: string | null;
  createdAt: string;
  updatedAt: string;
  tasks: Task[];
  projectUsers: ProjectUser[];
  notes: Note[];
  references: Reference[];
  activities: Activity[];
}

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

interface ProjectUser {
  projectUserId: number;
  projectId: number;
  userId: number;
  userPermission: string;
  user: User;
}

interface User {
  userId: number;
  legalName: string;
  userName: string;
  email: string;
  role: string;
}

interface Note {
  noteId: number;
  projectId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface Reference {
  referenceId: number;
  projectId: number;
  referenceName: string;
  url: string | null;
  description: string | null;
  authors: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Activity {
  activityId: number;
  projectId: number;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProjectDetailPage() {
  const router = useRouter();
  const { id: projectId } = router.query;
  const projectIdNum = parseInt(projectId as string, 10) || 1;

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (authService.isAuthenticated() && projectIdNum) {
          const projectData = await authService.makeAuthenticatedRequest<Project>(`/api/projects/${projectIdNum}`);
          setProject(projectData);
        }
      } catch (error) {
        console.error('Failed to fetch project:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectIdNum]);

  // Helper function to get initials from name
  const getInitials = (name: string): string => {
    return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Project not found</h3>
          <p className="text-gray-600">The project you&apos;re looking for doesn&apos;t exist or you don&apos;t have access to it.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeftIcon className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl">{project.title}</h1>
            <p className="text-gray-600">Project Overview</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant={project.status === 'In Progress' ? 'default' : 'secondary'}>
            {project.status}
          </Badge>
          <Button variant="outline" size="sm">
            <Cog6ToothIcon className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Project Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Project Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{project.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                {project.deadline && (
                  <div className="flex items-center space-x-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span>Due: {new Date(project.deadline).toLocaleDateString('en-US')}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <UsersIcon className="w-4 h-4" />
                  <span>{project.projectUsers.length} team members</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Tasks</span>
                  <span>{project.tasks.length} total</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Notes</span>
                  <span>{project.notes.length} notes</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>References</span>
                  <span>{project.references.length} references</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {project.projectUsers.map((projectUser) => (
                  <div key={projectUser.projectUserId} className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>{getInitials(projectUser.user.legalName)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{projectUser.user.legalName}</p>
                      <p className="text-sm text-gray-600">{projectUser.userPermission}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="tasks" className="w-full">
        <TabsList>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="references">References</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="mt-6">
          <KanbanBoard projectId={projectId as string} onBack={() => { }} />
        </TabsContent>

        <TabsContent value="references" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Research References</CardTitle>
                <Button variant="outline">
                  <BookOpenIcon className="w-4 h-4 mr-2" />
                  Add Reference
                </Button>
              </div>
              <CardDescription>
                Essential articles and papers for this research project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.references.length > 0 ? (
                  project.references.map((reference) => (
                    <div key={reference.referenceId} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                            {reference.referenceName}
                          </h4>
                          {reference.authors && (
                            <p className="text-sm text-gray-600 mt-1">
                              {reference.authors}
                            </p>
                          )}
                          {reference.description && (
                            <p className="text-sm text-gray-700 mt-2">
                              {reference.description}
                            </p>
                          )}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500">
                                Added {new Date(reference.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            {reference.url && (
                              <a
                                href={reference.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                              >
                                View Article
                                <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <BookOpenIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No references added yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Notes</CardTitle>
                <Button variant="outline" onClick={() => router.push(`/projects/${projectId}/notes`)}>
                  Open Project Notes
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.notes.length > 0 ? (
                  project.notes.slice(0, 5).map((note) => (
                    <div key={note.noteId} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Note #{note.noteId}</h4>
                        <span className="text-sm text-gray-500">{new Date(note.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-600">{note.content.substring(0, 100)}...</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No notes added yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.activities.length > 0 ? (
                  project.activities.slice(0, 10).map((activity) => (
                    <div key={activity.activityId} className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>?</AvatarFallback>
                      </Avatar>
                      <div>
                        <p>{activity.message}</p>
                        <p className="text-sm text-gray-500">{new Date(activity.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No activity recorded yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}


