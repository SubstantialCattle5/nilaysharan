import { format } from "date-fns";
import { getMDXComponent } from "mdx-bundler/client";
import React from "react";
import { HiOutlineClock, HiOutlineKey, HiOutlineFlag } from "react-icons/hi";

import useScrollSpy from "@/hooks/useScrollSpy";

import Accent from "@/components/Accent";
import MDXComponents from "@/components/content/MDXComponents";
import TableOfContents, {
  HeadingScrollSpy,
} from "@/components/content/TableOfContents";
import CloudinaryImg from "@/components/images/CloudinaryImg";

import { WriteupType } from "@/types/frontmatters";
import clsx from "clsx";
import Tag from "@/components/content/Tag";

const WriteupPage = ({ code, frontmatter }: WriteupType) => {
  const Component = React.useMemo(() => {
    if (!code) return null;
    return getMDXComponent(code);
  }, [code]);

  // Don't render if we don't have the required data
  if (!code || !frontmatter) {
    return (
      <div className="layout py-12 text-center">
        <div className="text-gray-600 dark:text-gray-300">
          Loading writeup content...
        </div>
      </div>
    );
  }

  //#region  //*=========== Scrollspy ===========
  const activeSection = useScrollSpy();

  const [toc, setToc] = React.useState<HeadingScrollSpy>();
  const minLevel =
    toc?.reduce((min, item) => (item.level < min ? item.level : min), 10) ?? 0;

  React.useEffect(() => {
    const headings = document.querySelectorAll(".mdx h1, .mdx h2, .mdx h3");

    const headingArr: HeadingScrollSpy = [];
    headings.forEach((heading) => {
      const id =
        heading.id ||
        heading.textContent?.replace(/\s+/g, "-").toLowerCase() ||
        ""; //!FIX
      const level = +heading.tagName.replace("H", "");
      const text = heading.textContent + "";

      headingArr.push({ id, level, text });
    });

    setToc(headingArr);
  }, [frontmatter.slug]);
  //#endregion  //*=========== Scrollspy ===========

  return (
    <>
              <div className="layout">
        <div className="pb-4 dark:border-gray-600">
          {frontmatter.banner && (
            <CloudinaryImg
              publicId={frontmatter.banner}
              alt={`Photo from unsplash: ${frontmatter.title}`}
              width={1200}
              height={(1200 * 2) / 5}
              aspect={{ height: 2, width: 5 }}
              className="w-full"
            />
          )}

          <h1 className="mt-4">{frontmatter.title}</h1>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {frontmatter.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-start gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <HiOutlineClock className="text-base" />
              <Accent className="font-medium">
                {frontmatter.readingTime.text}
              </Accent>
            </div>
            
            <div className="flex items-center gap-2">
              <HiOutlineFlag className="text-base" />
              <Accent className="font-medium">
                {format(
                  new Date(frontmatter.lastUpdated ?? frontmatter.publishedAt),
                  "MMMM dd, yyyy"
                )}
              </Accent>
            </div>

            {frontmatter.platform && (
              <div className="flex items-center gap-2">
                <HiOutlineKey className="text-base" />
                <span>{frontmatter.platform}</span>
              </div>
            )}

            {frontmatter.difficulty && (
              <span
                className={clsx(
                  'px-2 py-1 rounded text-xs font-medium',
                  {
                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300':
                      frontmatter.difficulty === 'Easy',
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300':
                      frontmatter.difficulty === 'Medium',
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300':
                      frontmatter.difficulty === 'Hard',
                  }
                )}
              >
                {frontmatter.difficulty}
              </span>
            )}
          </div>

          {frontmatter.tags && (
            <div className="mt-4 flex flex-wrap gap-2">
              {frontmatter.tags.split(',').map((tag) => (
                <Tag key={tag}>
                  {tag}
                </Tag>
              ))}
            </div>
          )}
        </div>

        <hr className="dark:border-gray-600" />

        <section className="lg:grid lg:grid-cols-[auto,250px] lg:gap-8">
          <article className="mdx prose mx-auto mt-4 w-full transition-colors dark:prose-invert">
            {Component && (
              <Component
                components={
                  {
                    ...MDXComponents,
                  } as any
                }
              />
            )}
          </article>

          <aside className="py-4">
            <div className="sticky top-36">
              <TableOfContents
                toc={toc}
                minLevel={minLevel}
                activeSection={activeSection}
              />
            </div>
          </aside>
        </section>
      </div>
    </>
  );
};

export default WriteupPage;
