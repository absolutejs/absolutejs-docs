export const fontsBuildOutput = `\
build/assets/fonts/
  fonts.bbeb0eba.css
  poppins-latin-400-normal.3dc5d0c5.woff2
  poppins-latin-700-normal.197a3cbd.woff2
  brand-sans-400-normal.8909904a.woff2
  brand-sans-700-normal.6f56409f.woff2`;
export const fontsConfig = `\
// absolute.config.ts
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  reactDirectory: 'src/frontend/react',
  fonts: {
    families: [
      { family: 'Poppins', weights: [400, 700] },
      { family: 'Inter', weights: '100..900', styles: ['normal', 'italic'] },
      {
        family: 'Brand Sans',
        src: [
          { path: 'src/fonts/BrandSans-Regular.woff2', weight: 400 },
          { path: 'src/fonts/BrandSans-Bold.woff2', weight: 700 }
        ]
      }
    ]
  }
});`;
export const fontsCssUsage = `\
body {
  font-family: var(--font-poppins);
}

.price {
  font-family: var(--font-brand-sans);
  font-weight: 700;
}`;
export const fontsFallbackFace = `\
@font-face {
  font-family: 'Poppins Fallback';
  src: local('Arial'), local('ArialMT');
  size-adjust: 114.11%;
  ascent-override: 92.02%;
  descent-override: 30.67%;
  line-gap-override: 8.76%;
}`;
export const fontsGeneratedVariables = `\
:root {
  --font-poppins: 'Poppins', 'Poppins Fallback', sans-serif;
  --font-brand-sans: 'Brand Sans', 'Brand Sans Fallback', sans-serif;
}

.font-poppins {
  font-family: var(--font-poppins);
}

.font-brand-sans {
  font-family: var(--font-brand-sans);
}`;
export const fontsHeadTags = `\
<link rel="preload" href="/assets/fonts/poppins-latin-400-normal.3dc5d0c5.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/brand-sans-400-normal.8909904a.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/fonts/fonts.bbeb0eba.css" data-absolute-fonts>`;
export const fontsPreloadOptions = `\
fonts: {
  families: [
    // Preload the bold face instead of the first weight
    { family: 'Poppins', weights: [400, 700], preload: [{ weight: 700 }] },
    // Preload nothing for a family used below the fold
    { family: 'Lora', weights: [400], preload: false }
  ]
}`;
export const fontsReactPage = `\
// src/frontend/react/pages/Home.tsx
import type { FontAssets } from '@absolutejs/absolute';
import { Head } from '@absolutejs/absolute/react/components';

type HomeProps = {
  cssPath: string;
  fonts: FontAssets;
};

export const Home = ({ cssPath, fonts }: HomeProps) => (
  <html>
    <Head cssPath={cssPath} fonts={fonts} title="Home" />
    <body className="font-poppins">
      <h1>Home</h1>
    </body>
  </html>
);`;
export const fontsReactRoute = `\
// src/backend/server.ts
import { asset, fontAssets, prepare } from '@absolutejs/absolute';
import { handleReactPageRequest } from '@absolutejs/absolute/react';

const { absolutejs, manifest } = await prepare();

// ...
.get('/', () =>
  handleReactPageRequest({
    Page: Home,
    index: asset(manifest, 'HomeIndex'),
    props: {
      cssPath: asset(manifest, 'HomeCSS'),
      fonts: fontAssets(manifest)
    }
  })
)`;
export const fontsVueRoute = `\
import {
  asset,
  fontAssets,
  generateHeadElement
} from '@absolutejs/absolute';
import { handleVuePageRequest } from '@absolutejs/absolute/vue';

.get('/vue', () =>
  handleVuePageRequest<typeof Home>({
    headTag: generateHeadElement({
      fonts: fontAssets(manifest),
      title: 'Home'
    }),
    indexPath: asset(manifest, 'HomeIndex'),
    pagePath: asset(manifest, 'Home')
  })
)`;
