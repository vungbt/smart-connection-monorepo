import type { Metadata } from 'next';
import { ReactNode } from 'react';

type Props = {
  params?: Promise<{ title?: string; prefix?: string }>;
  children: ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await params;
  const title = data?.title || 'Home';
  const prefix = data?.prefix || 'Stay Easy';
  return {
    title: `${prefix} | ${title}`,
    description: `Read about ${title} here.`,
  };
}

export function MetadataWrapper({ children }: Props) {
  return (
    <>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      {children}
    </>
  );
}
