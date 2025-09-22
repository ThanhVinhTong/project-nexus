import { Project, Task, Note, Reference, Notification } from '@/lib/types';

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "AI Ethics Research",
    description: "Investigating ethical implications of AI in healthcare decision-making",
    status: "active",
    progress: 65,
    dueDate: "2024-03-15",
    team: ["Dr. Sarah Chen", "Alex Rodriguez", "Maya Patel"],
    tags: ["AI", "Ethics", "Healthcare"],
    recentNotes: [
      { title: "Meeting Notes - Ethics Review", date: "Today", preview: "Discussed patient consent protocols..." },
      { title: "Literature Review Findings", date: "Yesterday", preview: "Key papers on AI bias in healthcare..." },
      { title: "Research Methodology", date: "2 days ago", preview: "Quantitative and qualitative approaches..." }
    ]
  },
  {
    id: "2", 
    title: "Climate Change Analysis",
    description: "Statistical analysis of regional climate patterns over the past decade",
    status: "active",
    progress: 40,
    dueDate: "2024-04-20",
    team: ["Prof. Michael Green", "Lisa Wong", "David Kim"],
    tags: ["Climate", "Statistics", "Environment"],
    recentNotes: [
      { title: "Data Collection Updates", date: "Today", preview: "Weather station data from 50 locations..." },
      { title: "Statistical Model Notes", date: "2 days ago", preview: "Testing various regression models..." }
    ]
  },
  {
    id: "3",
    title: "Quantum Computing Study",
    description: "Exploring quantum algorithms for optimization problems",
    status: "planning",
    progress: 15,
    dueDate: "2024-06-30",
    team: ["Dr. Emily Watson", "James Liu"],
    tags: ["Quantum", "Computing", "Algorithms"],
    recentNotes: [
      { title: "Algorithm Design Notes", date: "Yesterday", preview: "Initial sketches for quantum optimization..." },
      { title: "Literature Survey", date: "3 days ago", preview: "Review of existing quantum algorithms..." }
    ]
  }
];

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Literature Review",
    description: "Review existing research on AI ethics frameworks",
    status: "in-progress",
    assignee: "Maya Patel",
    priority: "high",
    dueDate: "2024-02-15",
    projectId: "1"
  },
  {
    id: "2",
    title: "Data Collection",
    description: "Gather climate data from weather stations",
    status: "todo",
    assignee: "David Kim",
    priority: "medium",
    dueDate: "2024-02-20",
    projectId: "2"
  },
  {
    id: "3",
    title: "Algorithm Implementation",
    description: "Implement quantum optimization algorithm",
    status: "todo",
    assignee: "James Liu",
    priority: "low",
    dueDate: "2024-03-01",
    projectId: "3"
  }
];

export const mockNotes: Note[] = [
  {
    id: "1",
    title: "Research Methodology Notes",
    content: "Important considerations for mixed-methods research approach...",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T14:30:00Z",
    tags: ["methodology", "research"]
  },
  {
    id: "2",
    title: "Conference Presentation Ideas",
    content: "Key points to cover in the upcoming academic conference...",
    createdAt: "2024-01-18T09:15:00Z",
    updatedAt: "2024-01-18T09:15:00Z",
    tags: ["presentation", "conference"]
  }
];

export const mockProjectNotes: Note[] = [
  {
    id: "p1-1",
    title: "AI Ethics Framework Analysis",
    content: "Notes on different ethical frameworks applicable to AI systems...",
    createdAt: "2024-01-10T14:00:00Z",
    updatedAt: "2024-01-22T16:45:00Z",
    tags: ["ethics", "framework"],
    projectId: "1"
  },
  {
    id: "p2-1", 
    title: "Climate Data Sources",
    content: "List of reliable climate data sources and their access methods...",
    createdAt: "2024-01-12T11:30:00Z",
    updatedAt: "2024-01-12T11:30:00Z",
    tags: ["data", "sources"],
    projectId: "2"
  }
];

export const mockReferences: Reference[] = [
  {
    id: "1",
    title: "Artificial Intelligence and Medical Ethics: A Framework for Action",
    authors: ["Johnson, M.", "Smith, K.", "Brown, L."],
    journal: "Journal of Medical Ethics",
    year: 2023,
    url: "https://example.com/ai-medical-ethics",
    doi: "10.1136/medethics-2023-109234",
    tags: ["AI", "Medical Ethics", "Framework"],
    abstract: "This paper presents a comprehensive framework for addressing ethical considerations in AI-powered medical systems...",
    addedBy: "Dr. Sarah Chen",
    addedDate: "2 days ago"
  },
  {
    id: "2",
    title: "Climate Change Impacts on Regional Weather Patterns",
    authors: ["Wilson, R.", "Davis, A."],
    journal: "Nature Climate Change",
    year: 2023,
    url: "https://example.com/climate-patterns",
    doi: "10.1038/s41558-023-01652-8",
    tags: ["Climate Change", "Weather Patterns", "Regional Analysis"],
    abstract: "An analysis of how global climate change is affecting regional weather patterns across different geographical areas...",
    addedBy: "Prof. Michael Green",
    addedDate: "1 week ago"
  },
  {
    id: "3",
    title: "Quantum Algorithms for Combinatorial Optimization",
    authors: ["Lee, S.", "Chen, H.", "Martinez, C."],
    journal: "Physical Review A",
    year: 2022,
    url: "https://example.com/quantum-optimization",
    doi: "10.1103/PhysRevA.106.052413",
    tags: ["Quantum Computing", "Optimization", "Algorithms"],
    abstract: "We present new quantum algorithms that demonstrate significant speedup for certain classes of combinatorial optimization problems...",
    addedBy: "Dr. Emily Watson",
    addedDate: "3 days ago"
  }
];

export const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Team Member Added",
    message: "Maya Patel has been added to the AI Ethics Research project",
    type: "info",
    createdAt: "2024-01-22T10:30:00Z",
    read: false,
    actionUrl: "/projects/1"
  },
  {
    id: "2",
    title: "Task Deadline Approaching",
    message: "Literature Review task is due in 3 days",
    type: "warning",
    createdAt: "2024-01-21T09:00:00Z",
    read: false,
    actionUrl: "/projects/1/tasks"
  },
  {
    id: "3",
    title: "Project Milestone Completed",
    message: "Data Collection phase completed for Climate Change Analysis",
    type: "success",
    createdAt: "2024-01-20T16:45:00Z",
    read: true,
    actionUrl: "/projects/2"
  }
];

export const projectTitles: { [key: string]: string } = {
  "1": "AI Ethics Research",
  "2": "Climate Change Analysis", 
  "3": "Quantum Computing Study"
};