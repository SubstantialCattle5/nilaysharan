'use client';
import { usePathname } from 'next/navigation';
import React from 'react';
import TypewriterClient from '@/components/TypewriterClient';

import WriteupPage from '@/components/content/writeups/WriteupPage';

import { WriteupFrontmatter } from '@/types/frontmatters';

export default function WriteupPostPage() {
  const [data, setData] = React.useState<{
    code: string;
    frontmatter: WriteupFrontmatter;
  }>();
  const [slug, setSlug] = React.useState<string>('');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const pathName = usePathname().split('/').pop();

  React.useEffect(() => {
    if (pathName) {
      setSlug(pathName);
    }
  }, [pathName]);

  React.useEffect(() => {
    if (!slug) return;
    
    setLoading(true);
    setError(null);
    
    fetch(`/api/writeups/${slug}`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch writeup: ${res.status}`);
        }
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        return data;
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.error('Error fetching writeup:', err);
        setError(err.message || 'Failed to load writeup');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <main>
        <div className="layout py-12 text-center">
          <h1>
            <TypewriterClient
              options={{
                strings: ['Loading writeup from GitHub.....'],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <div className="layout py-12 text-center">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">
            Error Loading Writeup
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            {error}
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            The writeup might not exist or there was an issue fetching it from GitHub.
          </p>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main>
        <div className="layout py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-600 dark:text-gray-300">
            Writeup Not Found
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            The requested writeup could not be found.
          </p>
        </div>
      </main>
    );
  }

  return (
    <>
      <main>
        <WriteupPage {...data} />
      </main>
    </>
  );
}
