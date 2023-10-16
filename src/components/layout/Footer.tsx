import React from 'react';
import { IconType } from 'react-icons';
import { FiMail } from 'react-icons/fi';
import { SiGithub, SiLinkedin } from 'react-icons/si';

import Accent from '@/components/Accent';
import UnstyledLink from '@/components/links/UnstyledLink';

const Footer = () => {
  return (
    <footer className='mt-4 pb-2'>
      <main className='layout flex flex-col items-center border-t pt-6 dark:border-gray-600'>
        <FooterLinks />

        <p className='mt-12 font-medium text-gray-600 dark:text-gray-300'>
          Reach me out
        </p>
        <SocialLinks />

        <p className='mt-8 text-sm text-gray-600 dark:text-gray-300'>
          © Nilay Sharan {new Date().getFullYear()}
        </p>
      </main>
    </footer>
  );
};

export default Footer;

export const FooterLinks = () => {
  return (
    <div className='flex flex-wrap justify-center gap-x-8 gap-y-4'>
      {footerLinks.map(({ href, text }) => (
        <a key={`${href}${text}`}>
          <UnstyledLink
            className='animated-underline focus-visible:ring-primary-300 rounded-sm text-sm font-medium focus:outline-none focus-visible:ring dark:text-gray-200'
            href={href}
          >
            {text}
          </UnstyledLink>
        </a>
      ))}
    </div>
  );
};

export const SocialLinks = () => {
  return (
    <div className='mt-2 flex space-x-4'>
      <div className='flex items-center justify-center'>
        <button className='focus-visible:ring-primary-300 rounded-sm align-middle focus:outline-none focus-visible:ring'>
          <FiMail className='hover:text-primary-300 dark:hover:text-primary-300 h-7 w-7 align-middle text-gray-600 dark:text-gray-300' />
        </button>
        {socials.map((social) => (
          <UnstyledLink
            key={social.id}
            className='focus-visible:ring-primary-300 inline-flex items-center justify-center rounded-sm pl-5 focus:outline-none focus-visible:ring'
            href={social.href}
          >
            <social.icon className='hover:text-primary-300 dark:hover:text-primary-300 my-auto h-6 w-6 align-middle text-gray-600 transition-colors dark:text-gray-300' />
          </UnstyledLink>
        ))}
      </div>
    </div>
  );
};
const footerLinks: { href: string; text: string; tooltip: React.ReactNode }[] =
  [
    {
      href: 'https://github.com/substantialcattle5/nilaysharan',
      text: 'Source Code',
      tooltip: (
        <>
          This website is <strong>open source</strong>!
        </>
      ),
    },
    {
      href: '/design',
      text: 'Design',
      tooltip: 'nilaysharan.com color palette',
    },
    {
      href: '/',
      text: 'Docs',
      tooltip: 'Personal documentation about my best practices on development',
    },
    {
      href: '/guestbook',
      text: 'Guestbook',
      tooltip:
        'Leave whatever you like to say—message, appreciation, suggestions',
    },
  ];

type Social = {
  href: string;
  icon: IconType;
  id: string;
  text: React.ReactNode;
};
const socials: Social[] = [
  {
    href: 'https://github.com/substantialcattle5/',
    icon: SiGithub,
    id: 'Github',
    text: (
      <>
        See my projects on <Accent className='font-medium'>Github</Accent>
      </>
    ),
  },
  {
    href: 'https://www.linkedin.com/in/nilaynathsharan/',
    icon: SiLinkedin,
    id: 'Linkedin',
    text: (
      <>
        Find me on <Accent className='font-medium'>Linkedin</Accent>
      </>
    ),
  },
];
