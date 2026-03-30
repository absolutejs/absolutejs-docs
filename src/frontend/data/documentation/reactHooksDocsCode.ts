export const hooksBasicUsage = `\
import { useMediaQuery } from '@absolutejs/absolute/react/hooks';

export const ResponsiveLayout = () => {
  const { breakpoint, isSizeOrGreater, isSizeOrLess } = useMediaQuery();

  return (
    <div>
      <p>Current breakpoint: {breakpoint}</p>

      {isSizeOrGreater('lg') && (
        <aside>Desktop sidebar — only visible on lg and above</aside>
      )}

      {isSizeOrLess('sm') && (
        <nav>Mobile bottom nav — only visible on sm and below</nav>
      )}
    </div>
  );
};`;

export const hooksProvider = `\
// In your page component or layout
import { UserAgentProvider } from '@absolutejs/absolute/react/hooks';

export const App = ({ userAgent, children }: {
  userAgent: string;
  children: React.ReactNode;
}) => (
  <UserAgentProvider userAgent={userAgent}>
    {children}
  </UserAgentProvider>
);

// AbsoluteJS page handlers pass the user-agent automatically:
import { reactHandler } from '@absolutejs/absolute';

app.get('/', reactHandler({
  component: 'HomePage',
  head: { title: 'Home' },
  props: async ({ request }) => {
    return { userAgent: request.headers.get('user-agent') ?? '' };
  }
}));`;

export const hooksBreakpoints = `\
// Default breakpoints (matches Tailwind CSS)
// xs:   0px
// sm:   640px
// md:   768px
// lg:   1024px
// xl:   1280px
// 2xl:  1536px

// The hook returns the current breakpoint name based on
// viewport width. On the server, it infers a reasonable
// default from the user-agent string (mobile vs desktop).

import { useMediaQuery } from '@absolutejs/absolute/react/hooks';

export const AdaptiveGrid = () => {
  const { breakpoint, isSizeOrGreater } = useMediaQuery();

  const columns = isSizeOrGreater('xl') ? 4
    : isSizeOrGreater('lg') ? 3
    : isSizeOrGreater('md') ? 2
    : 1;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: \`repeat(\${columns}, 1fr)\`,
      gap: '1rem'
    }}>
      {/* grid items */}
    </div>
  );
};`;

export const hooksSsrUsage = `\
// SSR-aware responsive rendering
// On the server, useMediaQuery reads the user-agent to detect
// mobile vs desktop and returns a sensible default breakpoint.
// On the client, it switches to real viewport measurement.

import { useMediaQuery } from '@absolutejs/absolute/react/hooks';
import { UserAgentProvider } from '@absolutejs/absolute/react/hooks';

export const Page = ({ userAgent }: { userAgent: string }) => (
  <UserAgentProvider userAgent={userAgent}>
    <Layout />
  </UserAgentProvider>
);

const Layout = () => {
  const { isSizeOrGreater, isSizeOrLess } = useMediaQuery();

  return (
    <div>
      {/* Server renders the correct variant — no layout shift */}
      {isSizeOrGreater('md') ? (
        <DesktopNav />
      ) : (
        <MobileNav />
      )}

      <main>
        {isSizeOrLess('sm') && <MobileBanner />}
        <Content />
      </main>
    </div>
  );
};`;

export const hooksApiReference = `\
// useMediaQuery return type
type UseMediaQueryResult = {
  // Current breakpoint name: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  breakpoint: string;

  // Returns true if the viewport is at or above the given breakpoint
  isSizeOrGreater: (size: Breakpoint) => boolean;

  // Returns true if the viewport is at or below the given breakpoint
  isSizeOrLess: (size: Breakpoint) => boolean;
};

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Default breakpoint values
const defaultBreakpoints: Record<Breakpoint, number> = {
  'xs': 0,
  'sm': 640,
  'md': 768,
  'lg': 1024,
  'xl': 1280,
  '2xl': 1536
};`;
