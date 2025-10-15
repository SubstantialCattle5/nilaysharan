import {
  BlogFrontmatter,
  ContentType,
  ProjectFrontmatter
} from "@/types/frontmatters";


export default function useInjectContentMeta<T extends ContentType>(
  type: T,
  frontmatter: string
) {
  //! Change to api backend
  if (type === "projects" && frontmatter === "featuredProjects") {
    return featuredProjects;
  }
  if (type === "projects" && frontmatter === "allProjects") {
    return allProjects;
  }

  if (type === "archive" && frontmatter === "featuredBlogs") {
    return featuredBlogs;
  }
  if (type === "archive" && frontmatter === "allBlogs") {
    return allBlogs;
  }
}

const featuredProjects: Array<ProjectFrontmatter> = [
  {
    slug: "octoguard",
    title: "Octoguard",
    publishedAt: "2022-03-05",
    description: "Automated GitHub Actions for managing low-effort PRs and AI-assisted contributions",
    techs: "github-actions,javascript,nodejs,automation",
    banner: "nilaysharan/project/octoguard/bb3",
    github: "github.com/substantialcattle5/octoguard"
  },
  {
    slug: "sietch",
    title: "Sietch Vault",
    publishedAt: "2025-03-15",
    description:
      "A decentralized file system that allows you to securely sync encrypted data across machines in low or no-internet conditions",
    techs: "golang,p2p,git",
    banner: "nilaysharan/project/sietch/ssh6bhhcfbhmu8gqhotm",
    externalUrl: "https://sietch.nilaysharan.com"
  },
  {
    slug: "medbud",
    title: "MedBud",
    publishedAt: "2021-01-01",
    description:
      "Service that offers text-based management for hospitals and their patients features a chatbot",
    techs: "express,typescript,prisma,flutter",
    banner: "nilaysharan/project/medbud/banner",
  },
  {
    slug: "voidcast",
    title: "Void Cast",
    publishedAt: "2025-05-05",
    description:
      "A Threat simulation toolkit that lets you deploy deceptive endpoints to observe suspicious behavior in real time.",
    techs: "git,typescript",
    banner: "nilaysharan/project/echoes/banner",
  },
];

export const allProjects: Array<ProjectFrontmatter> = [
  {
    slug: "octoguard",
    title: "Octoguard",
    publishedAt: "2022-03-05",
    description: "A GitHub Actions designed to help maintainers manage low-effort pull requests events like Hacktoberfest.",
    techs: 'git,javascript,nodejs,automation',
    banner: "nilaysharan/project/octoguard/bb3",
    github: "github.com/substantialcattle5/octoguard"
  },
  {
    slug: "sietch",
    title: "Sietch Vault",
    publishedAt: "2025-03-15",
    description:
      "A decentralized file system that allows you to securely sync encrypted data across machines in low or no-internet conditions",
    techs: "golang,p2p,git,terminal",
    banner: "nilaysharan/project/sietch/ssh6bhhcfbhmu8gqhotm",
    externalUrl: "https://sietch.nilaysharan.com"
  },
  {
    slug: "cda",
    title: "CDA",
    publishedAt: "2021-01-01",
    description:
      "A cli tool to automate the process of verifying data integrity during disaster recovery drills in Ceph storage clusters.",
    techs: "golang,terminal,git",
    banner: "nilaysharan/project/humantd/qwlr8aaqfn7xwb1dazqr",
  },
  {
    slug: "humantd",
    title: "HumanTD",
    publishedAt: "2021-01-01",
    description:
      "Portal that tracks down a person of interest by using backtracking and video footage from CCTV cameras.",
    techs: "react,tailwindcss,typescript",
    banner: "nilaysharan/project/humantd/qwlr8aaqfn7xwb1dazqr",
  },
  {
    slug: "medbud",
    title: "MedBud",
    publishedAt: "2021-01-01",
    description:
      "Service that offers text-based management for hospitals and their patients features a chatbot",
    techs: "express,typescript,prisma,flutter",
    banner: "nilaysharan/project/medbud/banner",
  },
  {
    slug: "maintenance-app",
    title: "VIT Maintenance App",
    publishedAt: "2021-02-12",
    description: "A maintenance application created in collaboration with the Mens Hostel.",
    techs: "nestjs,postgresql,docker,flutter,swagger",
    banner: "nilaysharan/project/socialmediabackend/image",
  },
  {
    slug: "period-tracker",
    title: "Women Health Tracker",
    publishedAt: "2021-02-12",
    description: "A backend system for a period tracking application.",
    techs: "django,postgresql,docker",
    banner: "nilaysharan/project/socialmediabackend/image",
  },
  {
    slug: "avail",
    title: "AvailxReverseProxy",
    publishedAt: "2021-01-01",
    description:
      "Sets up Avail Client and configures Nginx as a reverse proxy for the Avail Client's RPC.",
    techs: "react,tailwindcss,typescript",
    banner: "nilaysharan/project/humantd/qwlr8aaqfn7xwb1dazqr",
  }
];

export const allBlogs: Array<BlogFrontmatter> = [
  {
    wordCount: 600,
    readingTime: 5,
    slug: "netmasking-and-how-we-keep-shifting-problems-to-the-future",
    title: "Netmasking: A Band-Aid Solution for a Bleeding Network",
    description:
      "A detailed explanation on netmask, IP4, IPV6, and how we keep shifting problems to the future.",
    banner: "nilaysharan/blog/netmask/banner",
    publishedAt: "2023-08-12",
    tags: "tech,network",
  },
  {
    wordCount: 123,
    readingTime: 8,
    slug: "deep-dive-on-the-madcap-laughs-by-syd-barrett",
    title:
      "The Madcap Laughs: An Analysis of Syd Barrett's Musical Genius and Madness",
    description:
      "The Madcap Laughs: A psychedelic journey into the mind of Syd Barrett, the founding member of Pink Floyd.",
    banner: "nilaysharan/blog/syd/banner",
    publishedAt: "2021-01-01",
    tags: "album,deep dive",
  },
  {
    wordCount: 1399,
    readingTime: 7,
    slug: "pather-panchali-the-enduring-impact-on-modern-indian-cinema",
    title: "Pather Panchali : The Enduring Impact on Modern Indian Cinema",
    description:
      "Pather Panchali: Masterpiece revolutionizing Indian cinema, shaping narratives, and inspiring filmmakers worldwide.",
    banner: "nilaysharan/blog/pather_panchali/banner",
    publishedAt: "2021-01-01",
    tags: "deep dive,movie",
  },
  {
    wordCount: 400,
    readingTime: 13,
    slug: "routing-protocol-the-invisible-force-that-powers-the-internet",
    title: "Routing Protocol: The Invisible Force That Powers The Internet",
    description:
      "Routing protocols are the set of rules that routers use to communicate with each other and exchange information .",
    banner: "nilaysharan/blog/router_protocol/banner",
    publishedAt: "2023-12-12",
    tags: "tech,network",
  },
  {
    wordCount: 507,
    readingTime: 2.5,
    slug: "service-animal",
    title: "Service Animal : An Emotional Musical Journey",
    description:
      'Service Animal" by Jamblu: A soul-stirring musical odyssey exploring self-love and human connections, embracing emotions from heartache to hope.',
    banner: "nilaysharan/blog/service_animal/banner",
    publishedAt: "2021-01-01",
    tags: "review,album",
  },
];

const featuredBlogs: Array<BlogFrontmatter> = allBlogs.slice(2, 5);
