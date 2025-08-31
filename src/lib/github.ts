import { WriteupFrontmatter } from '@/types/frontmatters';
import readingTime from 'reading-time';
import { githubToken } from '@/constant/env';

const GITHUB_API_URL = 'https://api.github.com';
const REPO_OWNER = 'SubstantialCattle5';
const REPO_NAME = '0xFlagged';

interface GitHubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
}

interface GitHubContent {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  content: string;
  encoding: string;
}

// Cache for GitHub API responses to avoid rate limiting
const cache = new Map<string, any>();
const CACHE_DURATION = 1000 * 60 * 10; // 10 minutes

async function fetchFromGitHub(url: string): Promise<any> {
  const cacheKey = url;
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'nilaysharan-website'
    };

    // Add authentication if token is available
    if (githubToken) {
      headers['Authorization'] = `Bearer ${githubToken}`;
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`GitHub API error ${response.status}:`, errorText);
      console.log('Using authentication:', !!githubToken);
      
      if (response.status === 403) {
        const rateLimitMessage = githubToken 
          ? 'GitHub API rate limit exceeded. The authenticated rate limit is 5,000 requests/hour.'
          : 'GitHub API rate limit exceeded. Consider adding a GitHub token for higher limits (5,000 vs 60 requests/hour).';
        throw new Error(rateLimitMessage);
      } else if (response.status === 404) {
        throw new Error('Repository not found or not accessible.');
      } else if (response.status === 401) {
        throw new Error('GitHub authentication failed. Please check your GitHub token.');
      } else {
        throw new Error(`GitHub API error: ${response.status} - ${errorText}`);
      }
    }

    const data = await response.json();
    cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    console.error('Error fetching from GitHub:', error);
    throw error;
  }
}

export async function getRepositoryContents(path: string = ''): Promise<GitHubFile[]> {
  const url = `${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`;
  return fetchFromGitHub(url);
}

export async function getFileContent(path: string): Promise<{content: string, lastModified?: string}> {
  const url = `${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`;
  const content: GitHubContent = await fetchFromGitHub(url);
  
  let fileContent = '';
  if (content.encoding === 'base64') {
    fileContent = Buffer.from(content.content, 'base64').toString('utf-8');
  } else {
    fileContent = content.content;
  }

  // Get commit information for the file to get last modified date
  let lastModified: string | undefined;
  try {
    const commitsUrl = `${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/commits?path=${encodeURIComponent(path)}&per_page=1`;
    const commits = await fetchFromGitHub(commitsUrl);
    if (commits.length > 0 && commits[0].commit && commits[0].commit.committer) {
      lastModified = commits[0].commit.committer.date;
    }
  } catch (error) {
    // Silently handle error - commit date is not critical
    console.debug('Could not fetch commit date for', path);
  }
  
  return { content: fileContent, lastModified };
}

// Parse directory structure to extract writeup metadata
function parseWriteupPath(path: string): {
  platform: string;
  category: string;
  difficulty?: string;
  filename: string;
} {
  const parts = path.split('/');
  
  // Expected structure: Platform/Category/Difficulty/filename or Platform/Category/filename
  if (parts.length >= 3) {
    const platform = parts[0];
    const category = parts[1];
    
    if (parts.length === 4) {
      // Has difficulty level
      const difficulty = parts[2];
      const filename = parts[3];
      return { platform, category, difficulty, filename };
    } else {
      // No difficulty level
      const filename = parts[2];
      return { platform, category, filename };
    }
  }
  
  return {
    platform: 'Unknown',
    category: 'General',
    filename: parts[parts.length - 1]
  };
}

// Convert GitHub markdown to writeup frontmatter
function createWriteupFrontmatter(
  content: string,
  path: string,
  file: GitHubFile,
  lastModified?: string
): WriteupFrontmatter {
  const pathInfo = parseWriteupPath(path);
  const slug = path.replace(/\.(md|txt)$/, '').replace(/[\/\\]/g, '-').toLowerCase();
  
  // Extract title from content (first line or filename)
  const lines = content.split('\n');
  let title = pathInfo.filename.replace(/\.(md|txt)$/, '');
  
  // Look for title in first few lines
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const line = lines[i].trim();
    if (line.startsWith('# ')) {
      title = line.substring(2).trim();
      break;
    }
  }
  
  // Generate description from first paragraph
  let description = `${pathInfo.platform} ${pathInfo.category} writeup`;
  const firstParagraph = content
    .split('\n\n')[0]
    .replace(/^#+\s.*$/gm, '') // Remove headers
    .replace(/\*\*/g, '') // Remove bold
    .replace(/\*/g, '') // Remove italic
    .trim();
    
  if (firstParagraph && firstParagraph.length > 10) {
    description = firstParagraph.substring(0, 150).trim();
    if (description.length === 150) {
      description += '...';
    }
  }

  // Map directory names to difficulty
  const difficultyMap: Record<string, 'Easy' | 'Medium' | 'Hard'> = {
    'easy': 'Easy',
    'medium': 'Medium',
    'hard': 'Hard',
    'beginner': 'Easy',
    'intermediate': 'Medium',
    'advanced': 'Hard'
  };

  const difficulty = pathInfo.difficulty 
    ? difficultyMap[pathInfo.difficulty.toLowerCase()] 
    : undefined;

  // Generate tags
  const tags = [
    'ctf',
    pathInfo.platform.toLowerCase(),
    pathInfo.category.toLowerCase().replace(/\s+/g, '-'),
    ...(difficulty ? [difficulty.toLowerCase()] : [])
  ].join(',');

  const readingTimeResult = readingTime(content);

  // Try to extract date from content frontmatter or use lastModified or a reasonable fallback
  let publishedAt = '2024-01-01'; // Default fallback date
  
  // Check if content has frontmatter with date
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (frontmatterMatch) {
    const frontmatterText = frontmatterMatch[1];
    const dateMatch = frontmatterText.match(/(?:date|published|created):\s*['"]?([^'"]+)['"]?/i);
    if (dateMatch) {
      const parsedDate = new Date(dateMatch[1]);
      if (!isNaN(parsedDate.getTime())) {
        publishedAt = parsedDate.toISOString().split('T')[0];
      }
    }
  }
  
  // If no date in frontmatter, use lastModified if available
  if (publishedAt === '2024-01-01' && lastModified) {
    const parsedDate = new Date(lastModified);
    if (!isNaN(parsedDate.getTime())) {
      publishedAt = parsedDate.toISOString().split('T')[0];
    }
  }

  return {
    wordCount: content.split(/\s+/g).length,
    readingTime: readingTimeResult,
    slug,
    title,
    description,
    publishedAt,
    tags,
    difficulty,
    platform: pathInfo.platform,
    category: pathInfo.category
  };
}

