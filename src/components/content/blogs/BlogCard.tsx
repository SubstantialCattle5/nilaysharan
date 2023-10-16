import clsx from 'clsx';
import { format } from 'date-fns';
import * as React from 'react';
import { HiOutlineClock } from 'react-icons/hi';

import Accent from '@/components/Accent';
import UnstyledLink from '@/components/links/UnstyledLink';

import { BlogFrontmatter } from '@/types/frontmatters';

type BlogCardProps = {
  post: BlogFrontmatter;
  checkTagged?: (tag: string) => boolean;
} & React.ComponentPropsWithoutRef<'li'>;

export default function BlogCard({ post, className, onClick }: BlogCardProps) {
  return (
    <li
      className={clsx(
        'w-full rounded-md border border-gray-300 bg-white dark:border-gray-600 dark:bg-transparent',
        'scale-100 hover:scale-[1.02] active:scale-[0.97] motion-safe:transform-gpu',
        'transition duration-100',
        'motion-reduce:hover:scale-100',
        'animate-shadow',
        className
      )}
      onClick={onClick}
    >
      <UnstyledLink
        className='focus-visible:ring-primary-300 block h-full rounded-md focus:outline-none focus-visible:ring'
        href={`/blog/${post.slug}`}
      >
        <div className='relative'>
          {/* <CloudinaryImg
            noStyle
            className='pointer-events-none overflow-hidden rounded-t-md'
            publicId={`theodorusclarence/banner/${post.banner}`}
            alt='Photo taken from unsplash'
            width={1200}
            height={(1200 * 2) / 5}
            aspect={{ height: 2, width: 5 }}
            preview={false}
          /> */}
        </div>
        <div className='p-4'>
          <h4 className='text-gray-800 dark:text-gray-100'>{post.title}</h4>
          <div className='mt-2 flex items-center justify-start gap-2 text-sm font-medium text-gray-600 dark:text-gray-300'>
            <div className='flex items-center gap-1'>
              <HiOutlineClock className='inline-block text-base' />
              <Accent>{`${post.readingTime} mins`}</Accent>
            </div>
          </div>
          <p className='mb-2 mt-4 text-sm text-gray-600 dark:text-gray-300'>
            <span className='font-bold text-gray-800 dark:text-gray-100'>
              {format(
                new Date(post.lastUpdated ?? post.publishedAt),
                'MMMM dd, yyyy'
              )}
            </span>
          </p>
          <p className='text-sm text-gray-700 dark:text-gray-300'>
            {post.description}
          </p>
        </div>
      </UnstyledLink>
    </li>
  );
}
