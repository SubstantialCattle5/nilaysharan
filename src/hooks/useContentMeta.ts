import axios from 'axios';

import { SingleContentMeta } from '@/types/meta';

export async function incrementViews(slug: string) {
  const res = await axios.post<SingleContentMeta>('/api/content/' + slug);

  return res.data;
}

export async function incrementLikes(slug: string) {
  const res = await axios.post<SingleContentMeta>('/api/like/' + slug);

  return res.data;
}
