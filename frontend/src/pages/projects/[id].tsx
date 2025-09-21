"use client";

import { useRouter } from 'next/router';
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { ArrowLeftIcon, UsersIcon, CalendarIcon, Cog6ToothIcon, ArrowTopRightOnSquareIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { KanbanBoard } from "@/components/KanbanBoard";

export default function ProjectDetailPage() {
  const mockData = {
    "projects": [
      {
        "Id": 1,
        "Title": "AI Ethics in Healthcare",
        "Description": "Research on ethical implications of AI in medical decisions",
        "Deadline": "2025-12-31T00:00:00Z",
        "Status": "planning",
        "progress": 30, // Added for frontend
        "team": ["Dr. Sarah Chen", "Alex Rivera"] // Added for frontend
      },
      {
        "Id": 2,
        "Title": "Climate Data Analysis",
        "Description": "Analyzing climate patterns using big data",
        "Deadline": "2026-03-15T00:00:00Z",
        "Status": "in-progress",
        "progress": 60, // Added for frontend
        "team": ["Prof. Michael Green", "Lisa Wong"] // Added for frontend
      }
    ],
    "tasks": [
      {
        "Id": 1,
        "ProjectId": 1,
        "UserName": 101,
        "Title": "Review Literature",
        "Status": "Pending",
        "Priority": "High",
        "DueDate": "2025-10-15T00:00:00Z"
      },
      {
        "Id": 2,
        "ProjectId": 1,
        "UserName": 102,
        "Title": "Collect Data Samples",
        "Status": "In Progress",
        "Priority": "Default",
        "DueDate": "2025-11-01T00:00:00Z"
      },
      {
        "Id": 3,
        "ProjectId": 2,
        "UserName": 101,
        "Title": "Analyze Temperature Data",
        "Status": "Pending",
        "Priority": "Medium",
        "DueDate": "2025-10-30T00:00:00Z"
      }
    ],
    "references": [
      {
        "Id": 1,
        "ProjectId": 1,
        "FileName": "ai_ethics.pdf",
        "Url": "https://example.com/ai_ethics.pdf",
        "Description": "Paper on AI ethics in healthcare",
        "Authors": ["John Doe", "Jane Smith"]
      },
      {
        "Id": 2,
        "ProjectId": 2,
        "FileName": "climate_report.docx",
        "Url": "https://example.com/climate_report.docx",
        "Description": "Annual climate change report",
        "Authors": ["Climate Org"]
      }
    ],
    "notes": [
      {
        "Id": 1,
        "ProjectId": 1,
        "Content": "Note about initial project meeting: Discussed scope and timelines.",
        "CreatedAt": "2025-09-21T00:00:00Z"
      },
      {
        "Id": 2,
        "ProjectId": 1,
        "Content": "Reminder: Schedule ethics review for next week.",
        "CreatedAt": "2025-09-21T00:00:00Z"
      },
      {
        "Id": 3,
        "ProjectId": 2,
        "Content": "Data sources to check: NOAA and EPA databases.",
        "CreatedAt": "2025-09-21T00:00:00Z"
      }
    ],
    "activities": [
      {
        "Id": 1,
        "ProjectId": 1,
        "Message": "Project AI Ethics in Healthcare created",
        "CreatedAt": "2025-09-21T00:00:00Z"
      },
      {
        "Id": 2,
        "ProjectId": 1,
        "Message": "Added task: Review Literature",
        "CreatedAt": "2025-09-21T01:00:00Z"
      },
      {
        "Id": 3,
        "ProjectId": 2,
        "Message": "Project Climate Data Analysis started",
        "CreatedAt": "2025-09-21T02:00:00Z"
      },
      {
        "Id": 4,
        "ProjectId": 2,
        "Message": "Reference added: climate_report.docx",
        "CreatedAt": "2025-09-21T03:00:00Z"
      }
    ]
  };

  const router = useRouter();
  const { id: projectId } = router.query;
  const projectIdNum = parseInt(projectId as string, 10) || 1;

  // Find the project
  const mockProject = mockData.projects.find(p => p.Id === projectIdNum) || mockData.projects[0];

  // Mock team (kept as is, or adapt if needed)
  const mockTeam = [
    { id: "1", name: "Dr. Sarah Chen", role: "Principal Investigator", initials: "SC" },
    { id: "2", name: "Alex Rivera", role: "Data Scientist", initials: "AR" },
    { id: "3", name: "Emily Johnson", role: "Ethics Researcher", initials: "EJ" },
    { id: "4", name: "Michael Kim", role: "Research Assistant", initials: "MK" }
  ];

  // Recent notes from mockData
  const mockRecentNotes = mockData.notes
    .filter(n => n.ProjectId === mockProject.Id)
    .map(n => ({
      title: `Note ${n.Id}`,
      date: new Date(n.CreatedAt).toLocaleDateString('en-US'),
      preview: n.Content.substring(0, 50) + '...'
    }));

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeftIcon className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl">{mockProject.Title}</h1>
            <p className="text-gray-600">Project Overview</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant={mockProject.Status === 'planning' ? 'default' : 'secondary'}>
            {mockProject.Status}
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
              <p className="text-gray-700 mb-4">{mockProject.Description}</p>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Due: {new Date(mockProject.Deadline).toLocaleDateString('en-US')}</span>
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
                {mockData.references
                  .filter(r => r.ProjectId === mockProject.Id)
                  .map((reference) => (
                    <div key={reference.Id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                            {reference.FileName}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {reference.Authors.join(", ")} • (Mock Journal) ({new Date().getFullYear()})
                          </p>
                          <p className="text-sm text-gray-700 mt-2">
                            {reference.Description}
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center space-x-2">
                              {/* Tags are not available in mockData, so empty */}
                            </div>
                            <a 
                              href={reference.Url}
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
                {mockData.activities
                  .filter(a => a.ProjectId === mockProject.Id)
                  .map((activity) => (
                    <div key={activity.Id} className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>?</AvatarFallback>
                      </Avatar>
                      <div>
                        <p>{activity.Message}</p>
                        <p className="text-sm text-gray-500">{new Date(activity.CreatedAt).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
