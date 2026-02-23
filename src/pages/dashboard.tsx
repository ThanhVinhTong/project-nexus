"use client";

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PlusIcon, MagnifyingGlassIcon, DocumentTextIcon, UsersIcon, CalendarIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { authService, User } from "@/lib/auth";

// Interface for project data from backend
interface Project {
  projectId: number;
  title: string;
  description: string;
  status: string;
  deadline: string | null;
  createdAt: string;
  updatedAt: string;
  tasks: number[];
  projectUsers: number[];
  notes: number[];
  references: number[];
  activities: number[];
  category?: string; // Added for demo
}

const PROJECT_CATEGORIES = [
  "Social Sciences",
  "Natural Sciences",
  "Engineering",
  "Arts & Humanities",
  "Medicine",
  "Business & Economics"
];

const getProjectCategory = (id: number) => {
  return PROJECT_CATEGORIES[id % PROJECT_CATEGORIES.length];
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [projectsLoading, setProjectsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Define sample data
      const sampleProjects = [
        {
          projectId: 1,
          title: "Nexus Core Platform",
          description: "Foundational services and APIs for Project Nexus. This includes authentication, data management, and core services.",
          status: "In Progress",
          deadline: new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000).toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          tasks: [1, 2, 3, 4, 5],
          projectUsers: [1, 2, 3, 4],
          notes: [1, 2],
          references: [1],
          activities: [1, 2, 3]
        },
        {
          projectId: 2,
          title: "AI Research Initiative",
          description: "Exploratory research on ML models for Nexus. Focusing on natural language processing and predictive analytics.",
          status: "In Progress",
          deadline: new Date(new Date().getTime() + 120 * 24 * 60 * 60 * 1000).toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          tasks: [1, 2, 3],
          projectUsers: [1, 3],
          notes: [],
          references: [1, 2],
          activities: [1]
        },
        {
          projectId: 3,
          title: "Website Revamp",
          description: "Full redesign of the research portal with focus on user experience and data visualization components.",
          status: "Completed",
          deadline: new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          tasks: [1, 2, 3, 4],
          projectUsers: [1, 2, 5],
          notes: [1],
          references: [],
          activities: [1, 2]
        }
      ];

      const setSampleData = () => {
        const projectsWithCategories = sampleProjects.map(p => ({
          ...p,
          category: getProjectCategory(p.projectId)
        }));
        setProjects(projectsWithCategories);
      };

      try {
        if (authService.isAuthenticated()) {
          // Fetch user profile
          const userProfile = await authService.getProfile();
          setUser(userProfile);

          // Fetch projects
          try {
            const projectsData = await authService.makeAuthenticatedRequest<Project[]>('/api/projects');
            if (Array.isArray(projectsData) && projectsData.length > 0) {
              const projectsWithCategories = projectsData.map(p => ({
                ...p,
                category: getProjectCategory(p.projectId)
              }));
              setProjects(projectsWithCategories);
            } else {
              setSampleData();
            }
          } catch (e) {
            console.warn('API call failed, using sample data:', e);
            setSampleData();
          }
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        setSampleData();
      } finally {
        setIsLoading(false);
        setProjectsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Ensure we always operate on an array for rendering
  const projectList = Array.isArray(projects) ? projects : [];

  return (
    <>
      {/* Categories & Search */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative max-w-lg flex-1">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search projects, notes, or references..."
            className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
          />
        </div>

        <div className="flex overflow-x-auto pb-2 md:pb-0 space-x-2 scrollbar-hide">
          <Badge className="px-4 py-2 rounded-full cursor-pointer bg-blue-600 text-white border-0">All</Badge>
          {PROJECT_CATEGORIES.slice(0, 4).map(cat => (
            <Badge key={cat} variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-gray-100 border-gray-300 text-gray-700">{cat}</Badge>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Stats Overview</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Active Projects</p>
                  <p className="text-3xl font-bold text-blue-900">{projectList.filter(p => p.status === 'In Progress').length}</p>
                </div>
                <div className="p-3 bg-blue-200 rounded-full">
                  <DocumentTextIcon className="w-6 h-6 text-blue-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Completed</p>
                  <p className="text-3xl font-bold text-green-900">{projectList.filter(p => p.status === 'Completed').length}</p>
                </div>
                <div className="p-3 bg-green-200 rounded-full">
                  <CalendarIcon className="w-6 h-6 text-green-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Team Members</p>
                  <p className="text-3xl font-bold text-purple-900">
                    {projectList.reduce((acc, project) => acc + (project.projectUsers?.length ?? 0), 0)}
                  </p>
                </div>
                <div className="p-3 bg-purple-200 rounded-full">
                  <UsersIcon className="w-6 h-6 text-purple-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">Total Tasks</p>
                  <p className="text-3xl font-bold text-orange-900">
                    {projectList.reduce((acc, project) => acc + (project.tasks?.length ?? 0), 0)}
                  </p>
                </div>
                <div className="p-3 bg-orange-200 rounded-full">
                  <PencilSquareIcon className="w-6 h-6 text-orange-700" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Projects Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Your Projects</h2>
          <Button
            onClick={() => router.push('/projects/new')}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
        {projectsLoading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse mx-auto mb-4"></div>
            <p className="text-gray-600">Loading projects...</p>
          </div>
        ) : projectList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectList.map((project) => (
              <Card
                key={project.projectId}
                className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg group"
                onClick={() => router.push(`/projects/${project.projectId}`)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </CardTitle>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge
                        variant={project.status === 'In Progress' ? 'default' : 'secondary'}
                        className={`${project.status === 'In Progress'
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          } transition-colors`}
                      >
                        {project.status}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] uppercase tracking-wider text-blue-600 border-blue-200 bg-blue-50">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600 line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-gray-700">Tasks</span>
                        <span className="font-semibold text-gray-900">{project.tasks.length}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-gray-700">Team Members</span>
                        <span className="font-semibold text-gray-900">{project.projectUsers.length}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <UsersIcon className="w-4 h-4 text-gray-500" />
                        <span>{project.projectUsers.length} members</span>
                      </div>
                      {project.deadline && (
                        <span className="font-medium">
                          Due {new Date(project.deadline).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      )}
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                          {project.status}
                        </span>
                        <div className="flex items-center space-x-1">
                          <div className={`w-2 h-2 rounded-full ${project.status === 'In Progress' ? 'bg-green-500' : 'bg-gray-400'
                            }`}></div>
                          <span className="text-xs text-gray-500">
                            {project.status === 'In Progress' ? 'Active' : 'Done'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <DocumentTextIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first project</p>
            <Button
              onClick={() => router.push('/projects/new')}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Create Your First Project
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
