type TerminalSession = {
	command: string;
	output: string;
};

export const nativeTestingAndroidRelease = `\
bunx absolute mobile build android
bunx absolute mobile test android \\
  --release .absolutejs/mobile/releases/android/<release-id> \\
  --report`;
export const nativeTestingCertify = `\
bunx absolute mobile certify <release-dir> \\
  --evidence .absolutejs/mobile/test-reports/android-<timestamp> \\
  --require installed`;
export const nativeTestingCi = `\
bunx absolute mobile test android --release <release-dir> --yes --json --report`;
export const nativeTestingDoctor = `\
bunx absolute mobile doctor                 # every check, both platforms
bunx absolute mobile doctor android --fix   # install the SDK, emulator and Java 21
bunx absolute mobile doctor ios --fix       # on a Mac: download an iOS Simulator runtime
bunx absolute mobile doctor ios --remote studio-mac   # check a paired Mac`;
export const nativeTestingHmr = `\
bunx absolute mobile test android --wait-for-hmr
bunx absolute mobile test ios --wait-for-hmr`;
export const nativeTestingIosRelease = `\
# Simulator, on this Mac or a paired one
bunx absolute mobile test ios --release <release-dir> --report

# A registered iPhone, from the same archive
bunx absolute mobile build ios --registered-device-artifact
bunx absolute mobile test ios --release <release-dir> --device <udid> --report

# The TestFlight build Apple delivered to that iPhone
bunx absolute mobile test ios --release <release-dir> --device <udid> --testflight --report`;
export const nativeTestingOutput: TerminalSession = {
	command: 'bunx absolute mobile test android --release <release-dir>',
	output: `✓ Installed immutable capacitor release <release-id> with Bundletool in <time>.
✓ Embedded web content booted offline in <time> and relaunched in <time>.`
};
export const nativeTestingPhysicalIos = `\
bunx absolute dev --ios-device "Test iPhone"
bunx absolute mobile test ios --device "Test iPhone" --report`;
export const nativeTestingRoutes = `\
# Terminal 1: web plus the app on the emulator
bun dev

# Terminal 2: open each route in the app's real WebView
bunx absolute mobile test android --route / --route /account --route /orders/42`;
