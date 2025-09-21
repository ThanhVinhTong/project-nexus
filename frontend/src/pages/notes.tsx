"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { BookmarkIcon, EyeIcon, ClockIcon, MagnifyingGlassIcon, PlusIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/badge";
import { mockNotes } from "@/lib/mock-data";

export default function NotesPage() {
  const [selectedNote, setSelectedNote] = useState(mockNotes[0]);
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl">Notes Editor</h1>
          <p className="text-gray-600">Markdown-powered note taking</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => setIsPreview(!isPreview)}>
            <EyeIcon className="w-4 h-4 mr-2" />
            {isPreview ? 'Edit' : 'Preview'}
          </Button>
          <Button variant="outline">
            <ClockIcon className="w-4 h-4 mr-2" />
            History
          </Button>
          <Button>
            <BookmarkIcon className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      <div className="flex-1 flex bg-white rounded-lg border overflow-hidden">
        {/* Sidebar - Notes List */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Notes</h3>
              <Button size="sm">
                <PlusIcon className="w-4 h-4 mr-2" />
                New
              </Button>
            </div>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search notes..." 
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <div className="p-2 space-y-2">
              {mockNotes.map((note) => (
                <Card 
                  key={note.id} 
                  className={`cursor-pointer transition-colors ${
                    selectedNote.id === note.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedNote(note)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start space-x-2">
                      <DocumentTextIcon className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{note.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{new Date(note.updatedAt).toLocaleDateString('en-US')}</p>
                        <div className="flex gap-1 mt-2">
                          {note.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {note.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{note.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col">
          {/* Note Header */}
          <div className="bg-white border-b border-gray-200 p-4">
            <Input 
              value={selectedNote.title}
              className="text-xl font-medium border-none p-0 focus:ring-0"
              placeholder="Note title..."
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex gap-1">
                {selectedNote.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <span className="text-sm text-gray-500">Last modified {new Date(selectedNote.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Editor/Preview Area */}
          <div className="flex-1 bg-white">
            {isPreview ? (
              <div className="p-6 prose prose-gray max-w-none">
                <div 
                  className="markdown-content"
                  dangerouslySetInnerHTML={{
                    __html: selectedNote.content
                      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
                      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                      .replace(/^- (.*$)/gm, '<li>$1</li>')
                      .replace(/^\* (.*$)/gm, '<li>$1</li>')
                      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
                      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                      .replace(/\[x\] (.*$)/gm, '<input type="checkbox" checked disabled> $1')
                      .replace(/\[ \] (.*$)/gm, '<input type="checkbox" disabled> $1')
                      .replace(/\n/g, '<br>')
                  }}
                />
              </div>
            ) : (
              <div className="h-full">
                <Textarea 
                  value={selectedNote.content}
                  className="h-full resize-none border-none rounded-none focus:ring-0 p-6 font-mono text-sm"
                  placeholder="Start writing your notes in Markdown..."
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Tools */}
        <div className="w-64 bg-white border-l border-gray-200 p-4">
          <h3 className="font-medium mb-4">Markdown Guide</h3>
          <div className="space-y-3 text-sm">
            <div>
              <code className="bg-gray-100 px-2 py-1 rounded"># Heading 1</code>
              <p className="text-gray-600 mt-1">Large heading</p>
            </div>
            <div>
              <code className="bg-gray-100 px-2 py-1 rounded">## Heading 2</code>
              <p className="text-gray-600 mt-1">Medium heading</p>
            </div>
            <div>
              <code className="bg-gray-100 px-2 py-1 rounded">**bold**</code>
              <p className="text-gray-600 mt-1">Bold text</p>
            </div>
            <div>
              <code className="bg-gray-100 px-2 py-1 rounded">*italic*</code>
              <p className="text-gray-600 mt-1">Italic text</p>
            </div>
            <div>
              <code className="bg-gray-100 px-2 py-1 rounded">- Item</code>
              <p className="text-gray-600 mt-1">Bullet list</p>
            </div>
            <div>
              <code className="bg-gray-100 px-2 py-1 rounded">- [ ] Todo</code>
              <p className="text-gray-600 mt-1">Checkbox</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
