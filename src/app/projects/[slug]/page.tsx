'use client';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import Typewriter from 'typewriter-effect';

import ProjectPage from '@/components/content/projects/ProjectPage';

import { ProjectFrontmatter } from '@/types/frontmatters';

export default function PagePage() {
  const [data, setData] = React.useState<{
    code: string;
    frontmatter: ProjectFrontmatter;
  }>();
  const [slug, setSlug] = React.useState<string>('');

  const pathName = usePathname().split('/').pop();

  React.useEffect(() => {
    if (pathName) {
      setSlug(pathName);
    }
  }, [pathName]);

  React.useEffect(() => {
    fetch(`/api/projects/${slug}`)
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
        <ProjectPage {...data} />
      </main>
    </>
  );
}
