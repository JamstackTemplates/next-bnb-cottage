import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@fontsource/im-fell-english/400.css';
import '@fontsource/im-fell-english/400-italic.css';
import '@fontsource/im-fell-english-sc/400.css';
import '@fontsource-variable/rosario';
import '@fontsource/cedarville-cursive/400.css';
import { ThemeProvider } from 'jamstacks';
import { ThemeScript } from 'jamstacks/server';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { business } from '../content/business';
import { site } from '../lib/site';
import './tailwind.input.css';

const metaDescription = site.description || business.introduction;
const ogImage = site.url ? `${site.url}/og.png` : undefined;

export const metadata: Metadata = {
  title: { default: business.name, template: `%s — ${business.name}` },
  description: metaDescription,
  ...(site.url ? { metadataBase: new URL(`${site.url}/`) } : {}),
  openGraph: {
    type: 'website',
    siteName: business.name,
    title: business.name,
    description: metaDescription,
    ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: 'Honeysuckle Cottage B&B in Bibury, Cotswolds' }] } : {}),
  },
  twitter: {
    card: 'summary_large_image',
    title: business.name,
    description: metaDescription,
    ...(ogImage ? { images: [ogImage] } : {}),
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <ThemeProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
