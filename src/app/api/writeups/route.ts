import { NextResponse } from 'next/server';
import { getAllWriteups } from '@/lib/github';

export async function GET() {
  try {
    console.log('Fetching all writeups from GitHub...');
    const writeups = await getAllWriteups();
    
    console.log(`Found ${writeups.length} writeups`);
    writeups.forEach(writeup => {
      console.log(`- ${writeup.frontmatter.slug}: ${writeup.frontmatter.title}`);
    });
    
    // Return only frontmatter for the listing page
    const writeupsList = writeups.map(writeup => writeup.frontmatter);
    
    return NextResponse.json(writeupsList);
  } catch (error) {
    console.error('Error fetching writeups:', error);
    return NextResponse.json(
      { error: `Failed to fetch writeups: ${error instanceof Error ? error.message : 'Unknown error'}` }, 
      { status: 500 }
    );
  }
}
