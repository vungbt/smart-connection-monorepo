import { Metadata } from 'next';

export const ROUTES = {
  HOME: '/',
  ROOMS: '/rooms',
  ROOMS_SLUG: '/rooms/:slug',
  ROOMS_ADD: '/rooms/add',
  SERVICES: '/services',
  SERVICES_SLUG: '/services/:slug',
  SERVICES_ADD: '/services/add',
  CONFIGS: '/services',
  CONFIGS_SLUG: '/services/:slug',
  CONFIGS_ADD: '/services/add',
  USERS: '/users',
  USERS_SLUG: '/users/:slug',
  USERS_ADD: '/users/add',
  BILLS: '/bills',
  BILLS_SLUG: '/bills/:slug',
  BILLS_ADD: '/bills/add',
};

export const PageName = 'Stay Easy';
export const generateMetadata = ({ page = 'Home' }: { page?: string }): Metadata => {
  return {
    title: `${PageName} | ${page}`,
    description:
      'Stay Easy helps you find and book comfortable stays effortlessly. Simple, fast, and stress-free travel planning.',
    keywords: ['Stay Easy', 'hotel booking', 'travel', 'stays', 'accommodation'],
    openGraph: {
      title: 'Stay Easy – Book Your Perfect Stay',
      description:
        'Discover and book comfortable stays with Stay Easy. A simple way to plan your trips and holidays stress-free.',
      url: 'https://stayeasy.com', // replace with your real domain
      siteName: 'Stay Easy',
      images: [
        {
          url: 'https://stayeasy.com/og-image.png', // replace with your OG image
          width: 1200,
          height: 630,
          alt: 'Stay Easy – Your Travel Companion',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Stay Easy – Book Your Perfect Stay',
      description:
        'Discover and book comfortable stays with Stay Easy. A simple way to plan your trips and holidays stress-free.',
      images: ['https://stayeasy.com/og-image.png'], // same OG image or custom
      creator: '@stayeasy', // optional, replace with your Twitter handle
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/apple-icon.png',
    },
  };
};
