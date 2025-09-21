"use client";

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PlusIcon, MagnifyingGlassIcon, DocumentTextIcon, UsersIcon, CalendarIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { mockProjects } from "@/lib/mock-data";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <>
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            placeholder="Search projects..." 
            className="pl-10"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl">Quick Actions</h2>
          <Button onClick={() => router.push('/projects/new')}>
            <PlusIcon className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push('/documents')}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <DocumentTextIcon className="w-8 h-8 text-blue-600" />
                <div>
                  <h3>Reference Library</h3>
                  <p className="text-sm text-gray-600">Browse research papers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push('/notes')}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <PencilSquareIcon className="w-8 h-8 text-green-600" />
                <div>
                  <h3>Notes Editor</h3>
                  <p className="text-sm text-gray-600">Create & edit notes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <CalendarIcon className="w-8 h-8 text-purple-600" />
                <div>
                  <h3>Schedule</h3>
                  <p className="text-sm text-gray-600">View deadlines</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Projects Grid */}
      <div>
        <h2 className="text-xl mb-4">Your Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProjects.map((project) => (
            <Card 
              key={project.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => router.push(`/projects/${project.id}`)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                    {project.status}
                  </Badge>
                </div>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <UsersIcon className="w-4 h-4" />
                      <span>{project.team.length} members</span>
                    </div>
                    <span>Due {new Date(project.dueDate).toLocaleDateString('en-US')}</span>
                  </div>
                  
                  <div className="flex space-x-4 text-sm">
                    <span className="text-gray-600">Status: {project.status}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
