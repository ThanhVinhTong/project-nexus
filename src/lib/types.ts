export type Screen = 'login' | 'dashboard' | 'project-detail' | 'kanban' | 'schedule' | 'notes' | 'project-notes' | 'notifications';

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'planning';
  progress: number;
  dueDate: string;
  team: string[];
  tags: string[];
  recentNotes: {
    title: string;
    date: string;
    preview: string;
  }[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  projectId: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  projectId?: string; // For project-specific notes
}

export interface Reference {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  url: string;
  doi?: string;
  tags: string[];
  abstract: string;
  addedBy: string;
  addedDate: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  createdAt: string;
  read: boolean;
  actionUrl?: string;
}