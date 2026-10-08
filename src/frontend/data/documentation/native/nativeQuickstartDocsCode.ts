export const quickstartAndroidDevice = `\
adb devices                                   # find your phone's serial
bunx absolute dev --android-device R58M42ABCDE`;
export const quickstartConfig = `\
// absolute.config.ts
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  reactDirectory: 'src/frontend',
  mobile: {
    appId: 'com.example.shop',
    appName: 'Shop',
    server: { productionOrigin: 'https://shop.example.com' }
  }
});`;
export const quickstartDev = `\
bun dev`;
export const quickstartDoctor = `\
bunx absolute mobile doctor            # what is installed, what is missing
bunx absolute mobile doctor android --fix   # install the Android SDK, emulator and Java 21`;
export const quickstartInit = `\
bunx absolute mobile init`;
export const quickstartIosDevice = `\
xcrun devicectl list devices                  # find your iPhone's identifier
bunx absolute dev --ios-device "Ada's iPhone"`;
export const quickstartPairMac = `\
bunx absolute mobile pair mac studio builder@studio.local
bun dev                                       # iOS now runs on the paired Mac`;
export const quickstartServerExport = `\
// src/backend/server.ts
import { prepare, asset, networking } from '@absolutejs/absolute';
import { handleReactPageRequest } from '@absolutejs/absolute/react';
import { Elysia } from 'elysia';
import { Home } from '../frontend/pages/Home';

const { absolutejs, manifest } = await prepare();

// Export the app as server, app or default so the build can find your pages
export const app = new Elysia()
  .use(absolutejs)
  .get('/', () =>
    handleReactPageRequest({
      Page: Home,
      index: asset(manifest, 'HomeIndex'),
      props: { greeting: 'Welcome back' }
    })
  )
  .use(networking);`;
