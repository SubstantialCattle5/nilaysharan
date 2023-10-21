'use client';
import clsx from 'clsx';
import React from 'react';
import Typewriter from 'typewriter-effect';

import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import CloudinaryImg from '@/components/images/CloudinaryImg';
import TechStack from '@/components/TechStack';

const Page = () => {
  const isLoaded = useLoaded();

  return (
    <>
      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='layout min-h-main py-20'>
            <h2 data-fade='0'>
              <Typewriter
                options={{
                  strings: [
                    'About',
                    'Über',
                    'حول',
                    'সম্পর্কে',
                    'ବିଷୟରେ',
                    '关于',
                    'ਬਾਰੇ ਵਿੱਚ',
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h2>
            <h1 className='mt-1' data-fade='1'>
              <Accent>Nilay Sharan</Accent>
            </h1>
            <div className='mt-4' data-fade='2'>
              <CloudinaryImg
                className='float-right ml-6 w-40 md:w-72'
                publicId='nilaysharan/about/main_picture'
                width='1500'
                height='1695'
                alt='Photo of me'
                preview={false}
              />
              <article className=''>
                <p data-fade='3'>
                  I'm a programmer based in India. I specialize in backend
                  development and have a keen interest in both cybersecurity and
                  frontend development. My programming journey began in 2021
                  when I joined college, and since then, I have been
                  continuously working on projects and learning new skills. Over
                  the years, I have honed my expertise and developed a passion
                  for creating innovative solutions.
                </p>
                <br />
                <p data-fade='4'>
                  I find great joy in learning from feedback and criticism, so
                  please feel free to reach out to me. I also enjoy occasional
                  writing and creating unconventional projects, both of which
                  you can find featured here. Thank you for visiting, and I hope
                  you enjoy it!
                </p>
                <br />
                <p data-fade='5'>
                  Thank you for visiting, and I hope you enjoy it!
                </p>
                <br />
              </article>
              <h3 className='mt-12' data-fade='5'>
                Current Favourite Stack:
              </h3>
              <figure className='mt-2' data-fade='6'>
                <TechStack />
              </figure>
            </div>
          </div>
        </section>

        <section>
          <div className='layout py-6'>
            <h2 className='mb-4'>Contact</h2>

            <article className=''>
              <p>
                If you have a project that you want to get started, think you
                need my help with something or just fancy talking about world
                domination, then get in touch!
              </p>
            </article>
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
