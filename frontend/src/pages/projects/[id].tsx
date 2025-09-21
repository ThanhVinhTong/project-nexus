"use client";

import { useRouter } from 'next/router';
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { ArrowLeftIcon, UsersIcon, CalendarIcon, Cog6ToothIcon, ArrowTopRightOnSquareIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { mockProjects, mockReferences } from "../../lib/mock-data";
import { KanbanBoard } from "@/components/KanbanBoard";

export default function ProjectDetailPage() {
  const router = useRouter();
  const { id: projectId } = router.query;
  
  // Find the project or use first one as fallback
  const mockProject = mockProjects.find(p => p.id === projectId) || mockProjects[0];
  
  const mockTeam = [
    { id: "1", name: "Dr. Sarah Chen", role: "Principal Investigator", initials: "SC" },
    { id: "2", name: "Alex Rivera", role: "Data Scientist", initials: "AR" },
    { id: "3", name: "Emily Johnson", role: "Ethics Researcher", initials: "EJ" },
    { id: "4", name: "Michael Kim", role: "Research Assistant", initials: "MK" }
  ];

  const mockRecentNotes = [
    { title: "Meeting Notes - Ethics Review", date: "Today", preview: "Discussed patient consent protocols..." },
    { title: "Literature Review Findings", date: "Yesterday", preview: "Key papers on AI bias in healthcare..." },
    { title: "Research Methodology", date: "2 days ago", preview: "Quantitative and qualitative approaches..." }
  ];

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeftIcon className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl">{mockProject.title}</h1>
            <p className="text-gray-600">Project Overview</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant={mockProject.status === 'active' ? 'default' : 'secondary'}>
            {mockProject.status}
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
              <p className="text-gray-700 mb-4">{mockProject.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Due: {new Date(mockProject.dueDate).toLocaleDateString('en-US')}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <UsersIcon className="w-4 h-4" />
                  <span>{mockProject.team.length} team members</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Progress</span>
                  <span>{mockProject.progress}%</span>
                </div>
                <Progress value={mockProject.progress} />
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
                {mockTeam.map((member) => (
                  <div key={member.id} className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.role}</p>
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
          <KanbanBoard projectId={projectId as string} onBack={() => {}} />
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
                {mockReferences.map((reference) => (
                  <div key={reference.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                          {reference.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {reference.authors.join(", ")} • {reference.journal} ({reference.year})
                        </p>
                        <p className="text-sm text-gray-700 mt-2">
                          {reference.abstract}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2">
                            {reference.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <a 
                            href={reference.url}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                          >
                            View Article
                            <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
                {mockRecentNotes.map((note, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{note.title}</h4>
                      <span className="text-sm text-gray-500">{note.date}</span>
                    </div>
                    <p className="text-gray-600">{note.preview}</p>
                  </div>
                ))}
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
                <div className="flex items-start space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p><span className="font-medium">Dr. Sarah Chen</span> added reference "Ethical Considerations in Healthcare AI"</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>AR</AvatarFallback>
                  </Avatar>
                  <div>
                    <p><span className="font-medium">Alex Rivera</span> completed "Data Analysis Report"</p>
                    <p className="text-sm text-gray-500">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>EJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p><span className="font-medium">Emily Johnson</span> added notes to Literature Review</p>
                    <p className="text-sm text-gray-500">2 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
