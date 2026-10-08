type TerminalSession = {
	command: string;
	output: string;
};

export const nativeDevBanner: TerminalSession = {
	command: 'bun dev',
	output: `  ➜  Local:   http://localhost:3000/
  ➜  Mobile:  http://localhost:3000/__absolute/mobile-preview`
};

export const nativeDevDoctor = `\
bunx absolute mobile doctor                   # every platform
bunx absolute mobile doctor android --fix     # install the SDK, emulator and Java 21
bunx absolute mobile doctor ios --fix         # on a Mac: install a missing simulator runtime`;

export const nativeDevHttpsConfig = `\
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  dev: { https: true },
  mobile: {
    appId: 'com.example.shop',
    appName: 'Shop',
    server: { productionOrigin: 'https://shop.example.com' }
  }
});`;

export const nativeDevInspect = `\
bunx absolute mobile inspect
bunx absolute mobile inspect --json --require-bundle`;

export const nativeDevPairMac = `\
ssh builder@my-mac.local                      # accept the host key once
bunx absolute mobile pair mac studio builder@my-mac.local

# Another SSH port or workspace on the Mac
bunx absolute mobile pair mac studio builder@my-mac.local \\
  --port 2222 \\
  --workspace /Users/builder/AbsoluteJS`;

export const nativeDevPhysicalAndroid = `\
adb devices                                   # find the serial of the phone
bunx absolute dev --android-device R58N12ABCDE`;

export const nativeDevPhysicalIos = `\
xcrun devicectl list devices                  # find the device identifier
bunx absolute dev --ios-device "Ada’s iPhone"`;

export const nativeDevRemotes = `\
bunx absolute mobile remotes                  # list paired Macs
bunx absolute mobile remotes inspect studio   # disk use, caches, active builds
bunx absolute mobile doctor ios --remote studio
bunx absolute mobile remotes clean studio --yes
bunx absolute mobile unpair mac studio`;

export const nativeDevSkipMobile = `\
bun dev --no-mobile               # web only for this run
ABSOLUTE_NO_MOBILE=1 bun dev      # same, for scripts and CI`;
