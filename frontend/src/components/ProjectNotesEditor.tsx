import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { ArrowLeftIcon, BookmarkIcon, EyeIcon, ClockIcon, MagnifyingGlassIcon, PlusIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { Badge } from "./ui/badge";
import { useState } from "react";

interface ProjectNotesEditorProps {
  projectId: string;
  projectTitle: string;
  onBack: () => void;
}

const getProjectNotes = (projectId: string) => {
  const projectNotesMap: { [key: string]: any[] } = {
    "1": [ // AI Ethics Research
      {
        id: "p1-1",
        title: "Ethics Review Meeting Notes",
        content: "# Ethics Review Committee Meeting\\n\\n## Date: December 10, 2024\\n\\n## Attendees\\n- Dr. Sarah Chen (Principal Investigator)\\n- Emily Johnson (Ethics Researcher)\\n- Dr. Michael Roberts (Ethics Committee Chair)\\n\\n## Key Discussion Points\\n\\n### Patient Consent Protocols\\n- Current consent forms need revision for AI-specific language\\n- Must clearly explain how AI algorithms will use patient data\\n- Need multilingual versions for diverse patient population\\n\\n### Data Anonymization Standards\\n- Implement k-anonymity with k≥5\\n- Remove direct identifiers and quasi-identifiers\\n- Use differential privacy for statistical queries\\n\\n### Review Timeline\\n- Initial review: 2 weeks from submission\\n- Revisions (if needed): 1 week turnaround\\n- Final approval expected by December 24\\n\\n## Action Items\\n\\n- [ ] Update consent forms with AI-specific language (Emily)\\n- [ ] Prepare data anonymization protocol document (Alex)\\n- [x] Schedule follow-up meeting with IRB (Sarah)\\n- [ ] Draft patient information sheet (Michael)\\n\\n## Next Steps\\n\\nResubmit documents to IRB by December 15 with all requested modifications.",
        lastModified: "2 hours ago",
        tags: ["meeting", "ethics", "IRB", "consent"]
      },
      {
        id: "p1-2",
        title: "AI Bias Literature Analysis",
        content: "# Literature Review: AI Bias in Healthcare\\n\\n## Systematic Review Protocol\\n\\n### Search Strategy\\n**Databases:** PubMed, IEEE Xplore, ACM Digital Library, Google Scholar\\n**Keywords:** \\\"artificial intelligence\\\", \\\"machine learning\\\", \\\"healthcare\\\", \\\"bias\\\", \\\"fairness\\\", \\\"ethics\\\"\\n**Date Range:** 2020-2024\\n\\n### Inclusion Criteria\\n- Peer-reviewed articles\\n- Focus on healthcare AI applications\\n- Discussion of bias or fairness issues\\n- English language publications\\n\\n## Key Findings Summary\\n\\n### Types of Bias Identified\\n1. **Historical Bias** - Training data reflects past inequalities\\n2. **Representation Bias** - Underrepresentation of certain groups\\n3. **Measurement Bias** - Differences in how data is collected\\n4. **Evaluation Bias** - Metrics that don't capture fairness\\n\\n### Most Cited Papers\\n1. Obermeyer et al. (2019) - Racial bias in health algorithms\\n2. Larrazabal et al. (2020) - Gender bias in medical imaging\\n3. Chen et al. (2021) - Socioeconomic bias in diagnostic AI\\n\\n### Research Gaps\\n- Limited studies on rural vs urban healthcare bias\\n- Insufficient longitudinal bias analysis\\n- Need for patient perspective on AI fairness\\n\\n## Implications for Our Study\\n\\nOur research should address the patient perspective gap by including:\\n- Patient interviews about AI trust\\n- Survey on AI fairness perceptions\\n- Focus groups with diverse demographics",
        lastModified: "1 day ago",
        tags: ["literature", "bias", "ai", "research"]
      },
      {
        id: "p1-3",
        title: "Interview Protocol Draft",
        content: "# Healthcare Provider Interview Protocol\\n\\n## Interview Structure (45-60 minutes)\\n\\n### Opening (5 minutes)\\n- Introduction and consent\\n- Recording permission\\n- Overview of research goals\\n\\n### Background Questions (10 minutes)\\n1. How long have you been practicing medicine?\\n2. What is your specialty?\\n3. Have you used AI-assisted diagnostic tools?\\n4. What is your general opinion of AI in healthcare?\\n\\n### AI Ethics Questions (25 minutes)\\n\\n#### Trust and Transparency\\n- How important is it to understand how an AI system makes decisions?\\n- What information would you need to trust an AI recommendation?\\n- Have you ever disagreed with an AI system's recommendation?\\n\\n#### Bias and Fairness\\n- Do you think AI systems might be biased against certain patient groups?\\n- How would you detect if an AI system was making biased recommendations?\\n- What safeguards should be in place to prevent AI bias?\\n\\n#### Patient Autonomy\\n- How should patients be informed about AI involvement in their care?\\n- Should patients have the right to opt out of AI-assisted diagnosis?\\n- How do you handle patient concerns about AI?\\n\\n### Closing (5 minutes)\\n- Any additional thoughts?\\n- Contact for follow-up if needed\\n- Thank you and next steps\\n\\n## Recruitment Strategy\\n- Target: 20 healthcare providers\\n- Mix of specialties: primary care, radiology, pathology, emergency medicine\\n- Experience levels: residents, attending physicians, department heads\\n- Settings: academic medical center, community hospital, private practice",
        lastModified: "3 days ago",
        tags: ["interview", "protocol", "healthcare", "providers"]
      }
    ],
    "2": [ // Climate Change Analysis
      {
        id: "p2-1",
        title: "Data Collection Strategy",
        content: "# Climate Data Collection Plan\\n\\n## Primary Data Sources\\n\\n### Temperature Records\\n- **NOAA Global Summary of the Month (GSOM)**\\n  - Coverage: 1973-present\\n  - Spatial resolution: Station-based\\n  - Variables: Mean, min, max temperature\\n\\n- **ERA5 Reanalysis Data**\\n  - Coverage: 1979-present  \\n  - Spatial resolution: 0.25° × 0.25°\\n  - Temporal resolution: Hourly\\n\\n### Precipitation Data\\n- **Global Precipitation Climatology Project (GPCP)**\\n- **CHIRPS (Climate Hazards Group InfraRed Precipitation)**\\n\\n## Regional Focus Areas\\n1. **North America** - Temperature trends in agricultural regions\\n2. **Europe** - Urban heat island effects\\n3. **Asia** - Monsoon pattern changes\\n4. **Africa** - Drought frequency analysis\\n\\n## Data Processing Pipeline\\n\\n### Quality Control\\n- Remove stations with <80% data completeness\\n- Flag outliers using IQR method\\n- Homogeneity testing for station records\\n\\n### Analysis Methods\\n- Mann-Kendall trend test\\n- Sen's slope estimator\\n- Change point detection\\n- Extreme value analysis\\n\\n## Timeline\\n- Data download: Week 1-2\\n- Quality control: Week 3-4\\n- Initial analysis: Week 5-8\\n- Regional analysis: Week 9-12",
        lastModified: "5 hours ago",
        tags: ["data", "collection", "climate", "temperature"]
      }
    ],
    "3": [ // Quantum Computing Study
      {
        id: "p3-1",
        title: "Quantum Algorithm Comparison",
        content: "# Quantum Optimization Algorithms Review\\n\\n## Algorithms Under Study\\n\\n### 1. Quantum Approximate Optimization Algorithm (QAOA)\\n- **Best for:** Combinatorial optimization\\n- **Complexity:** Polynomial in problem size\\n- **Hardware requirements:** Moderate depth circuits\\n\\n### 2. Variational Quantum Eigensolver (VQE)\\n- **Best for:** Finding ground states\\n- **Complexity:** Depends on ansatz choice\\n- **Hardware requirements:** Low depth, many measurements\\n\\n### 3. Quantum Annealing\\n- **Best for:** Large-scale optimization\\n- **Complexity:** Problem-dependent\\n- **Hardware requirements:** Specialized annealing hardware\\n\\n## Performance Benchmarks\\n\\n### Test Problems\\n1. **Max-Cut problem** (graph partitioning)\\n2. **Traveling Salesman Problem** (route optimization)\\n3. **Portfolio optimization** (financial applications)\\n\\n### Metrics\\n- Solution quality vs classical algorithms\\n- Time to solution\\n- Resource requirements (qubits, gates)\\n- Noise resilience\\n\\n## Preliminary Results\\n\\n- QAOA shows promise for Max-Cut with 50+ nodes\\n- VQE effective for small molecular systems\\n- Quantum annealing competitive for large TSP instances\\n\\n## Next Steps\\n- Scale up to larger problem instances\\n- Test on real quantum hardware\\n- Develop hybrid classical-quantum approaches",
        lastModified: "2 days ago",
        tags: ["quantum", "optimization", "algorithms", "comparison"]
      }
    ]
  };

  return projectNotesMap[projectId] || [];
};

export function ProjectNotesEditor({ projectId, projectTitle, onBack }: ProjectNotesEditorProps) {
  const projectNotes = getProjectNotes(projectId);
  const [selectedNote, setSelectedNote] = useState(projectNotes[0]);
  const [isPreview, setIsPreview] = useState(false);

  if (!selectedNote) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeftIcon className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl">Project Notes</h1>
              <p className="text-gray-600">{projectTitle}</p>
            </div>
          </div>
        </header>
        <div className="p-6 text-center">
          <p className="text-gray-500 mb-4">No notes found for this project</p>
          <Button>
            <PlusIcon className="w-4 h-4 mr-2" />
            Create First Note
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeftIcon className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl">Project Notes</h1>
              <p className="text-gray-600">{projectTitle}</p>
            </div>
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
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar - Notes List */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Project Notes</h3>
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
              {projectNotes.map((note) => (
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
                        <p className="text-xs text-gray-500 mt-1">{note.lastModified}</p>
                        <div className="flex gap-1 mt-2">
                          {note.tags.slice(0, 2).map((tag: string) => (
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
                {selectedNote.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <span className="text-sm text-gray-500">Last modified {selectedNote.lastModified}</span>
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
                      .replace(/^\\- (.*$)/gm, '<li>$1</li>')
                      .replace(/^\\* (.*$)/gm, '<li>$1</li>')
                      .replace(/\\*([^*]+)\\*/g, '<em>$1</em>')
                      .replace(/\\*\\*([^*]+)\\*\\*/g, '<strong>$1</strong>')
                      .replace(/\\[x\\] (.*$)/gm, '<input type="checkbox" checked disabled> $1')
                      .replace(/\\[ \\] (.*$)/gm, '<input type="checkbox" disabled> $1')
                      .replace(/\\n/g, '<br>')
                  }}
                />
              </div>
            ) : (
              <div className="h-full">
                <Textarea 
                  value={selectedNote.content}
                  className="h-full resize-none border-none rounded-none focus:ring-0 p-6 font-mono text-sm"
                  placeholder="Start writing your project notes in Markdown..."
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