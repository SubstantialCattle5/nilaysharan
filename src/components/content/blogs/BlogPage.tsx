import { format } from "date-fns";
import { getMDXComponent } from "mdx-bundler/client";
import React from "react";
import { HiOutlineClock } from "react-icons/hi";

import useScrollSpy from "@/hooks/useScrollSpy";

import Accent from "@/components/Accent";
import MDXComponents from "@/components/content/MDXComponents";
import TableOfContents, {
  HeadingScrollSpy,
} from "@/components/content/TableOfContents";
import CloudinaryImg from "@/components/images/CloudinaryImg";

import { BlogType } from "@/types/frontmatters";

const BlogPage = ({ code, frontmatter }: BlogType) => {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);

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
      <main>
        <section className="">
          <div className="layout">
            <div className="pb-4 dark:border-gray-600">
              <CloudinaryImg
                publicId={`${frontmatter.banner}`}
                alt={`Photo from unsplash: ${frontmatter.banner}`}
                width={1200}
                height={(1200 * 2) / 5}
                aspect={{ height: 2, width: 5 }}
              />
              <h1 className="mt-4">{frontmatter.title}</h1>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Written on{" "}
                {format(new Date(frontmatter.publishedAt), "MMMM dd, yyyy")} by
                Nilay Nath Sharan.
              </p>
              <div className="mt-6 flex items-center justify-start gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-1">
                  <HiOutlineClock className="inline-block text-base" />
                  <Accent>{frontmatter.readingTime.text}</Accent>
                </div>
              </div>
            </div>
            <hr className="dark:border-gray-600" />

            <section className="lg:grid lg:grid-cols-[auto,250px] lg:gap-8">
              <article className="mdx prose dark:prose-invert mx-auto mt-4 w-full transition-colors">
                <Component
                  components={
                    {
                      ...MDXComponents,
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } as any
                  }
                />
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
        </section>
      </main>
    </>
  );
};

export default BlogPage;