export async function getAllWriteups(): Promise<Array<{ 
  frontmatter: WriteupFrontmatter; 
  content: string; 
  path: string; 
}>> {
  try {
    
    const writeups: Array<{ frontmatter: WriteupFrontmatter; content: string; path: string; }> = [];
    
    // Get root contents
    const rootContents = await getRepositoryContents('');
    
    // Process each platform directory
    for (const item of rootContents) {
      if (item.type === 'dir' && item.name !== '.git' && !item.name.startsWith('.')) {
        await processDirectory(item.path, writeups);
      }
    }
    
    return writeups;
  } catch (error) {
    console.error('Error fetching writeups from GitHub:', error);
    
    // Return sample data when GitHub API is not available
    if (error instanceof Error && error.message.includes('rate limit')) {
      console.log('GitHub API rate limited, returning sample data');
      return getSampleWriteups();
    }
    
    return [];
  }
}

// Sample writeups for when GitHub API is not available
function getSampleWriteups(): Array<{ 
  frontmatter: WriteupFrontmatter; 
  content: string; 
  path: string; 
}> {
  const sampleContent = `# Sample CTF Writeup

This is a sample writeup that shows when the GitHub API is temporarily unavailable.

## Challenge Description

Sample challenge description goes here.

## Solution

Sample solution steps would be documented here.

## Flag

\`flag{sample_flag_placeholder}\`
`;

  return [
    {
      frontmatter: {
        wordCount: 50,
        readingTime: { text: '1 min read', minutes: 1, words: 50, time: 60000 },
        slug: 'picoctf-sample-challenge',
        title: 'PicoCTF - Sample Challenge',
        description: 'This is a sample writeup shown when GitHub API is unavailable.',
        publishedAt: '2024-01-01',
        tags: 'ctf,picoctf,sample',
        difficulty: 'Easy' as const,
        platform: 'PicoCTF',
        category: 'General Skills'
      },
      content: sampleContent,
      path: 'PicoCTF/General-Skills/sample-challenge.md'
    },
    {
      frontmatter: {
        wordCount: 50,
        readingTime: { text: '1 min read', minutes: 1, words: 50, time: 60000 },
        slug: 'overthewire-sample-bandit',
        title: 'OverTheWire - Sample Bandit Level',
        description: 'This is a sample OverTheWire writeup shown when GitHub API is unavailable.',
        publishedAt: '2024-01-02',
        tags: 'ctf,overthewire,bandit,sample',
        difficulty: 'Easy' as const,
        platform: 'OverTheWire',
        category: 'Bandit'
      },
      content: sampleContent.replace('PicoCTF', 'OverTheWire'),
      path: 'OverTheWire/Bandit/sample-level.md'
    }
  ];
}

async function processDirectory(
  dirPath: string, 
  writeups: Array<{ frontmatter: WriteupFrontmatter; content: string; path: string; }>
): Promise<void> {
  try {
    const contents = await getRepositoryContents(dirPath);
    
    for (const item of contents) {
      if (item.type === 'dir') {
        // Recursively process subdirectories
        await processDirectory(item.path, writeups);
      } else if (item.type === 'file' && (item.name.endsWith('.md') || item.name.endsWith('.txt'))) {
        // Skip README files
        if (item.name.toLowerCase().includes('readme')) {
          continue;
        }
        
        try {
          const { content, lastModified } = await getFileContent(item.path);
          const frontmatter = createWriteupFrontmatter(content, item.path, item, lastModified);
          
          writeups.push({
            frontmatter,
            content,
            path: item.path
          });
        } catch (error) {
          console.error(`Error processing file ${item.path}:`, error);
          // Continue processing other files
        }
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error);
  }
}

export async function getWriteupBySlug(slug: string): Promise<{
  frontmatter: WriteupFrontmatter;
  content: string;
  path: string;
} | null> {
  try {
    const allWriteups = await getAllWriteups();
    return allWriteups.find(writeup => writeup.frontmatter.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching writeup by slug:', error);
    
    // Fallback to sample data if available
    if (error instanceof Error && error.message.includes('rate limit')) {
      const sampleWriteups = getSampleWriteups();
      return sampleWriteups.find(writeup => writeup.frontmatter.slug === slug) || null;
    }
    
    return null;
  }
}
