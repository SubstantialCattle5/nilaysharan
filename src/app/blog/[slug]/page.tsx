'use client';
import { usePathname } from 'next/navigation';
import React from 'react';
import Typewriter from 'typewriter-effect';

import BlogPage from '@/components/content/blogs/BlogPage';

import { BlogFrontmatter } from '@/types/frontmatters';

export default function PostPage() {
  const [data, setData] = React.useState<{
    code: string;
    frontmatter: BlogFrontmatter;
  }>();
  const [slug, setSlug] = React.useState<string>('');

  const pathName = usePathname().split('/').pop();

  React.useEffect(() => {
    if (pathName) {
      setSlug(pathName);
    }
  }, [pathName]);

  React.useEffect(() => {
    fetch(`/api/blog/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        return setData(data);
      });
  }, [slug]);

  if (!data) {
    return (
      <h1>
        <Typewriter
          options={{
            strings: ['Loading.....'],
            autoStart: true,
            loop: true,
          }}
        />
      </h1>
    );
  }

  return (
    <>
      <main>
        <BlogPage {...data} />
      </main>
    </>
  );
}
