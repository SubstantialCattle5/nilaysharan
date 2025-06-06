import { promises, readFileSync } from "fs";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import { join } from "path";
import readingTime from "reading-time";

import {
  ContentType,
  Frontmatter,
  PickFrontmatter,
} from "@/types/frontmatters";

/**
 * This function returns an array of file slugs.
 * @param {ContentType} type - The content type.
 * @returns {Promise<Array<string>>} - A promise that resolves to an array of file slugs.
 */
export async function getFileSlugArray(type: ContentType) {
  return getFileList(join(process.cwd(), "src", "contents", type)).then(
    (paths) =>
      paths.map((path) =>
        path
          .replace(join(process.cwd(), "src", "contents", type) + "/", "")
          .replace(".mdx", "")
          .split("/")
      )
  );
}

/**
 * This function returns the content of a file by its slug.
 * @param {string} slug - The slug of the file.
 * @returns {Promise<{code: string;frontmatter: Frontmatter;}>} - A promise that resolves to an object containing the code and frontmatter of the file.
 */
export async function getFileBySlug(
  source: string,
  slug: string
): Promise<{ code: string; frontmatter: Frontmatter }> {
  const { code, frontmatter } = await bundleMDX({
    source,
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
  const files = await getFileList(join(process.cwd(), "src", "contents", type));

  return files.reduce((allPosts: Array<PickFrontmatter<T>>, absolutePath) => {
    const source = readFileSync(absolutePath, "utf8");
    const { data } = matter(source);

    const res = [
      {
        ...(data as PickFrontmatter<T>),
        slug: absolutePath
          .replace(join(process.cwd(), "src", "contents", type) + "/", "")
          .replace(".mdx", ""),
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
  const frontmatters = await getAllFilesFrontmatter("blog");

  // Get current frontmatter
  const currentFm = frontmatters.find((fm) => fm.slug === currSlug);

  // Remove currentFm and Bahasa Posts, then randomize order
  const otherFms = frontmatters
    .filter((fm) => !fm.slug.startsWith("id-") && fm.slug !== currSlug)
    .sort(() => Math.random() - 0.5);

  // Find with similar tags
  const recommendations = otherFms.filter((op) =>
    op.tags.split(",").some((p) => currentFm?.tags.split(",").includes(p))
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

function readMDXFile(fileName: string, type: string) {
  return readFileSync(
    join(process.cwd(), "public", "contents", type, fileName),
    "utf8"
  );
}

export function preFetch({ type }: { type: ContentType }) {
  if (type === "blog") {
    const blogFiles = [
      "service-animal.mdx",
      "netmasking-and-how-we-keep-shifting-problems-to-the-future.mdx",
      "pather-panchali-the-enduring-impact-on-modern-indian-cinema.mdx",
      "routing-protocol-the-invisible-force-that-powers-the-internet.mdx",
      "deep-dive-on-the-madcap-laughs-by-syd-barrett.mdx",
    ];

    const blogs = blogFiles.map((file) => ({
      slug: file.split(".mdx")[0], // Extract slug from filename
      source: readMDXFile(file, type),
    }));

    return blogs;
  } else if (type === "projects") {
    const projectFiles = [
      "humantd.mdx",
      "medbud.mdx",
      "echoes.mdx",
      "social-media-backend.mdx",
      "sietch.mdx"
    ];

    const projects = projectFiles.map((file) => ({
      slug: file.split(".mdx")[0], // Extract slug from filename
      source: readMDXFile(file, type),
    }));

    return projects;
  }

  return [];
}
