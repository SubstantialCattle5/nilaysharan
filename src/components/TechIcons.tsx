import clsx from "clsx";
import * as React from "react";
import { FaHardHat, FaPython, FaTerminal } from "react-icons/fa";
import { IoLogoVercel } from "react-icons/io5";
import {
  SiDjango,
  SiDocker,
  SiEthereum,
  SiExpress,
  SiFirebase,
  SiFlutter,
  SiGit,
  SiGoogleanalytics,
  SiJavascript,
  SiMarkdown,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiNotion,
  SiPostgresql,
  SiPrettier,
  SiPrisma,
  SiReact,
  SiRedux,
  SiSass,
  SiSwagger,
  SiSwift,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { RiP2PFill } from "react-icons/ri";

import { FaGolang } from "react-icons/fa6";

export type TechListType = keyof typeof techList;

export type TechIconsProps = {
  techs: Array<TechListType>;
} & React.ComponentPropsWithoutRef<"ul">;

export default function TechIcons({ className, techs }: TechIconsProps) {
  return (
    <ul className={clsx(className, "flex gap-2")}>
      {techs.map((tech) => {
        if (!techList[tech]) return;

        const current = techList[tech];

        return (
          <li
            key={current.name}
            className="text-xl text-gray-700 dark:text-gray-200"
          >
            <current.icon />
          </li>
        );
      })}
    </ul>
  );
}

const techList = {
  react: {
    icon: SiReact,
    name: "React",
  },
  nextjs: {
    icon: SiNextdotjs,
    name: "Next.js",
  },
  tailwindcss: {
    icon: SiTailwindcss,
    name: "Tailwind CSS",
  },
  scss: {
    icon: SiSass,
    name: "SCSS",
  },
  javascript: {
    icon: SiJavascript,
    name: "JavaScript",
  },
  typescript: {
    icon: SiTypescript,
    name: "TypeScript",
  },
  nodejs: {
    icon: SiNodedotjs,
    name: "Node.js",
  },
  firebase: {
    icon: SiFirebase,
    name: "Firebase",
  },
  mongodb: {
    icon: SiMongodb,
    name: "MongoDB",
  },
  swr: {
    icon: IoLogoVercel,
    name: "SWR",
  },
  redux: {
    icon: SiRedux,
    name: "Redux",
  },
  mdx: {
    icon: SiMarkdown,
    name: "MDX",
  },
  prettier: {
    icon: SiPrettier,
    name: "Prettier",
  },
  analytics: {
    icon: SiGoogleanalytics,
    name: "Google Analytics",
  },
  git: {
    icon: SiGit,
    name: "Git",
  },
  notion: {
    icon: SiNotion,
    name: "Notion API",
  },
  swift: {
    icon: SiSwift,
    name: "Swift",
  },
  express: {
    icon: SiExpress,
    name: "Express",
  },
  flutter: {
    icon: SiFlutter,
    name: "Flutter",
  },
  blockchain: {
    icon: SiEthereum,
    name: "Blockchain",
  },
  hardhat: {
    icon: FaHardHat,
    name: "Hardhat",
  },
  nestjs: {
    icon: SiNestjs,
    name: "NestJS",
  },
  prisma: {
    icon: SiPrisma,
    name: "Prisma",
  },
  postgresql: {
    icon: SiPostgresql,
    name: "PostgreSQL",
  },
  docker: {
    icon: SiDocker,
    name: "Docker",
  },
  swagger: {
    icon: SiSwagger,
    name: "Swagger",
  },
  golang: {
    icon: FaGolang,
    name: "Golang",
  },
  p2p: {
    icon: RiP2PFill,
    name: "peer-to-peer",
  },
  python: {
    icon: FaPython,
    name: "python",
  },
  terminal: {
    icon: FaTerminal,
    name: "terminal",
  },
  django: {
    icon: SiDjango,
    name: "Django",
  },
  
};
