import { promises, readFileSync } from 'fs';
import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import { join } from 'path';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import {
  ContentType,
  Frontmatter,
  PickFrontmatter,
} from '@/types/frontmatters';

/**
 * This function returns an array of file slugs.
 * @param {ContentType} type - The content type.
 * @returns {Promise<Array<string>>} - A promise that resolves to an array of file slugs.
 */
export async function getFileSlugArray(type: ContentType) {
  return getFileList(join(process.cwd(), 'src', 'contents', type)).then(
    (paths) =>
      paths.map((path) =>
        path
          .replace(join(process.cwd(), 'src', 'contents', type) + '/', '')
          .replace('.mdx', '')
          .split('/')
      )
  );
}

/**
 * This function returns the content of a file by its slug.
 * @param {ContentType} type - The content type.
 * @param {string} slug - The slug of the file.
 * @returns {Promise<{code: string, frontmatter: Frontmatter}>} - A promise that resolves to an object containing the code and frontmatter of the file.
 */
export async function getFileBySlug(
  source: string,
  slug: string
): Promise<{ code: string; frontmatter: Frontmatter }> {
  const { code, frontmatter } = await bundleMDX({
    source,
    mdxOptions(options) {
      options.remarkPlugins = [...(options?.remarkPlugins ?? []), remarkGfm];
      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        rehypeSlug,
        () =>
          rehypePrettyCode({
            theme: 'css-variables',
          }),
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['hash-anchor'],
            },
          },
        ],
      ];

      return options;
    },
  });

  return {
    code,
    frontmatter: {
      wordCount: source.split(/\s+/gu).length,
      readingTime: readingTime(source),
      slug: slug as string,
      banner: frontmatter.banner,
      title: frontmatter.title,
      description: frontmatter.description,
      publishedAt: frontmatter.publishedAt,
      tags: frontmatter.tags,
    },
  };
}

/**
 * This function returns a list of all files in a directory.
 * @param {string} dirName - The name of the directory.
 * @returns {Promise<Array<string>>} - A promise that resolves to an array of file paths.
 */
const getFileList = async (dirName: string) => {
  let files: string[] = [];
  const items = await promises.readdir(dirName, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory()) {
      files = [...files, ...(await getFileList(`${dirName}/${item.name}`))];
    } else {
      files.push(`${dirName}/${item.name}`);
    }
  }

  return files;
};

/**
 * This function returns the frontmatter of all files of a certain content type.
 * @param {T extends ContentType} type - The content type.
 * @returns {Promise<Array<PickFrontmatter<T>>>} - A promise that resolves to an array of frontmatter objects.
 */
export async function getAllFilesFrontmatter<T extends ContentType>(type: T) {
  const files = await getFileList(join(process.cwd(), 'src', 'contents', type));

  return files.reduce((allPosts: Array<PickFrontmatter<T>>, absolutePath) => {
    const source = readFileSync(absolutePath, 'utf8');
    const { data } = matter(source);

    const res = [
      {
        ...(data as PickFrontmatter<T>),
        slug: absolutePath
          .replace(join(process.cwd(), 'src', 'contents', type) + '/', '')
          .replace('.mdx', ''),
        readingTime: readingTime(source),
      },
      ...allPosts,
    ];
    return res;
  }, []);
}

/**
 * This function returns recommendations based on a current slug.
 * @param {string} currSlug - The current slug.
 * @returns {Promise<Array<PickFrontmatter<'blog'>>>} - A promise that resolves to an array of recommended blog posts.
 */
export async function getRecommendations(currSlug: string) {
  const frontmatters = await getAllFilesFrontmatter('blog');

  // Get current frontmatter
  const currentFm = frontmatters.find((fm) => fm.slug === currSlug);

  // Remove currentFm and Bahasa Posts, then randomize order
  const otherFms = frontmatters
    .filter((fm) => !fm.slug.startsWith('id-') && fm.slug !== currSlug)
    .sort(() => Math.random() - 0.5);

  // Find with similar tags
  const recommendations = otherFms.filter((op) =>
    op.tags.split(',').some((p) => currentFm?.tags.split(',').includes(p))
  );

  // Populate with random recommendations if not enough
  const threeRecommendations =
    recommendations.length >= 3
      ? recommendations
      : [
          ...recommendations,
          ...otherFms.filter(
            (fm) => !recommendations.some((r) => r.slug === fm.slug)
          ),
        ];

  // Only return first three
  return threeRecommendations.slice(0, 3);
}

