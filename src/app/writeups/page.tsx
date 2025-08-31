"use client";
import clsx from "clsx";
import React from "react";

import { getTags, sortByDate, sortDateFn } from "@/lib/mdx.client";
import useLoaded from "@/hooks/useLoaded";

import Accent from "@/components/Accent";
import WriteupCard from "@/components/content/writeups/WriteupCard";
import ContentPlaceholder from "@/components/content/ContenPlaceholder";
import StyledInput from "@/components/content/form/StyledInput";
import Tag, { SkipNavTag } from "@/components/content/Tag";

import { WriteupFrontmatter } from "@/types/frontmatters";

const Page = () => {
  const isLoaded = useLoaded();
  const [populatedPosts, setPopulatedPosts] = React.useState<WriteupFrontmatter[]>([]);
  const [loading, setLoading] = React.useState(true);

  const [isShowingSampleData, setIsShowingSampleData] = React.useState(false);

  // Fetch writeups from GitHub via API
  React.useEffect(() => {
    const fetchWriteups = async () => {
      try {
        const response = await fetch('/api/writeups');
        const writeups = await response.json();
        
        // Check if we're showing sample data
        if (writeups.length > 0 && writeups[0].slug?.includes('sample')) {
          setIsShowingSampleData(true);
        }
        
        setPopulatedPosts(writeups);
      } catch (error) {
        console.error('Error fetching writeups:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWriteups();
  }, []);

  //#region //* Search
  const posts = sortByDate(populatedPosts as WriteupFrontmatter[]);
  const [search, setSearch] = React.useState<string>("");
  const [filteredPosts, setFilteredPosts] = React.useState<
    Array<WriteupFrontmatter>
  >(() => [...posts]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  React.useEffect(() => {
    const jugglePosts = populatedPosts as WriteupFrontmatter[];
    const results = jugglePosts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase()) ||
        post.platform?.toLowerCase().includes(search.toLowerCase()) ||
        post.difficulty?.toLowerCase().includes(search.toLowerCase()) ||
        // Check if splitted search contained in tag
        search
          .toLowerCase()
          .split(" ")
          .every((tag) => post.tags.includes(tag))
    );
    results.sort(sortDateFn);
    setFilteredPosts(results);
  }, [search, populatedPosts]);

  //#region //* end Search
  const currentPosts = filteredPosts;

  //#region //* Tag
  const tags = getTags(populatedPosts as WriteupFrontmatter[]);
  const toggleTag = (tag: string) => {
    if (search.includes(tag)) {
      setSearch((s) =>
        s
          .split(" ")
          .filter((t) => t !== tag)
          ?.join(" ")
      );
    } else {
      // append tag
      setSearch((s) => (s !== "" ? `${s.trim()} ${tag}` : tag));
    }
  };
  /** Currently available tags based on filtered posts */
  const filteredTags = getTags(currentPosts);

  /** Show accent if not disabled and selected  */
  const checkTagged = (tag: string) => {
    return (
      filteredTags.includes(tag) &&
      search.toLowerCase().split(" ").includes(tag)
    );
  };
  //#region //* end Tag

  // Group posts by platform (website)
  const groupedByPlatform = React.useMemo(() => {
    const grouped = currentPosts.reduce((acc, post) => {
      const platform = post.platform || 'Other';
      if (!acc[platform]) {
        acc[platform] = [];
      }
      acc[platform].push(post);
      return acc;
    }, {} as Record<string, WriteupFrontmatter[]>);
    
    // Sort platforms alphabetically, but keep 'Other' at the end
    const sortedPlatforms = Object.keys(grouped).sort((a, b) => {
      if (a === 'Other') return 1;
      if (b === 'Other') return -1;
      return a.localeCompare(b);
    });
    
    const orderedGrouped: Record<string, WriteupFrontmatter[]> = {};
    sortedPlatforms.forEach(platform => {
      // Sort writeups within each platform by difficulty and then by title
      const sortedWriteups = grouped[platform].sort((a, b) => {
        const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
        const aDiff = difficultyOrder[a.difficulty as keyof typeof difficultyOrder] || 4;
        const bDiff = difficultyOrder[b.difficulty as keyof typeof difficultyOrder] || 4;
        
        if (aDiff !== bDiff) {
          return aDiff - bDiff;
        }
        
        return a.title.localeCompare(b.title);
      });
      
      orderedGrouped[platform] = sortedWriteups;
    });
    
    return orderedGrouped;
  }, [currentPosts]);

  return (
    <>
      <main>
        <section className={clsx(isLoaded && "fade-in-start")}>
          <div className="layout py-12">
            <h1 className="text-3xl md:text-5xl" data-fade="0">
              <Accent>CTF Writeups</Accent>
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300" data-fade="1">
              Detailed writeups for Capture The Flag challenges and cybersecurity competitions.
            </p>
            
            {isShowingSampleData && (
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg" data-fade="1.5">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-600 dark:text-yellow-400 text-lg">⚠️</span>
                  <div>
                    <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-2">
                      <strong>GitHub API Rate Limited:</strong> Showing sample writeups for demo purposes.
                    </p>
                    <details className="text-xs text-yellow-700 dark:text-yellow-300">
                      <summary className="cursor-pointer hover:underline">How to fix this permanently</summary>
                      <div className="mt-2 space-y-1">
                        <p>1. Generate a GitHub token at: <a href="https://github.com/settings/tokens" target="_blank" rel="noopener" className="underline">github.com/settings/tokens</a></p>
                        <p>2. Add <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">GITHUB_TOKEN=your_token</code> to your .env.local file</p>
                        <p>3. Restart the development server</p>
                        <p className="text-xs opacity-75">This increases the rate limit from 60 to 5,000 requests/hour</p>
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            )}
            <StyledInput
              data-fade="2"
              className="mt-4"
              placeholder="Search writeups..."
              onChange={handleSearch}
              value={search}
              type="text"
            />
            <div
              className="mt-2 flex flex-wrap items-baseline justify-start gap-2 text-sm text-gray-600 dark:text-gray-300"
              data-fade="3"
            >
              <span className="font-medium">Filter by topic:</span>
              <SkipNavTag>
                {tags.map((tag) => (
                  <Tag
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    disabled={!filteredTags.includes(tag)}
                  >
                    {checkTagged(tag) ? <Accent>{tag}</Accent> : tag}
                  </Tag>
                ))}
              </SkipNavTag>
            </div>

            {/* Loading state */}
            {loading ? (
              <div className="mt-8 text-center" data-fade="5">
                <div className="animate-pulse">
                  <div className="text-gray-600 dark:text-gray-300">
                    Loading writeups from GitHub...
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Show all posts in a single grid if only one platform */}
                {Object.keys(groupedByPlatform).length <= 1 ? (
                  <ul
                    className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
                    data-fade="5"
                  >
                    {currentPosts.length > 0 ? (
                      currentPosts.map((post, index) => (
                        <WriteupCard key={post.slug || index} post={post} />
                      ))
                    ) : (
                      <ContentPlaceholder />
                    )}
                  </ul>
                ) : (
                  /* Group by platform */
                  <div className="mt-8 space-y-12" data-fade="5">
                    {Object.entries(groupedByPlatform).map(([platform, posts]) => (
                      <div key={platform}>
                        <div className="flex items-center gap-4 mb-6">
                          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                            {platform}
                          </h2>
                          <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-600"></div>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                            {posts.length} writeup{posts.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        
                        {/* Group posts within platform by difficulty for better organization */}
                        {(() => {
                          const difficultyGroups = posts.reduce((acc, post) => {
                            const difficulty = post.difficulty || 'Other';
                            if (!acc[difficulty]) {
                              acc[difficulty] = [];
                            }
                            acc[difficulty].push(post);
                            return acc;
                          }, {} as Record<string, WriteupFrontmatter[]>);
                          
                          const difficulties = ['Easy', 'Medium', 'Hard', 'Other'];
                          
                          return difficulties
                            .filter(diff => difficultyGroups[diff]?.length > 0)
                            .map(difficulty => (
                              <div key={`${platform}-${difficulty}`} className="mb-8">
                                {Object.keys(difficultyGroups).length > 1 && (
                                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                                    {difficulty === 'Other' ? 'Other Challenges' : `${difficulty} Challenges`}
                                  </h3>
                                )}
                                <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                  {difficultyGroups[difficulty].map((post, index) => (
                                    <WriteupCard key={post.slug || index} post={post} />
                                  ))}
                                </ul>
                              </div>
                            ));
                        })()}
                      </div>
                    ))}
                    {currentPosts.length === 0 && <ContentPlaceholder />}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
