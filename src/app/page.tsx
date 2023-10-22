'use client';
import clsx from 'clsx';
import * as React from 'react';
import { IoArrowDownOutline, IoNewspaperSharp } from 'react-icons/io5';
import { SiGithub, SiInstagram } from 'react-icons/si';
import Typewriter from 'typewriter-effect';

import useInjectContentMeta from '@/hooks/useInjectContentMeta';
import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import BlogCard from '@/components/content/blogs/BlogCard';
import ProjectCard from '@/components/content/projects/ProjectCard';
import ButtonLink from '@/components/links/ButtonLink';
import CustomLink from '@/components/links/CustomLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

import { BlogFrontmatter, ProjectFrontmatter } from '@/types/frontmatters';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F

export default function HomePage() {
  const isLoaded = useLoaded();
  const populatedProjects =
    useInjectContentMeta('projects', 'featuredProjects') || [];
  const populatedPosts = useInjectContentMeta('blog', 'featuredBlogs') || [];
  return (
    <>
      <Seo />
      <main>
        <section
          className={clsx(
            'min-h-main -mt-20 mb-20 flex flex-col justify-center',
            isLoaded && 'fade-in-start'
          )}
        >
          <article className='layout'>
            <h2 className='text-2xl md:text-4xl 2xl:text-5xl' data-fade='1'>
              <Typewriter
                options={{
                  strings: [
                    'Hello!',
                    'नमस्ते!',
                    'ہیلو!',
                    'ನಮಸ್ಕಾರ!',
                    'Привет!',
                    'Olá!',
                    'שָׁלוֹם!',
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h2>
            <h1
              className='mt-1 text-3xl md:text-5xl 2xl:text-6xl'
              data-fade='2'
            >
              You can call me <Accent>Nilay</Accent>
            </h1>
            <p
              className={clsx(
                'mt-4 max-w-4xl text-gray-700 dark:text-gray-200 md:mt-6',
                'md:text-lg 2xl:text-xl'
              )}
              data-fade='3'
            >
              I'm a programmer based in India. I try to solve real-world
              problems and create value. I build products with robust
              functionality and secure code.
            </p>
            <p
              className='mt-3 max-w-4xl leading-relaxed text-gray-700 dark:text-gray-200 md:mt-4 md:text-lg 2xl:text-xl'
              data-fade='4'
            >
              Don't forget to sign my{' '}
              <CustomLink href='/guestbook'>guestbook</CustomLink>!
            </p>
            <div
              data-fade='5'
              className='mt-8 flex flex-wrap gap-4 md:!text-lg'
            >
              <ButtonLink href='/about'>About me!</ButtonLink>
            </div>
            <div
              data-fade='6'
              className='mt-4 flex flex-wrap gap-4 gap-y-2 md:mt-8'
            >
              <UnstyledLink
                href='https://drive.google.com/file/d/1dEdLkBvFTEj_hobo4R8n6jgQcIzICi1j/view'
                className={clsx(
                  'inline-flex items-center gap-1 text-sm font-medium md:text-base',
                  'text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white',
                  'focus-visible:ring-primary-300 focus:outline-none focus-visible:ring',
                  'transition-colors'
                )}
              >
                <IoNewspaperSharp className='shrink-0' />
                <span>Resume</span>
              </UnstyledLink>
              <UnstyledLink
                href='https://www.instagram.com/nilay.sharan/'
                className={clsx(
                  'inline-flex items-center gap-1 text-sm font-medium md:text-base',
                  'group text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white',
                  'focus-visible:ring-primary-300 focus:outline-none focus-visible:ring',
                  'transition-colors'
                )}
              >
                <SiInstagram className='group-hover:text-red shrink-0 transition-colors' />
                <span>nilay.sharan</span>
              </UnstyledLink>
              <UnstyledLink
                href='https://github.com/substantialcattle5'
                className={clsx(
                  'inline-flex items-center gap-1 text-sm font-medium md:text-base',
                  'text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white',
                  'focus-visible:ring-primary-300 focus:outline-none focus-visible:ring',
                  'transition-colors'
                )}
              >
                <SiGithub className='shrink-0' />
                <span>SubstantialCattle5</span>
              </UnstyledLink>
            </div>
          </article>
          <UnstyledLink
            href='#intro'
            className={clsx(
              'absolute bottom-2 left-1/2 -translate-x-1/2 md:bottom-10',
              'cursor-pointer rounded-md transition-colors',
              'hover:text-primary-300 focus-visible:text-primary-300'
            )}
          >
            <IoArrowDownOutline className='h-8 w-8 animate-bounce md:h-10 md:w-10' />
          </UnstyledLink>
        </section>
        {/* Projects */}
        <section className={clsx('fade-in-start py-20')}>
          <article className='layout' data-fade='0'>
            <h2 className='text-2xl md:text-4xl' id='projects'>
              <Accent>Curated Projects</Accent>
            </h2>
            <p className='mt-2 text-gray-600 dark:text-gray-300'>
              Below are some of my favorite projects over the years, a few of
              which have been featured in Yantra, Social Transformers, Devsoc
              and more.
            </p>
            <ul className='mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
              {populatedProjects.map((project, i) => (
                <ProjectCard
                  key={project.slug}
                  project={project as ProjectFrontmatter}
                  className={clsx(i > 2 && 'hidden sm:block')}
                />
              ))}
            </ul>
            <ButtonLink className='mt-4' href='/projects'>
              See more project
            </ButtonLink>
          </article>
        </section>
        {/* Blogs */}
        <section className={clsx('fade-in-start py-20')}>
          <article className='layout' data-fade='0'>
            <h2 className='text-2xl md:text-4xl' id='blog'>
              <Accent>Blogs Archive</Accent>
            </h2>
            <p className='mt-2 text-gray-600 dark:text-gray-300'>
              When I'm not working on projects, I enjoy travelling, taking
              pictures and writing blogs. Here are a few select.
            </p>
            <ul className='mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
              {populatedPosts.map((post, i) => (
                <BlogCard
                  key={post.slug}
                  post={post as BlogFrontmatter}
                  className={clsx(i > 2 && 'hidden sm:block')}
                />
              ))}
            </ul>
            <ButtonLink className='mt-4' href='/blog'>
              See more Blogs
            </ButtonLink>
          </article>
        </section>
      </main>
    </>
  );
}
