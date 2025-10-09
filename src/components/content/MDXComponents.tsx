import Image from 'next/image';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

import GithubCard from '@/components/content/card/GithubCard';
import { Pre } from '@/components/content/Pre';
import SplitImage, { Split } from '@/components/content/SplitImage';
import CloudinaryImg from '@/components/images/CloudinaryImg';
import CustomLink from '@/components/links/CustomLink';
import TechIcons from '@/components/TechIcons';
import WebsiteCard from '@/components/content/card/WebsiteCard';
const MDXComponents = {
  a: CustomLink,
  Image,
  pre: Pre,
  CloudinaryImg,
  LiteYouTubeEmbed,
  SplitImage,
  Split,
  TechIcons,
  GithubCard,
  WebsiteCard,
};

export default MDXComponents;
