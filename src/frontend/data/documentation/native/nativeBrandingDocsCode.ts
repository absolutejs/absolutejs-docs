export const nativeAndroidFingerprint = `\
keytool -list -v -keystore release.keystore -alias upload | grep SHA256`;

export const nativeAppleAssociation = `\
{
  "applinks": {
    "details": [
      {
        "appIDs": ["ABCDE12345.com.example.shop"],
        "components": [{ "/": "/*" }]
      }
    ]
  }
}`;

export const nativeAssociationCommands = `\
bunx absolute mobile associations             # write both files to .absolutejs/mobile/associations
bunx absolute mobile associations --verify    # fetch them from every host and compare`;

export const nativeBrandingCommands = `\
bunx absolute mobile assets --preview --yes   # generate, plus a preview page
bunx absolute mobile assets --check           # fail if anything is stale
bunx absolute mobile assets android --yes     # one platform only`;

export const nativeBrandingConfig = `\
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  mobile: {
    appId: 'com.example.shop',
    appName: 'Shop',
    server: { productionOrigin: 'https://shop.example.com' },
    branding: {
      icon: 'assets/mobile/icon.png',
      android: {
        backgroundColor: '#0B1020',
        foreground: 'assets/mobile/android-foreground.png',
        monochrome: 'assets/mobile/android-monochrome.png'
      },
      ios: {
        darkIcon: 'assets/mobile/ios-dark.png',
        tintedIcon: 'assets/mobile/ios-tinted.png'
      },
      splash: {
        backgroundColor: '#FFFFFF',
        darkBackgroundColor: '#0B1020',
        logoScale: 0.25
      }
    }
  }
});`;

export const nativeDeepLinksConfig = `\
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  mobile: {
    appId: 'com.example.shop',
    appName: 'Shop',
    server: { productionOrigin: 'https://shop.example.com' },
    deepLinks: {
      scheme: 'shop',
      hosts: ['links.example.com'],
      apple: { appIdPrefix: 'ABCDE12345' },
      android: {
        sha256CertificateFingerprints: [
          '14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5'
        ]
      }
    }
  }
});`;

export const nativeLinksCode = `\
import { links } from '@absolutejs/devices';

const launch = await links.getLaunchLink();
const referral = launch?.query.get('ref');
if (referral) recordReferral(referral);

const stopListening = await links.onOpenLink((link) => {
  if (link.pathname.startsWith('/invite/')) showInviteBanner();
});

await links.openExternal('https://status.example.com');
await stopListening();`;
