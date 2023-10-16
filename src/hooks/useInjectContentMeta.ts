import {
  BlogFrontmatter,
  ContentType,
  ProjectFrontmatter,
} from '@/types/frontmatters';

export default function useInjectContentMeta<T extends ContentType>(
  type: T,
  frontmatter: string
) {
  //! Change to api backend
  if (type === 'projects' && frontmatter === 'featuredProjects') {
    return featuredProjects;
  }

  if (type === 'blog' && frontmatter === 'featuredBlogs') {
    return featuredBlogs;
  }
}

const featuredProjects: Array<ProjectFrontmatter> = [
  {
    slug: 'humantd',
    title: 'HumanTD',
    publishedAt: '2021-01-01',
    description:
      'Portal that tracks down a person of interest by using backtracking and video footage from CCTV cameras.',
    techs: 'react,tailwindcss,typescript',
    banner: 'banner',
  },
  {
    slug: 'medbud',
    title: 'MedBud',
    publishedAt: '2021-01-01',
    description:
      'Service that offers text-based management for hospitals and their patients features a chatbot',
    techs: 'react,typescript,tailwindcss',
    banner: 'banner',
  },
  {
    slug: 'echoes',
    title: 'Echoes',
    publishedAt: '2021-01-01',
    description:
      'Terminal based interface that assists users to select templates for codes and React components.',
    techs: 'react,typescript,tailwindcss',
    banner: 'banner',
  },
];

const featuredBlogs: Array<BlogFrontmatter> = [
  {
    wordCount: 123,
    readingTime: 123,
    slug: 'blog-1',
    title: 'Blog 1',
    description: 'Blog 1 description',
    banner: 'banner',
    publishedAt: '2021-01-01',
    tags: 'world trade',
  },
  {
    wordCount: 123,
    readingTime: 123,
    slug: 'blog-1',
    title: 'Blog 1',
    description: 'Blog 1 description',
    banner: 'banner',
    publishedAt: '2021-01-01',
    tags: 'world trade',
  },
  {
    wordCount: 123,
    readingTime: 123,
    slug: 'blog-1',
    title: 'Blog 1',
    description: 'Blog 1 description',
    banner: 'banner',
    publishedAt: '2021-01-01',
    tags: 'world trade',
  },
];
