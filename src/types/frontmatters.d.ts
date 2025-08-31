import { ReadTimeResults } from 'reading-time';

export type BlogFrontmatter = {
  wordCount: number;
  readingTime: ReadingTimeResults;
  slug: string;
  englishOnly?: boolean;
  title: string;
  description: string;
  banner: string;
  publishedAt: string;
  lastUpdated?: string;
  tags: string;
  repost?: string;
};

export type ContentType = 'blog' | 'library' | 'projects' | 'archive' | 'writeups';

export type PickFrontmatter<T extends ContentType> = T extends 'blog'
  ? BlogFrontmatter
  : T extends 'library'
  ? LibraryFrontmatter
  : T extends 'writeups'
  ? WriteupFrontmatter
  : ProjectFrontmatter;

export type InjectedMeta = { views?: number; likes?: number };

export type BlogType = {
  code: string;
  frontmatter: BlogFrontmatter;
};

export type LibraryFrontmatter = {
  slug: string;
  title: string;
  readingTime: ReadTimeResults;
  description: string;
  tags: string;
};

export type LibraryType = {
  code: string;
  frontmatter: LibraryFrontmatter;
};

export type ProjectFrontmatter = {
  slug: string;
  title: string;
  publishedAt: string;
  lastUpdated?: string;
  description: string;
  category?: string;
  techs: string;
  banner: string;
  link?: string;
  github?: string;
  youtube?: string;
  externalUrl?: string; // Optional external URL
};

export type ProjectType = {
  code: string;
  frontmatter: ProjectFrontmatter;
};

export type WriteupFrontmatter = {
  wordCount: number;
  readingTime: ReadTimeResults;
  slug: string;
  title: string;
  description: string;
  banner?: string;
  publishedAt: string;
  lastUpdated?: string;
  tags: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  category?: string;
  platform?: string;
};

export type WriteupType = {
  code: string;
  frontmatter: WriteupFrontmatter;
};

export type FrontmatterWithTags = BlogFrontmatter | LibraryFrontmatter | WriteupFrontmatter;
export type FrontmatterWithDate = BlogFrontmatter | ProjectFrontmatter | WriteupFrontmatter;
export type Frontmatter = ProjectFrontmatter | BlogFrontmatter | WriteupFrontmatter;
