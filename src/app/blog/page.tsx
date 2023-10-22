'use client';
import clsx from 'clsx';
import React from 'react';

import { getTags, sortByDate, sortDateFn } from '@/lib/mdx.client';
import useInjectContentMeta from '@/hooks/useInjectContentMeta';
import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import BlogCard from '@/components/content/blogs/BlogCard';
import ContentPlaceholder from '@/components/content/ContenPlaceholder';
import StyledInput from '@/components/content/form/StyledInput';
import Tag, { SkipNavTag } from '@/components/content/Tag';

import { BlogFrontmatter } from '@/types/frontmatters';

const Page = () => {
  const isLoaded = useLoaded();
  const popluatedPosts = useInjectContentMeta('blog', 'allBlogs');

  //#region //* Search
  const posts = sortByDate(popluatedPosts as BlogFrontmatter[]);
  const [search, setSearch] = React.useState<string>('');
  const [filteredPosts, setFilteredPosts] = React.useState<
    Array<BlogFrontmatter>
  >(() => [...posts]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  React.useEffect(() => {
    const jugglePosts = popluatedPosts as BlogFrontmatter[];
    const results = jugglePosts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase()) ||
        // Check if splitted search contained in tag
        search
          .toLowerCase()
          .split(' ')
          .every((tag) => post.tags.includes(tag))
    );
    results.sort(sortDateFn);
    setFilteredPosts(results);
  }, [search, popluatedPosts]);

  //#region //* end Search
  const currentPosts = filteredPosts;

  //#region //* Tag
  const tags = getTags(popluatedPosts as BlogFrontmatter[]);
  const toggleTag = (tag: string) => {
    if (search.includes(tag)) {
      setSearch((s) =>
        s
          .split(' ')
          .filter((t) => t !== tag)
          ?.join(' ')
      );
    } else {
      // append tag
      setSearch((s) => (s !== '' ? `${s.trim()} ${tag}` : tag));
    }
  };
  /** Currently available tags based on filtered posts */
  const filteredTags = getTags(currentPosts);

  /** Show accent if not disabled and selected  */
  const checkTagged = (tag: string) => {
    return (
      filteredTags.includes(tag) &&
      search.toLowerCase().split(' ').includes(tag)
    );
  };
  //#region //* end Tag

  return (
    <>
      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='layout py-12'>
            <h1 className='text-3xl md:text-5xl' data-fade='0'>
              <Accent>Blog </Accent>
            </h1>
            <p className='mt-2 text-gray-600 dark:text-gray-300' data-fade='1'>
              General thoughts, tutorials, and guides.
            </p>
            <StyledInput
              data-fade='2'
              className='mt-4'
              placeholder='Search...'
              onChange={handleSearch}
              value={search}
              type='text'
            />
            <div
              className='mt-2 flex flex-wrap items-baseline justify-start gap-2 text-sm text-gray-600 dark:text-gray-300'
              data-fade='3'
            >
              <span className='font-medium'>Choose topic:</span>
              <SkipNavTag>
                {tags.map((tag) => (
                  <Tag
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    disabled={!filteredTags.includes(tag)}
                  >
                    {checkTagged(tag) ? <Accent>{tag}</Accent> : tag}
                  </Tag>
                ))}
              </SkipNavTag>
            </div>
            <ul
              className='mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'
              data-fade='5'
            >
              {currentPosts.length > 0 ? (
                currentPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))
              ) : (
                <ContentPlaceholder />
              )}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
