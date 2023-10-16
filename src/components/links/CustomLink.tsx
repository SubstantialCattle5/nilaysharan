import clsx from 'clsx';
import React from 'react';

import UnstyledLink, { UnstyledLinkProps } from './UnstyledLink';

export default function CustomLink({
  children,
  className = '',
  ...rest
}: UnstyledLinkProps) {
  return (
    <UnstyledLink
      {...rest}
      className={clsx(
        'animated-underline custom-link inline-flex items-center font-medium',
        'focus-visible:ring-primary-300 focus:outline-none focus-visible:ring',
        'border-dark border-b border-dotted hover:border-black/0',
        className
      )}
    >
      <span className='dark:from-primary-300 dark:to-primary-400 dark:bg-gradient-to-tr dark:bg-clip-text dark:text-transparent'>
        {children}
      </span>
    </UnstyledLink>
  );
}
