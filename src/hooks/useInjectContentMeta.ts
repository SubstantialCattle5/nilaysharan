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
  if (type === 'projects' && frontmatter === 'allProjects') {
    return allProjects;
  }

  if (type === 'blog' && frontmatter === 'featuredBlogs') {
    return featuredBlogs;
  }
  if (type === 'blog' && frontmatter === 'allBlogs') {
    return allBlogs;
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
    banner: 'nilaysharan/project/humantd/qwlr8aaqfn7xwb1dazqr',
  },
  {
    slug: 'medbud',
    title: 'MedBud',
    publishedAt: '2021-01-01',
    description:
      'Service that offers text-based management for hospitals and their patients features a chatbot',
    techs: 'express,typescript,prisma,flutter',
    banner: 'nilaysharan/project/medbud/banner',
  },
  {
    slug: 'echoes',
    title: 'Echoes',
    publishedAt: '2021-01-01',
    description:
      'Terminal based interface that assists users to select templates for codes and React components.',
    techs: 'git,typescript',
    banner: 'nilaysharan/project/echoes/banner',
  },
];

export const allProjects: Array<ProjectFrontmatter> = [
  {
    slug: 'humantd',
    title: 'HumanTD',
    publishedAt: '2021-01-01',
    description:
      'Portal that tracks down a person of interest by using backtracking and video footage from CCTV cameras.',
    techs: 'react,tailwindcss,typescript',
    banner: 'nilaysharan/project/humantd/qwlr8aaqfn7xwb1dazqr',
  },
  {
    slug: 'medbud',
    title: 'MedBud',
    publishedAt: '2021-01-01',
    description:
      'Service that offers text-based management for hospitals and their patients features a chatbot',
    techs: 'express,typescript,prisma,flutter',
    banner: 'nilaysharan/project/medbud/banner',
  },
  {
    slug: 'echoes',
    title: 'Echoes',
    publishedAt: '2021-01-01',
    description:
      'Terminal based interface that assists users to select templates for codes and React components.',
    techs: 'git,typescript',
    banner: 'nilaysharan/project/echoes/banner',
  },
  {
    slug: 'hestia',
    title: 'Hestia',
    publishedAt: '2021-02-12',
    description: 'A web3 based Community Management WebApp.',
    techs: 'ethereum,hardhat,typescript',
    banner: 'nilaysharan/project/hestia/banner',
  },
  {
    slug: 'socialmediabackend',
    title: 'Social Media Backend',
    publishedAt: '2021-02-12',
    description:
      'A Social Media Backend created with a functioning auth and tweet system.',
    techs: 'nestjs,postgresql,prisma,typescript',
    banner: 'nilaysharan/project/socialmediabackend/image',
  },
];

export const allBlogs: Array<BlogFrontmatter> = [
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
    wordCount: 600,
    readingTime: 30,
    slug: 'netmasking-and-how-we-keep-shifting-problems-to-the-future',
    title: 'Netmasking: A Band-Aid Solution for a Bleeding Network',
    description:
      'A detailed explanation on netmask, IP4, IPV6, and how we keep shifting problems to the future.',
    banner: 'nilaysharan/blog/netmask/banner',
    publishedAt: '2023-08-12',
    tags: 'tech,network',
  },
  {
    wordCount: 123,
    readingTime: 8,
    slug: 'deep-dive-on-the-madcap-laughs-by-syd-barrett',
    title:
      'The Madcap Laughs: An Analysis of Syd Barrett’s Musical Genius and Madness',
    description:
      'The Madcap Laughs: A psychedelic journey into the mind of Syd Barrett, the founding member of Pink Floyd.',
    banner: 'nilaysharan/blog/syd/banner',
    publishedAt: '2021-01-01',
    tags: 'album,deep dive',
  },

  {
    wordCount: 400,
    readingTime: 13,
    slug: 'routing-protocol-the-invisible-force-that-powers-the-internet',
    title: 'Routing Protocol: The Invisible Force That Powers The Internet',
    description:
      'Routing protocols are the set of rules that routers use to communicate with each other and exchange information .',
    banner: 'nilaysharan/blog/router_protocol/banner',
    publishedAt: '2023-12-12',
    tags: 'tech,network',
  },
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
];

const featuredBlogs: Array<BlogFrontmatter> = allBlogs.slice(0, 3);
