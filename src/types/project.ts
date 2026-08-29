export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  primaryLanguage: string | null;
  topics: string[];
  stars: number;
  gitUrl: string;
  previewUrl: string | null;
  updatedAt: string;
}
