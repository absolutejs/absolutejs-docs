export const configExpo = `\
mobile: {
  engine: 'expo',
  appId: 'com.example.shop',
  appName: 'Shop',
  server: { productionOrigin: 'https://shop.example.com' },
  routes: {
    native: {
      '/scanner': './mobile/native/scanner.tsx',
      '/products/:productId': './mobile/native/product.tsx'
    }
  }
}`;
export const configFull = `\
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  mobile: {
    appId: 'com.example.shop',
    appName: 'Shop',
    entry: '/home',
    platforms: ['ios', 'android'],
    server: { productionOrigin: 'https://shop.example.com' },
    ios: { version: '1.4.0' },
    branding: {
      icon: 'branding/icon.png',
      android: {
        backgroundColor: '#0F172A',
        foreground: 'branding/android-foreground.png',
        monochrome: 'branding/android-monochrome.png'
      },
      ios: {
        darkIcon: 'branding/icon-dark.png',
        tintedIcon: 'branding/icon-tinted.png'
      },
      splash: {
        backgroundColor: '#FFFFFF',
        darkBackgroundColor: '#0F172A',
        logoScale: 0.25
      }
    },
    deepLinks: {
      scheme: 'shop',
      hosts: ['links.example.com'],
      apple: { appIdPrefix: 'ABCDE12345' },
      android: {
        sha256CertificateFingerprints: [
          '14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5'
        ]
      }
    },
    pushNotifications: {
      android: { googleServicesFile: 'google-services.json' }
    },
    observability: {
      project: 'shop',
      environment: 'production',
      sampleRate: 0.5
    },
    updates: {
      channel: 'production',
      publicKeys: { '2026-10': 'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE…' },
      server: {
        rollout: { automatic: true }
      }
    }
  }
});`;
export const configMinimal = `\
mobile: {
  appId: 'com.example.shop',
  appName: 'Shop',
  server: { productionOrigin: 'https://shop.example.com' }
}`;
