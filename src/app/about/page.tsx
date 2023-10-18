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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum auctor ex vel nibh tempus, id suscipit mauris
                  ullamcorper. Integer at elit in arcu laoreet varius. Sed
                  congue, ex vel fermentum fermentum, eros dui commodo ligula,
                  vel viverra augue orci at libero. Vestibulum euismod mauris
                  sed est fermentum, non dapibus elit vestibulum. Pellentesque
                  quis sem sit amet odio ultricies tincidunt. Vestibulum
                  efficitur, ligula ut volutpat efficitur, odio dolor dignissim
                  arcu, in viverra dui justo a libero.
                </p>
                <br />
                <p data-fade='4'>
                  ces posuere cubilia Curae; Curabitur semper finibus justo, id
                  dictum tellus commodo vitae. Suspendisse potenti. Quisque et
                  sodales lectus. Suspendisse euismod leo eu tincidunt luctus.
                  Fusce dictum, odio vel ullamcorper cursus, elit odio fermentum
                  ex, nec interdum orci felis et ligula.
                </p>
                <br />
                <p data-fade='5'>
                  ces posuere cubilia Curae; Curabitur semper finibus justo, id
                  dictum tellus commodo vitae. Suspendisse potenti. Quisque et
                  sodales lectus. Suspendisse euismod leo eu tincidunt luctus.
                  Fusce dictum, odio vel ullamcorper cursus, elit odio fermentum
                  ex, nec interdum orci felis et ligula.
                </p>
              </article>
              <h3 className='mt-12'>Current Favourite Stack:</h3>
              <figure className='mt-2'>
                <TechStack />
              </figure>
            </div>
          </div>
        </section>

        <section>
          <div className='layout py-6'>
            <h2 className='mb-4'>Contact</h2>
            <em>
              "If the rise of an all-powerful artificial intelligence is
              inevitable, well it stands to reason that when they take power,
              our digital overlords will punish those of us who did not help
              them get there. Ergo, I would like to be a helpful idiot." -
              <Accent>Gilfoyle</Accent>
            </em>
            <article className='prose dark:prose-invert mt-4'>
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
