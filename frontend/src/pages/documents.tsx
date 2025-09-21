"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MagnifyingGlassIcon, FunnelIcon, ArrowUpTrayIcon, ArrowDownTrayIcon, EyeIcon, DocumentTextIcon, DocumentIcon, FolderIcon } from "@heroicons/react/24/outline";

const mockFiles = [
  {
    id: "1",
    name: "Ethics Framework v2.pdf",
    type: "PDF",
    size: "2.4 MB",
    modified: "2 days ago",
    author: "Dr. Sarah Chen",
    tags: ["ethics", "framework", "healthcare"],
    category: "research"
  },
  {
    id: "2",
    name: "Data Analysis Report.docx",
    type: "DOC",
    size: "1.8 MB", 
    modified: "1 week ago",
    author: "Alex Rivera",
    tags: ["data", "analysis", "statistics"],
    category: "analysis"
  },
  {
    id: "3",
    name: "Literature Review - AI Bias.pdf",
    type: "PDF",
    size: "3.2 MB",
    modified: "3 days ago", 
    author: "Emily Johnson",
    tags: ["literature", "bias", "ai"],
    category: "research"
  },
  {
    id: "4",
    name: "Interview Transcripts",
    type: "FOLDER",
    size: "15 files",
    modified: "1 day ago",
    author: "Emily Johnson", 
    tags: ["interviews", "transcripts", "qualitative"],
    category: "data"
  },
  {
    id: "5",
    name: "Survey Responses.xlsx",
    type: "EXCEL",
    size: "890 KB",
    modified: "5 days ago",
    author: "Michael Kim",
    tags: ["survey", "responses", "data"],
    category: "data"
  },
  {
    id: "6",
    name: "Research Proposal Final.pdf",
    type: "PDF",
    size: "4.1 MB",
    modified: "2 weeks ago",
    author: "Dr. Sarah Chen",
    tags: ["proposal", "research", "final"],
    category: "documentation"
  }
];

const mockPapers = [
  {
    id: "1",
    title: "Ethical Considerations in Healthcare AI: A Systematic Review",
    authors: "Johnson, E., Smith, R., Chen, L.",
    journal: "Journal of Medical Ethics",
    year: "2024",
    citations: 42,
    tags: ["ethics", "healthcare", "ai", "systematic-review"]
  },
  {
    id: "2", 
    title: "Algorithmic Bias in Clinical Decision Support Systems",
    authors: "Rivera, A., Brown, M., Davis, K.",
    journal: "Nature Medicine",
    year: "2023",
    citations: 156,
    tags: ["bias", "clinical", "algorithms", "decision-support"]
  },
  {
    id: "3",
    title: "Patient Privacy in AI-Driven Healthcare: Current Challenges",
    authors: "Kim, M., Thompson, S., Wilson, J.",
    journal: "Health Affairs",
    year: "2024",
    citations: 23,
    tags: ["privacy", "ai", "healthcare", "challenges"]
  }
];

const getFileIcon = (type: string) => {
  switch (type) {
    case "FOLDER": return <FolderIcon className="w-5 h-5 text-blue-500" />;
    case "PDF": return <DocumentTextIcon className="w-5 h-5 text-red-500" />;
    default: return <DocumentIcon className="w-5 h-5 text-gray-500" />;
  }
};

export default function DocumentsPage() {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl">Document Hub</h1>
          <p className="text-gray-600">Research files and papers</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <ArrowUpTrayIcon className="w-4 h-4 mr-2" />
            Upload
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
            placeholder="Search files, papers, and documents..." 
            className="pl-12 py-3"
          />
        </div>
      </div>

      <Tabs defaultValue="files" className="w-full">
        <TabsList>
          <TabsTrigger value="files">Project Files</TabsTrigger>
          <TabsTrigger value="papers">Research Papers</TabsTrigger>
          <TabsTrigger value="shared">Shared with Me</TabsTrigger>
        </TabsList>
        
        <TabsContent value="files" className="mt-6">
          <div className="space-y-4">
            {mockFiles.map((file) => (
              <Card key={file.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getFileIcon(file.type)}
                      <div>
                        <h4 className="font-medium">{file.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{file.type} • {file.size}</span>
                          <span>Modified {file.modified}</span>
                          <span>by {file.author}</span>
                        </div>
                        <div className="flex gap-1 mt-2">
                          {file.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <EyeIcon className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <ArrowDownTrayIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="papers" className="mt-6">
          <div className="space-y-4">
            {mockPapers.map((paper) => (
              <Card key={paper.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-600 cursor-pointer hover:underline">
                        {paper.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {paper.authors} • {paper.journal} ({paper.year})
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>{paper.citations} citations</span>
                      </div>
                      <div className="flex gap-1 mt-3">
                        {paper.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <EyeIcon className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <ArrowDownTrayIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="shared" className="mt-6">
          <div className="text-center py-12">
            <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No shared files</h3>
            <p className="text-gray-500">Files shared with you will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
