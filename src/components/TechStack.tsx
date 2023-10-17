import clsx from 'clsx';
import * as React from 'react';
import { IconType } from 'react-icons';
import {
  SiNestjs,
  SiNextdotjs,
  SiPrisma,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';

import CustomLink from '@/components/links/CustomLink';

interface stackProp {
  id: string;
  icon: IconType;
  tooltip: React.ReactNode;
  color?: string;
}
export default function TechStack() {
  return (
    <div className='flex space-x-2 md:space-x-4'>
      {stacks.map((tech) => (
        <tech.icon
          key={tech.id}
          className={clsx(
            'h-8 w-8 md:h-10 md:w-10',
            'text-gray-600 hover:text-green-700 dark:text-gray-200 dark:hover:text-green-300',
            'transition-colors'
          )}
        />
      ))}
    </div>
  );
}

const stacks: stackProp[] = [
  {
    id: 'nextjs',
    icon: SiNextdotjs,
    tooltip: (
      <>
        <CustomLink href='https://nextjs.org'>Next.js</CustomLink>, currently my
        go-to framework because of the static generation, dynamic paths, and
        built-in api.
      </>
    ),
    color: 'text-zinc-200',
  },
  {
    id: 'nestjs',
    icon: SiNestjs,
    tooltip: (
      <>
        <CustomLink href='https://www.mongodb.com/'>MongoDB</CustomLink>, a
        source-available cross-platform document-oriented database program.
      </>
    ),
    color: 'text-red-600',
  },
  {
    id: 'typescript',
    icon: SiTypescript,
    tooltip: (
      <>
        <CustomLink href='https://www.typescriptlang.org/'>
          TypeScript
        </CustomLink>
        , finally jumping on this one, I love the experience! Check out my{' '}
        <CustomLink href='https://github.com/theodorusclarence/ts-nextjs-tailwind-starter'>
          starter template
        </CustomLink>{' '}
        using Next.js, Tailwind CSS, and TypeScript
      </>
    ),
    color: 'text-blue-600',
  },
  {
    id: 'tailwind',
    icon: SiTailwindcss,
    tooltip: (
      <>
        <CustomLink href='https://tailwindcss.com/'>Tailwind CSS</CustomLink> is
        awesome, I have never achieved this much reusability. Make sure you get
        the{' '}
        <CustomLink href='https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss'>
          extension
        </CustomLink>
        .
      </>
    ),
    color: 'text-blue-600',
  },

  {
    id: 'prisma',
    icon: SiPrisma,
    tooltip: (
      <>
        <CustomLink href='https://nodejs.org/'>Node.js</CustomLink>, simple
        backend language so you don't need to learn another language. Not using
        this too often because Next.js already has a backend built-in.
      </>
    ),
  },
];
