import clsx from 'clsx';
import * as React from 'react';
import { HiLink } from 'react-icons/hi';

import Accent from '@/components/Accent';
import UnstyledLink from '@/components/links/UnstyledLink';

type WebsiteCardProps = {
  url: string;
  title?: string;
  description?: string;
} & React.ComponentPropsWithoutRef<'div'>;

export default function WebsiteCard({ url, title, description, className }: WebsiteCardProps) {
  const hostname = React.useMemo(() => {
    try {
      const u = new URL(url.startsWith('http') ? url : `https://${url}`);
      return u.hostname.replace(/^www\./, '');
    } catch {
      return url;
    }
  }, [url]);

  return (
    <div className='not-prose'>
      <UnstyledLink
        href={url.startsWith('http') ? url : `https://${url}`}
        openNewTab
        className={clsx(
          '!block max-w-xl',
          'not-prose px-4 py-3',
          'rounded-lg border border-gray-300 dark:border-gray-600',
          'scale-100 transform-gpu hover:scale-[1.02] active:scale-[0.97]',
          'transition duration-100',
          'animate-shadow',
          className
        )}
      >
        <div className='flex items-center gap-2 text-sm md:text-base'>
          <HiLink className='ml-0.5 shrink-0 text-[1.2em]' />
          <Accent className={clsx('truncate overflow-ellipsis font-semibold')}>
            {title || hostname}
          </Accent>
        </div>
        {description ? (
          <p className={clsx('mt-2 text-sm text-gray-700 dark:text-gray-200')}>
            {description}
          </p>
        ) : null}
        <div className='mt-2 text-xs text-gray-500 dark:text-gray-400'>
          {hostname}
        </div>
      </UnstyledLink>
    </div>
  );
}


