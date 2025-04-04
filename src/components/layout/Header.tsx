'use client';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import React from 'react';

import ThemeButton from '@/components/buttons/ThemeButton';
import UnstyledLink from '@/components/links/UnstyledLink';

interface HeaderProps {
  large?: boolean;
}
const Header = ({ large = false }: HeaderProps) => {
  //#region  //*=========== Route Functionality ===========
  const baseRoute = usePathname();
  //#endregion  //*======== Route Functionality ===========

  //#region  //*=========== Scroll Shadow ===========
  const [onTop, setOnTop] = React.useState<boolean>(true);
  React.useEffect(() => {
    const handleScroll = () => {
      setOnTop(window.pageYOffset === 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  //#endregion  //*======== Scroll Shadow ===========

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 transition-shadow',
        !onTop && 'shadow-sm'
      )}
    >
      {/* Gradient List */}
      <div className='from-primary-200 via-primary-300 to-primary-400 h-2 bg-gradient-to-tr' />

      <div className='dark:bg-dark bg-white transition-colors dark:text-white'>
        <nav
          className={clsx(
            'layout flex items-center justify-between py-4',
            large && 'lg:max-w-[68rem]'
          )}
        >
          <ul className='flex items-center justify-between space-x-3 text-xs md:space-x-4 md:text-base'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <UnstyledLink
                  href={href}
                  className={clsx(
                    'rounded-sm py-2 transition-colors',
                    'font-medium text-black dark:text-white',
                    'dark:hover:text-primary-300 group',
                    'focus-visible:ring-primary-300 focus:outline-none focus-visible:ring'
                  )}
                >
                  <span
                    className={clsx(
                      'transition-colors',
                      'bg-primary-300/0 group-hover:bg-primary-300/20 dark:group-hover:bg-primary-300/0',
                      href === baseRoute &&
                        '!bg-primary-300/50 dark:from-primary-300 dark:to-primary-400 dark:bg-gradient-to-tr dark:bg-clip-text dark:text-transparent'
                    )}
                  >
                    {label}
                  </span>
                </UnstyledLink>
              </li>
            ))}
          </ul>
          <ThemeButton />
        </nav>
      </div>
    </header>
  );
};

export default Header;

const links = [
  { href: '/', label: 'Home' },
  { href: '/archive', label: 'Archives' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
];
