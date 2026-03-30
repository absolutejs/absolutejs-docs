export const imageConfigBasic = `\
// absolute.config.ts — basic image optimization
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  reactDirectory: './src/frontend',
  images: {
    quality: 80,
    formats: ['image/webp', 'image/avif']
  }
});`;

export const imageConfigFull = `\
// absolute.config.ts — full image optimization config
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  reactDirectory: './src/frontend',
  images: {
    // Widths used for responsive srcset when layout is "responsive"
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    // Widths used for fixed-size images
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Output formats — the server picks the best one the browser supports
    formats: ['image/webp', 'image/avif'],

    // Minimum cache TTL in seconds for optimized images
    minimumCacheTTL: 60,

    // Allow remote images from specific origins
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.example.com',
        port: '',
        pathname: '/assets/**'
      }
    ],

    // Output quality (1-100)
    quality: 80,

    // Custom endpoint path (default: '/_absolute/image')
    path: '/_absolute/image',

    // Disable optimization entirely (serve originals)
    unoptimized: false
  }
});`;

export const imageReactUsage = `\
import { Image } from '@absolutejs/absolute/react';

// Responsive image — generates srcset for all device sizes
export const Hero = () => (
  <Image
    src="/images/hero.jpg"
    alt="Hero banner"
    width={1200}
    height={600}
    priority
  />
);

// Fill container — image stretches to fill its parent
export const Background = () => (
  <div style={{ position: 'relative', width: '100%', height: 400 }}>
    <Image
      src="/images/bg.jpg"
      alt="Background"
      fill
      style={{ objectFit: 'cover' }}
    />
  </div>
);

// Fixed size with explicit dimensions
export const Avatar = ({ user }: { user: { name: string; avatar: string } }) => (
  <Image
    src={user.avatar}
    alt={user.name}
    width={48}
    height={48}
    quality={90}
  />
);

// Skip optimization for SVGs or already-optimized images
export const Logo = () => (
  <Image
    src="/images/logo.svg"
    alt="Logo"
    width={120}
    height={40}
    unoptimized
  />
);`;

export const imageSvelteUsage = `\
<script>
  import { Image } from '@absolutejs/absolute/svelte';
</script>

<Image
  src="/images/hero.jpg"
  alt="Hero banner"
  width={1200}
  height={600}
  priority
/>

<!-- Fill mode -->
<div style="position: relative; width: 100%; height: 400px;">
  <Image
    src="/images/bg.jpg"
    alt="Background"
    fill
    style="object-fit: cover;"
  />
</div>`;

export const imageVueUsage = `\
<template>
  <Image
    src="/images/hero.jpg"
    alt="Hero banner"
    :width="1200"
    :height="600"
    priority
  />

  <!-- Fill mode -->
  <div style="position: relative; width: 100%; height: 400px;">
    <Image
      src="/images/bg.jpg"
      alt="Background"
      fill
      style="object-fit: cover;"
    />
  </div>
</template>

<script setup>
import { Image } from '@absolutejs/absolute/vue';
</script>`;

export const imageHtmlUsage = `\
<!-- AbsoluteJS transforms data-optimized images at build time -->
<img
  data-optimized
  src="/images/hero.jpg"
  alt="Hero banner"
  width="1200"
  height="600"
/>

<!-- With explicit quality -->
<img
  data-optimized
  data-quality="90"
  src="/images/photo.jpg"
  alt="High quality photo"
  width="800"
  height="600"
/>

<!--
  At build time, AbsoluteJS rewrites these to use the
  /_absolute/image endpoint with proper srcset and sizes
  attributes for responsive delivery.
-->`;

export const imageAngularUsage = `\
<!-- app.component.html -->
<abs-image
  src="/images/hero.jpg"
  alt="Hero banner"
  [width]="1200"
  [height]="600"
  [priority]="true"
></abs-image>

<!-- Fill mode -->
<div style="position: relative; width: 100%; height: 400px;">
  <abs-image
    src="/images/bg.jpg"
    alt="Background"
    [fill]="true"
    style="object-fit: cover;"
  ></abs-image>
</div>`;

export const imageEndpointDirect = `\
# The image optimization endpoint accepts these query parameters:
# url  — path to the source image (required)
# w    — desired width in pixels (required)
# q    — quality 1-100 (optional, defaults to config value)

# Fetch a 640px-wide WebP version
curl -H "Accept: image/webp" \\
  "http://localhost:3000/_absolute/image?url=/images/hero.jpg&w=640&q=80"

# Fetch an AVIF version
curl -H "Accept: image/avif" \\
  "http://localhost:3000/_absolute/image?url=/images/hero.jpg&w=1200&q=75"

# The server reads the Accept header and returns the best
# supported format. If the browser doesn't support WebP or AVIF,
# the original format is returned at the requested size.`;

export const imagePropsReference = `\
type ImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  quality?: number;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  style?: Record<string, string> | string;
  className?: string;
  unoptimized?: boolean;
  onLoad?: () => void;
  onError?: () => void;
};`;

export const imageConfigReference = `\
type ImageConfig = {
  deviceSizes?: number[];
  imageSizes?: number[];
  formats?: ImageFormat[];
  minimumCacheTTL?: number;
  remotePatterns?: RemotePattern[];
  quality?: number;
  path?: string;
  unoptimized?: boolean;
};

type ImageFormat = 'image/webp' | 'image/avif';

type RemotePattern = {
  protocol?: 'http' | 'https';
  hostname: string;
  port?: string;
  pathname?: string;
};`;

export const imageRemotePatterns = `\
// absolute.config.ts — allowing remote images
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  reactDirectory: './src/frontend',
  images: {
    remotePatterns: [
      // Allow all images from a specific CDN
      {
        protocol: 'https',
        hostname: 'cdn.example.com'
      },

      // Allow images from any subdomain of example.com
      {
        protocol: 'https',
        hostname: '*.example.com',
        pathname: '/images/**'
      },

      // Allow a specific path on a specific host
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/my-bucket/**'
      }
    ]
  }
});`;