/**
 * This function returns featured content based on a list of features.
 * @param {Array<T>} contents - An array of content objects.
 * @param {Array<string>} features - An array of features.
 * @returns {Array<T>} - An array of featured content objects.
 */
export function getFeatured<T extends Frontmatter>(
  contents: Array<T>,
  features: string[]
) {
  // override as T because there is no typechecking on the features array
  return features.map(
    (feat) => contents.find((content) => content.slug === feat) as T
  );
}

export function preFetch({ type }: { type: string }) {
  const service = readFileSync(
    join(process.cwd(), 'public', 'contents', type, 'service-animal.mdx'),
    'utf8'
  );
  const pather = readFileSync(
    join(
      process.cwd(),
      'public',
      'contents',
      type,
      'pather-panchali-the-enduring-impact-on-modern-indian-cinema.mdx'
    ),
    'utf8'
  );

  const blogs = [
    { slug: 'service-animal', source: service },
    {
      slug: 'pather-panchali-the-enduring-impact-on-modern-indian-cinema',
      source: pather,
    },
  ];

  return blogs;
}
// function to prefetch all the routes
export function prefetchRoutes(): {
  slug: string;
  source: string;
}[] {
  const service = `
---
title: 'Service Animal : An Emotional Musical Journey'
publishedAt: '2021-12-31'
description: 'Service Animal" by Jamblu: A soul-stirring musical odyssey exploring self-love and human connections, embracing emotions from heartache to hope.'
banner: 'nilaysharan/blog/service_animal/banner'
tags: 'review,album'
---

  
  # Service Animal: An Emotional Rollercoaster by Jamblu
  
  ## Introduction
  
  "Service Animal" is an album crafted by Jamblu, an artist known also as Kartik Pillai hailing from New Delhi. The album's release in 2020 introduced seven songs that delve into themes of self-expression, self-love, and freedom. This work marks a departure from Jamblu's previous darker, experimental electronica style, embracing a more approachable, mellower sound.
  
  ## The Album's Essence
  
  The album title and its cover art for "Service Animal" by Jamblu reflect a sense of camaraderie and encouragement that the artist either seeks or extends through his musical creations. The album cover features a childhood photograph set against a backdrop resembling a forest collage, symbolizing innocence and connection.
  
  ### Tracklist:
  
  1. **If I Could Be Born Again**
  
     - Kicking off with "If I Could Be Born Again," the album embarks on a journey contemplating the prospect of starting anew and living a divergent life. The song intertwines smooth saxophones with wavering synth melodies, casting a bittersweet atmosphere that persists throughout the album.
  
  2. **We Never Fight (Cause We Never Talk)**
  
     - Following is "We Never Fight (Cause We Never Talk)," a loveless tune reminiscent of the works of Peter Cat Recording Co. It paints a portrait of a fractured relationship marred by a lack of communication or intimacy. The vocals by Anand Viankara carry a sense of resignation and detachment, subtly conveying the artist's emotional disengagement despite obvious heartache.
  
  3. **Surround Yourself With The People You Love (and who love you)**
  
     - "Surround Yourself With The People You Love (and who love you)" by Jamblu showcases the album's experimental flair through intricate electronic effects. The track exudes a raw energy that empowers listeners, while Jamblu's distorted vocals deliver the message of cherishing genuine connections: "Surround yourself with the people you love / And who love you / Cause they’re the ones who’ll always be there for you / No matter what you do."
  
  4. **Take Your Time**
  
     - With "Take Your Time," Jamblu crafts an upbeat and optimistic piece evoking the nostalgia of childlike joy and innocence. The song incorporates playful synth sounds and infectious hooks, cultivating a joyful ambiance.
  
  5. **Love Songs For Bad Friends**
  
     - "Love Songs For Bad Friends" emerges as a spiritual successor to "We Never Fight," expressing the artist's remorse and resentment over failed relationships and friendships. The song employs mournful piano chords and strings to create a solemn mood. Dhruv Bhola's vocals convey the artist's bitterness and anger towards former friends, yet also signal a readiness to release the past, with lyrics like "I’m over it / I don’t need you anymore."
  
  6. **I Want to Live**
     - The album concludes with "I Want to Live," an instrumental track that serves as an outro, exuding a sense of serenity and tranquility through ambient sounds. This composition could symbolize the artist's inner peace achieved through his musical expression.
  
  ## Themes Explored
  
  "Service Animal" by Jamblu isn't merely an album of sounds; it's an emotional rollercoaster capturing both the highs and lows. The artist illustrates that even indifference can be a form of affection, extending well-wishes with lines like "you’re happy, and warm." Amid expressions of regret and miscommunication, a glimmer of hope for redemption shines through. In a world where becoming like service animals is a risk, rising above is a cherished privilege—a pursuit worth undertaking.
  `;
  const pather = `
  ---
  title: 'Pather Panchali : The Enduring Impact on the Mordern Indian Cinema'
  publishedAt: '2021-12-31'
  description: 'Service Animal" by Jamblu: A soul-stirring musical odyssey exploring self-love and human connections, embracing emotions from heartache to hope.'
  banner: 'nilaysharan/blog/pather_panchali/banner'
  tags: 'deep dive,movie'
  ---  
  
  ## **Introduction**
  
  The film was adapted from the novel of the same name by Bibhutibhushan Bandopadhyay, and Ray's vision breathed life into the story, capturing the essence of rural Bengal with remarkable precision. _Pather Panchali_ follows the journey of a young boy named Apu and his impoverished family, exploring their dreams, struggles, and resilience amidst the harsh realities of life. Ray's keen observational skills and attention to detail allowed him to present a deeply intimate and honest portrayal of the characters and their surroundings.
  
  _Pather Panchali_'s impact on modern Indian cinema is multi-faceted. It not only introduced groundbreaking filmmaking techniques but also brought to the forefront the power of humanistic storytelling. The film marked a departure from the formulaic narratives of the time and set a new standard for artistic expression and social commentary in Indian cinema. Its influence continues to be felt across generations, inspiring filmmakers to push the boundaries of storytelling and explore themes that resonate with the human experience.
  
  ## **Revolutionizing Filmmaking Techniques**
  
  _Pather Panchali_ revolutionized Indian cinema by introducing innovative filmmaking techniques that were hitherto unseen. Satyajit Ray's meticulous attention to detail and his commitment to capturing the essence of everyday life in rural Bengal set a new benchmark for realism in Indian cinema. The film's stunning visuals, captured by the talented cinematographer Subrata Mitra, showcased the beauty and simplicity of the rural landscape with remarkable finesse. Mitra's use of natural lighting and his ability to capture the nuances of the environment created an immersive experience for the audience, blurring the lines between fiction and reality.
  
  One of the notable aspects of _Pather Panchali_ was Ray's use of long takes, allowing the scenes to unfold naturally and giving the viewers a sense of being present in the moment. This technique added a sense of authenticity and depth to the storytelling, as it allowed the characters to breathe and their emotions to unfold organically. Ray's decision to shoot on-location further enhanced the film's realism, as he captured the sights, sounds, and textures of rural Bengal, immersing the audience in the world of the characters.
  
  In addition to technical innovations, Ray's directorial approach emphasized a naturalistic style of acting. He cast mostly non-professional actors, choosing individuals whose faces and demeanors embodied the characters they portrayed. This approach brought a genuine quality to the performances, adding to the film's realistic portrayal of everyday life. Ray's attention to detail and commitment to capturing authenticity in every aspect of filmmaking set new standards for Indian cinema, influencing future generations of filmmakers to pay closer attention to the visual and aesthetic elements of their craft.
  
  ## **Exploration of Humanistic Themes**
  
  One of the most significant impacts of _Pather Panchali_ on modern Indian cinema is its exploration of humanistic themes that continue to resonate with audiences today. The film delves into the struggles of a poor Bengali family, the Rays, living in a remote village. Ray's sensitive portrayal of the characters and their relationships created a deep sense of empathy among viewers. Through the lens of the Rays, Ray addresses universal themes such as poverty, childhood innocence, the bond between siblings, and the indomitable human spirit.
  
  _Pather Panchali_ captures the poignancy and beauty in the mundane aspects of life, celebrating the small joys and simple pleasures amidst the hardships faced by the characters. The film evokes a sense of nostalgia and invites the audience to reflect on their own experiences and relationships. Ray's exploration of these humanistic themes adds depth and emotional resonance to the narrative, leaving a lasting impact on the audience's hearts and minds.
  
  Furthermore, _Pather Panchali_'s portrayal of poverty and the struggles of the Rays resonated with audiences across social and cultural backgrounds, transcending boundaries. The film brought attention to the lived experiences of marginalized communities, shedding light on their realities and offering a platform for their stories to be heard. This aspect of _Pather Panchali_'s thematic exploration played a crucial role in expanding the scope of Indian cinema, encouraging filmmakers to explore diverse narratives and provide a voice to underrepresented communities.
  
  ## **Influence on Indian New Wave Cinema**
  
  _Pather Panchali_ played a pivotal role in inspiring the Indian New Wave movement, also known as the Parallel Cinema movement, during the 1960s and 1970s. The film's artistic and thematic achievements laid the foundation for a wave of socially relevant and artistically driven films in India. Filmmakers such as Mrinal Sen, Shyam Benegal, and Adoor Gopalakrishnan emerged from this movement, aiming to challenge the conventions of mainstream cinema and offer more realistic and socially conscious narratives.
  
  One of the key influences of _Pather Panchali_ on Indian New Wave Cinema was Ray's emphasis on capturing the essence of everyday life. He broke away from the glamorous and artificial portrayals of mainstream cinema, focusing instead on character-driven storytelling and delving into the intricacies of human relationships. This shift in narrative approach, characterized by its attention to detail and nuanced portrayal of characters, became a hallmark of the Indian New Wave movement. Filmmakers sought to depict the complexities of Indian society, addressing social and political issues while remaining rooted in the realities of everyday life.
  
  Ray's ability to convey deep emotions through subtlety also had a profound impact on Indian New Wave Cinema. He proved that cinema could be a powerful medium for exploring the human condition, and that often, the most profound emotions lie in the smallest of gestures and the quietest of moments. This approach influenced subsequent filmmakers, who sought to capture the nuances of human behavior and emotion in their own works.
  
  _Pather Panchali_'s influence on Indian New Wave Cinema was not limited to its narrative and thematic elements. The film's technical achievements, such as the use of natural lighting, on-location shooting, and long takes, inspired filmmakers to experiment with visual storytelling techniques and explore new possibilities in cinematography. Ray's dedication to authenticity and realism in every aspect of filmmaking set a precedent for Indian New Wave filmmakers, urging them to challenge conventions and push the boundaries of cinematic storytelling.
  
  ## **Cultural Significance and International Recognition**
  
  _Pather Panchali_'s impact extends beyond the realm of Indian cinema. The film garnered international acclaim, winning the Best Human Document award at the 1956 Cannes Film Festival. This recognition brought global attention to Indian cinema, shattering the stereotype of Indian films being limited to Bollywood musicals. _Pather Panchali_'s success paved the way for other Indian films to be recognized on the international stage and opened doors for greater diversity and representation in world cinema.
  
  The film's international recognition not only elevated the status of Indian cinema but also highlighted the
  
  `;
  // convert the entire  thing to one string
  const blogs = [
    {
      slug: 'service-animal',
      source: service,
    },
    {
      slug: 'pather-panchali-the-enduring-impact-on-modern-indian-cinema',
      source: pather,
    },
  ];

  return blogs;
}
