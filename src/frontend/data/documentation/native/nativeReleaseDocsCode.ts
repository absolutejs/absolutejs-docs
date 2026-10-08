export const nativeReleaseAndroidSigning = `\
export ABSOLUTE_ANDROID_KEYSTORE_PATH="$HOME/.config/absolutejs/upload.jks"
export ABSOLUTE_ANDROID_KEYSTORE_PASSWORD="..."
export ABSOLUTE_ANDROID_KEY_ALIAS="upload"
export ABSOLUTE_ANDROID_KEY_PASSWORD="..."`;
export const nativeReleaseBuild = `\
bunx absolute mobile build android src/backend/server.ts
bunx absolute mobile build ios src/backend/server.ts`;
export const nativeReleaseCertificationConfig = `\
mobile: {
  // ...
  release: {
    certification: {
      channels: {
        production: { android: 'installed', ios: 'store' },
        beta: { android: 'installed', ios: 'simulator' }
      },
      googlePlayTracks: { production: 'installed', internal: false }
    }
  }
}`;
export const nativeReleaseCertify = `\
# Install the exact release on a device and run the acceptance checks
bunx absolute mobile test android \\
  --release .absolutejs/mobile/releases/android/amobile_android_RELEASE \\
  --report

# Bind that evidence to the release
bunx absolute mobile certify .absolutejs/mobile/releases/android/amobile_android_RELEASE \\
  --evidence path/to/report-dir \\
  --require installed`;
export const nativeReleaseCi = `\
bunx absolute mobile ci github src/backend/server.ts \\
  --publish \\
  --secret-env RELEASE_BUCKET \\
  --secret-env RELEASE_REGION`;
export const nativeReleaseDoctor = `\
bunx absolute mobile doctor release           # every configured platform
bunx absolute mobile doctor release ios --json # one platform, machine-readable`;
export const nativeReleaseIosSigning = `\
export ABSOLUTE_IOS_DEVELOPMENT_TEAM="ABCDE12345"

# From Linux or Windows, build on a paired Mac
bunx absolute mobile pair mac studio builder@studio.local
bunx absolute mobile build ios src/backend/server.ts --remote studio`;
export const nativeReleasePromote = `\
# Publish the exact artifact a CI run built and certified, without rebuilding
bunx absolute mobile ci promote android \\
  --run-id 1234567890 \\
  --certification path/to/certification-dir \\
  --play-track production \\
  --watch --audit

bunx absolute mobile ci promotions   # every promotion and its state
bunx absolute mobile ci promote --resume DISPATCH_ID`;
export const nativeReleasePublish = `\
# Google Play: 10% of production, with release notes
bunx absolute mobile publish android src/backend/server.ts \\
  --certification path/to/certification-dir \\
  --play-track production \\
  --play-rollout 0.1 \\
  --play-notes 'en-US=Faster checkout'

# TestFlight: an external group, submitted for beta review
bunx absolute mobile publish ios src/backend/server.ts \\
  --registry mobile.release.ios.ts \\
  --testflight-group 'External Beta' \\
  --testflight-notes 'en-US=Faster checkout' \\
  --testflight-submit-review`;
export const nativeReleaseRegistryAndroid = `\
// mobile.release.ts
import { S3Client } from '@aws-sdk/client-s3';
import { awsS3BlobStore } from '@absolutejs/blob/aws-s3';
import { createGooglePlayReleasePublisher } from '@absolutejs/deploy/google-play';
import { createNativeReleaseRegistry } from '@absolutejs/deploy/native-release';

const store = awsS3BlobStore({
  bucket: process.env.RELEASE_BUCKET ?? '',
  client: new S3Client({ region: process.env.RELEASE_REGION })
});

export default createGooglePlayReleasePublisher({
  receiptStore: store,
  registry: createNativeReleaseRegistry({ store })
});`;
export const nativeReleaseRegistryIos = `\
// mobile.release.ios.ts
import { S3Client } from '@aws-sdk/client-s3';
import { awsS3BlobStore } from '@absolutejs/blob/aws-s3';
import { createAppStoreConnectReleasePublisher } from '@absolutejs/deploy/app-store-connect';
import { createNativeReleaseRegistry } from '@absolutejs/deploy/native-release';

const store = awsS3BlobStore({
  bucket: process.env.RELEASE_BUCKET ?? '',
  client: new S3Client({ region: process.env.RELEASE_REGION })
});

export default createAppStoreConnectReleasePublisher({
  auth: {
    issuerId: process.env.APP_STORE_CONNECT_ISSUER_ID ?? '',
    keyId: process.env.APP_STORE_CONNECT_KEY_ID ?? '',
    privateKey: await Bun.file(
      process.env.APP_STORE_CONNECT_PRIVATE_KEY_PATH ?? 'AuthKey.p8'
    ).text()
  },
  receiptStore: store,
  registry: createNativeReleaseRegistry({ store })
});`;
