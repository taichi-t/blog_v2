import * as React from 'react';
import Head from 'next/head';
import { WEBSITE } from '@/constants/website';

type Props = {
  pageUrl: string;
  pageType: 'website' | 'blog' | 'article';
  title: string;
  description: string;
  imageUrl?: string;
  locale: string;
};

const SEO: React.VFC<Props> = ({
  pageUrl,
  pageType,
  title,
  description,
  imageUrl,
  locale, //use _ insted of -
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content={pageType} />
      <meta property="og:description" content={description} />
      <meta name="description" content={description} />
      <meta property="og:image" content={imageUrl ?? '/images/logo.png'} />
      {/* 144px x 144px,4096 x 4096px, up to2MB */}
      {/* TODO: default image */}
      <meta name="twitter:card" content={WEBSITE.TWITTER.CARDTYPE} />
      <meta name="twitter:site" content={WEBSITE.TWITTER.USERNAME} />
      <meta property="og:site_name" content={WEBSITE.NAME} />
      <meta property="og:locale" content={locale} />
    </Head>
  );
};

export default SEO;
