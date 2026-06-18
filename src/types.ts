export interface Education {
  id: string;
  institution: string;
  degree: string;
  gpa: string;
  period: string;
  location: string;
  details?: string[];
  coursework?: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  skills: string[];
  type: string; // 'academic' | 'industry'
}

export interface Project {
  id: string;
  title: string;
  category: string; // 'ML/CV' | 'Agentic AI' | 'AR/Systems'
  technologies: string[];
  bullets: string[];
  award?: string;
  year: string;
  githubUrl?: string;
  image?: string;
  pdfUrl?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
  description?: string;
  badgeType: 'teaching' | 'java' | 'cloud' | 'enterprise' | 'research';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}
