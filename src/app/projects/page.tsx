'use client';
import clsx from 'clsx';
import React from 'react';

import useInjectContentMeta from '@/hooks/useInjectContentMeta';
import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import ProjectCard from '@/components/content/projects/ProjectCard';

import { ProjectFrontmatter } from '@/types/frontmatters';

const Page = () => {
  const isLoaded = useLoaded();
  const projects = useInjectContentMeta(
    'projects',
    'allProjects'
  ) as ProjectFrontmatter[];

  return (
    <>
      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='layout py-12'>
            <h1 className='text-3xl md:text-5xl' data-fade='0'>
              <Accent>Projects</Accent>
            </h1>
            <p data-fade='1' className='mt-2 text-gray-600 dark:text-gray-300'>
              Some of the interesting projects I've worked over the years.
            </p>

            <ul
              data-fade='2'
              className='mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'
            >
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
