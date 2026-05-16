import type { Metadata, Viewport } from 'next'
import '../css/variables.css'
import '../css/reset.css'
import '../css/typography.css'
import '../css/layout.css'
import '../css/components.css'
import '../css/utilities.css'

export const metadata: Metadata = {
  title: 'Alex Chen | Frontend Developer',
  description: 'Frontend Developer specializing in accessible, pixel-perfect digital experiences. Building thoughtful user interfaces with modern web technologies.',
  keywords: ['Frontend Developer', 'Web Developer', 'Accessibility', 'React', 'JavaScript', 'CSS'],
  authors: [{ name: 'Alex Chen' }],
  openGraph: {
    title: 'Alex Chen | Frontend Developer',
    description: 'Frontend Developer specializing in accessible, pixel-perfect digital experiences.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alex Chen | Frontend Developer',
    description: 'Frontend Developer specializing in accessible, pixel-perfect digital experiences.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        {/* Inline script to prevent theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('portfolio-theme') || 
                  (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
      </head>
      <body>
        {children}
        <script src="/js/theme.js" defer></script>
        <script src="/js/navigation.js" defer></script>
        <script src="/js/main.js" defer></script>
      </body>
    </html>
  )
}
