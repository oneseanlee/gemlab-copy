import { Helmet } from 'react-helmet-async';

const DEFAULT_OG_IMAGE = 'https://storage.googleapis.com/gpt-engineer-file-uploads/EEN0In3gFiOQNZpmGJanoRwBGRC2/social-images/social-1771030109492-3.webp';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noindex?: boolean;
}

export default function SEO({ title, description, path, ogImage, noindex = false }: SEOProps) {
  const url = `https://cell365power.com${path}`;
  const image = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="Best 365 Labs" />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@Best365Labs" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}