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
    wordCount: 507,
    readingTime: 2.5,
    slug: 'service-animal',
    title: 'Service Animal : An Emotional Musical Journey',
    description:
      'Service Animal" by Jamblu: A soul-stirring musical odyssey exploring self-love and human connections, embracing emotions from heartache to hope.',
    banner: 'nilaysharan/blog/service_animal/banner',
    publishedAt: '2021-01-01',
    tags: 'review,album',
  },
  {
    wordCount: 1399,
    readingTime: 7,
    slug: 'pather-panchali-the-enduring-impact-on-modern-indian-cinema',
    title: 'Pather Panchali : The Enduring Impact on Modern Indian Cinema',
    description:
      'Pather Panchali: Masterpiece revolutionizing Indian cinema, shaping narratives, and inspiring filmmakers worldwide.',
    banner: 'nilaysharan/blog/pather_panchali/banner',
    publishedAt: '2021-01-01',
    tags: 'deep dive,movie',
  },
  {
    wordCount: 123,
    readingTime: 8,
    slug: 'drunk-drivers-against-mothers',
    title: 'Deep Dive on The Madcap Laughs by Syd Barrett',
    description:
      'The Madcap Laughs: A psychedelic journey into the mind of Syd Barrett, the founding member of Pink Floyd.',
    banner: 'nilaysharan/blog/syd/banner',
    publishedAt: '2021-01-01',
    tags: 'album,deep dive',
  },
];
