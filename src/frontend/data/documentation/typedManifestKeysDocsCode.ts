export const typedManifestAssetUnchecked = `\
import { assetUnchecked } from '@absolutejs/absolute';

// The key is built at runtime, so it can't be checked at compile time
.get('/preview/:page', ({ params }) =>
  assetUnchecked(manifest, \`\${params.page}Index\`)
)`;

export const typedManifestCheck = `\
import { asset } from '@absolutejs/absolute';

asset(manifest, 'DashboardRSC'); // OK
asset(manifest, 'DashbordRSC');
// Argument of type '"DashbordRSC"' is not assignable to parameter
// of type 'keyof AbsoluteManifestKeys'.`;

export const typedManifestGenerated = `\
// .absolutejs/types/manifest.d.ts (generated, do not edit)
export {};

declare module '@absolutejs/absolute' {
  interface AbsoluteManifestKeys {
    "AboutIndex": true;
    "DashboardRSC": true;
    "PricingIndex": true;
    // ...one entry per key the build writes
  }
}`;

export const typedManifestKeyType = `\
import type { ManifestKey } from '@absolutejs/absolute';

// One of the generated keys, or any string when the
// project has no generated file yet
const homeKey: ManifestKey = 'HomeIndex';`;

export const typedManifestTsconfig = `\
// tsconfig.json
{
  "compilerOptions": {
    // ...
  },
  "include": ["**/*", ".absolutejs/types/manifest.d.ts"],
  "exclude": ["node_modules", "build", "dist"]
}`;

export const typedManifestTsconfigFiles = `\
// tsconfig.json: keep ".absolutejs" excluded and list the file under "files"
{
  "compilerOptions": {
    // ...
  },
  "include": ["**/*"],
  "exclude": ["node_modules", "build", "dist", ".absolutejs"],
  "files": [".absolutejs/types/manifest.d.ts"]
}`;
