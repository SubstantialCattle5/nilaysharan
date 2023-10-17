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
    slug: 'sober-to-death',
    title: 'Sober to Death',
    description:
      'Not Conforming to the Norms of Society and the Consequences of it but still being very afraid of the monkeys out for blood.',
    banner: 'banner',
    publishedAt: '2021-01-01',
    tags: 'world trade',
  },
  {
    wordCount: 123,
    readingTime: 345,
    slug: 'fill-in-the-blanks',
    title: 'Fill in the Blanks',
    description:
      'The age old system of filling in the blanks to get the answers right.',
    banner: 'banner',
    publishedAt: '2021-01-01',
    tags: 'world trade',
  },
  {
    wordCount: 123,
    readingTime: 12345,
    slug: 'drunk-drivers-against-mothers',
    title: 'Drunk Drivers Against Mothers',
    description:
      'The rise of old mothers falling for drunk drivers and the consequences of it.',
    banner: 'banner',
    publishedAt: '2021-01-01',
    tags: 'world trade',
  },
];
