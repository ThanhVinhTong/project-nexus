"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MagnifyingGlassIcon, FunnelIcon, ArrowUpTrayIcon, ArrowDownTrayIcon, EyeIcon, DocumentTextIcon, DocumentIcon, FolderIcon } from "@heroicons/react/24/outline";
import { authService } from "@/lib/auth";

// Interface for reference data from backend
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

const getFileIcon = (type: string) => {
  switch (type) {
    case "FOLDER": return <FolderIcon className="w-5 h-5 text-blue-500" />;
    case "PDF": return <DocumentTextIcon className="w-5 h-5 text-red-500" />;
    default: return <DocumentIcon className="w-5 h-5 text-gray-500" />;
  }
};

export default function DocumentsPage() {
  const [references, setReferences] = useState<Reference[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchReferences = async () => {
      const sampleReferences = [
        {
          referenceId: 1,
          projectId: 1,
          referenceName: "OWASP Top 10 API Security Risks",
          url: "https://owasp.org/www-project-api-security/",
          description: "Critical security risks for modern web applications and APIs.",
          authors: "OWASP Foundation",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          referenceId: 2,
          projectId: 2,
          referenceName: "The State of AI Research 2026",
          url: "https://example.com/ai-report",
          description: "Comprehensive annual report on global artificial intelligence trends and breakthroughs.",
          authors: "Global Research Institute",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          referenceId: 3,
          projectId: 1,
          referenceName: "Microservices Architecture Patterns",
          url: "https://example.com/ms-patterns",
          description: "A deep dive into distributed systems and service-oriented architectures.",
          authors: "Chris Richardson",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];

      const setSampleData = () => {
        setReferences(sampleReferences);
      };

      try {
        if (authService.isAuthenticated()) {
          try {
            const referencesData = await authService.makeAuthenticatedRequest<Reference[]>('/api/references');
            if (Array.isArray(referencesData) && referencesData.length > 0) {
              setReferences(referencesData);
            } else {
              setSampleData();
            }
          } catch (e) {
            console.warn('API call failed, using sample reference data:', e);
            setSampleData();
          }
        }
      } catch (error) {
        console.error('Failed to fetch references:', error);
        setSampleData();
      } finally {
        setIsLoading(false);
      }
    };

    fetchReferences();
  }, []);

  const filteredReferences = references.filter(reference =>
    reference.referenceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (reference.description && reference.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (reference.authors && reference.authors.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse mx-auto mb-4"></div>
          <p className="text-gray-600">Loading references...</p>
        </div>
      </div>
    );
  }

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
            placeholder="Search references and documents..."
            className="pl-12 py-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="references" className="w-full">
        <TabsList>
          <TabsTrigger value="references">Research References</TabsTrigger>
          <TabsTrigger value="all">All Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="references" className="mt-6">
          <div className="space-y-4">
            {filteredReferences.length > 0 ? (
              filteredReferences.map((reference) => (
                <Card key={reference.referenceId} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <DocumentTextIcon className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <h4 className="font-medium text-blue-600 cursor-pointer hover:underline">
                            {reference.referenceName}
                          </h4>
                          {reference.authors && (
                            <p className="text-sm text-gray-600 mt-1">
                              Authors: {reference.authors}
                            </p>
                          )}
                          {reference.description && (
                            <p className="text-sm text-gray-600 mt-1">
                              {reference.description}
                            </p>
                          )}
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span>Project #{reference.projectId}</span>
                            <span>Added {new Date(reference.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {reference.url && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => window.open(reference.url!, '_blank')}
                            title="Open URL"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" title="Download">
                          <ArrowDownTrayIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  {searchTerm ? 'No references found' : 'No references available'}
                </h3>
                <p className="text-gray-500">
                  {searchTerm ? 'Try adjusting your search terms.' : 'References will appear here when added to projects.'}
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="all" className="mt-6">
          <div className="text-center py-12">
            <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">All Documents</h3>
            <p className="text-gray-500">This section will show all project documents and files</p>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
