export const nativeFirstRun = `\
bunx absolute mobile init   # create the iOS and Android projects
bun dev                     # web, plus your app on an emulator or simulator`;
export const nativeMinimalConfig = `\
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  mobile: {
    appId: 'com.example.shop',
    appName: 'Shop',
    server: { productionOrigin: 'https://shop.example.com' }
  }
});`;
export const nativeSamePageCode = `\
import { camera, haptics } from '@absolutejs/devices';

const takeReceiptPhoto = async () => {
  const permission = await camera.requestPermission();
  if (permission.state !== 'granted') return null;

  await haptics.impact('light');

  return camera.takePhoto({ direction: 'rear' });
};`;
