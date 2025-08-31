import clsx from 'clsx';
import { format } from 'date-fns';
import * as React from 'react';
import { HiOutlineClock, HiOutlineKey } from 'react-icons/hi';

import Accent from '@/components/Accent';
import Tag from '@/components/content/Tag';
import CloudinaryImg from '@/components/images/CloudinaryImg';
import UnstyledLink from '@/components/links/UnstyledLink';

import { WriteupFrontmatter } from '@/types/frontmatters';

type WriteupCardProps = {
  post: WriteupFrontmatter;
  checkTagged?: (tag: string) => boolean;
} & React.ComponentPropsWithoutRef<'li'>;

export default function WriteupCard({
  post,
  className,
  onClick,
  checkTagged,
}: WriteupCardProps) {
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
        href={`/writeups/${post.slug}`}
      >
        {post.banner && (
          <div className='relative'>
            <CloudinaryImg
              noStyle
              className='pointer-events-none overflow-hidden rounded-t-md'
              publicId={post.banner}
              alt='Writeup banner'
              width={1200}
              height={(1200 * 2) / 5}
              aspect={{ height: 2, width: 5 }}
              preview={false}
            />
            <div
              className={clsx(
                'absolute bottom-0 w-full px-4 py-2',
                'mt-2 flex flex-wrap justify-end gap-x-2 gap-y-1 text-sm text-black dark:text-gray-100'
              )}
            >
              {post.tags.split(',').map((tag) => (
                <Tag
                  tabIndex={-1}
                  className='bg-opacity-80 dark:!bg-opacity-60'
                  key={tag}
                >
                  {checkTagged?.(tag) ? <Accent>{tag}</Accent> : tag}
                </Tag>
              ))}
            </div>
          </div>
        )}
        <div className='p-4'>
          <div className='flex items-start justify-between'>
            <h4 className='text-gray-800 dark:text-gray-100 flex-1'>{post.title}</h4>
            {post.difficulty && (
              <span
                className={clsx(
                  'ml-2 px-2 py-1 rounded text-xs font-medium',
                  {
                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300':
                      post.difficulty === 'Easy',
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300':
                      post.difficulty === 'Medium',
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300':
                      post.difficulty === 'Hard',
                  }
                )}
              >
                {post.difficulty}
              </span>
            )}
          </div>
          
          <div className='mt-2 flex items-center justify-start gap-4 text-sm font-medium text-gray-600 dark:text-gray-300'>
            <div className='flex items-center gap-1'>
              <HiOutlineClock className='inline-block text-base' />
              <Accent>{post.readingTime.text}</Accent>
            </div>
            {post.platform && (
              <div className='flex items-center gap-1'>
                <HiOutlineKey className='inline-block text-base' />
                <span>{post.platform}</span>
              </div>
            )}
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
          
          {!post.banner && post.tags && (
            <div className='mt-3 flex flex-wrap gap-2'>
              {post.tags.split(',').map((tag) => (
                <Tag
                  tabIndex={-1}
                  className='bg-opacity-80 dark:!bg-opacity-60'
                  key={tag}
                >
                  {checkTagged?.(tag) ? <Accent>{tag}</Accent> : tag}
                </Tag>
              ))}
            </div>
          )}
        </div>
      </UnstyledLink>
    </li>
  );
}
