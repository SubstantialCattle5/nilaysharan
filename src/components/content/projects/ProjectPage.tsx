import { getMDXComponent } from 'mdx-bundler/client';
import React from 'react';
import { HiLink, HiUser } from 'react-icons/hi';
import { SiGithub } from 'react-icons/si';

import useScrollSpy from '@/hooks/useScrollSpy';

import MDXComponents from '@/components/content/MDXComponents';
import TableOfContents, {
  HeadingScrollSpy,
} from '@/components/content/TableOfContents';
import CloudinaryImg from '@/components/images/CloudinaryImg';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';

import { ProjectType } from '@/types/frontmatters';

const BlogPage = ({ code, frontmatter }: ProjectType) => {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  //#region  //*=========== Scrollspy ===========
  const activeSection = useScrollSpy();

  const [toc, setToc] = React.useState<HeadingScrollSpy>();
  const minLevel =
    toc?.reduce((min, item) => (item.level < min ? item.level : min), 10) ?? 0;

  React.useEffect(() => {
    const headings = document.querySelectorAll('.mdx h1, .mdx h2, .mdx h3');

    const headingArr: HeadingScrollSpy = [];
    headings.forEach((heading) => {
      const id = heading.id;
      const level = +heading.tagName.replace('H', '');
      const text = heading.textContent + '';

      headingArr.push({ id, level, text });
    });

    setToc(headingArr);
  }, [frontmatter.slug]);
  //#endregion  //*======== Scrollspy ===========

  return (
    <>
      <Seo
        templateTitle={frontmatter.title}
        description={frontmatter.description}
        isBlog
        date={new Date(
          frontmatter.lastUpdated ?? frontmatter.publishedAt
        ).toISOString()}
      />
      <main>
        <section>
          <div className='layout'>
            <CloudinaryImg
              publicId={`${frontmatter.banner}`}
              alt={frontmatter.title}
              width={1440}
              height={792}
            />

            <h1 className='mt-4'>{frontmatter.title}</h1>
            <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
              {frontmatter.description}
            </p>

            <div className='mt-2 flex flex-wrap items-center justify-start gap-3 text-sm font-medium text-gray-600 dark:text-gray-300'></div>
            {frontmatter.github && (
              <div className='inline-flex items-center gap-2'>
                <SiGithub className='text-lg text-gray-800 dark:text-white' />
                <CustomLink href={frontmatter.github} className='mt-1'>
                  Repository
                </CustomLink>
              </div>
            )}
            {frontmatter.github &&
              (frontmatter.youtube || frontmatter.link) &&
              ' - '}
            {frontmatter.link && (
              <div className='inline-flex items-center gap-2'>
                <HiLink className='text-lg text-gray-800 dark:text-white' />
                <CustomLink href={frontmatter.link} className='mt-1'>
                  Open Live Site
                </CustomLink>
              </div>
            )}
            {frontmatter.category && (
              <p className='mt-2 flex items-center justify-start gap-2 text-sm text-gray-600 dark:text-gray-300'>
                <HiUser className='text-lg text-gray-800 dark:text-white' />{' '}
                {frontmatter.category}
              </p>
            )}
            <hr className='mt-4 dark:border-gray-600' />

            <section className='lg:grid lg:grid-cols-[auto,250px] lg:gap-8'>
              <article className='mdx projects prose dark:prose-invert mx-auto w-full transition-colors'>
                <Component
                  components={
                    {
                      ...MDXComponents,
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } as any
                  }
                />
              </article>
              <aside className='py-4'>
                <div className='sticky top-36'>
                  <TableOfContents
                    toc={toc}
                    minLevel={minLevel}
                    activeSection={activeSection}
                  />
                </div>
              </aside>
            </section>
          </div>
        </section>
      </main>
    </>
  );
};

export default BlogPage;
