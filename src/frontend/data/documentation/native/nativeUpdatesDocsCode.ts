export const nativeUpdatesBuildPublish = `\
bunx absolute mobile update build src/backend/server.ts \\
  --classification bug-fix \\
  --key-id production-2026 \\
  --signing-key "$HOME/.config/absolutejs/mobile-update.pem" \\
  --within-submitted-purpose

bunx absolute mobile update publish .absolutejs/mobile/updates/amu_RELEASE --rollout 0.05
bunx absolute mobile update promote --release amu_RELEASE --rollout 0.25
bunx absolute mobile update promote --release amu_RELEASE --rollout 1`;
export const nativeUpdatesConfig = `\
mobile: {
  appId: 'com.example.shop',
  appName: 'Shop',
  server: { productionOrigin: 'https://shop.example.com' },
  updates: {
    publicKeys: {
      'production-2026': 'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE...'
    }
  }
}`;
export const nativeUpdatesEvents = `\
window.addEventListener('absolute:mobile-update', (event) => {
  if (!(event instanceof CustomEvent)) return;
  const { detail } = event;

  if (detail.kind === 'download-progress')
    progressBar.value = detail.completedFiles / detail.totalFiles;
  if (detail.kind === 'rolled-back')
    console.warn('Update rolled back', detail.releaseId);
});`;
export const nativeUpdatesExpoConfig = `\
updates: {
  publicKeys: { 'production-2026': '...' },
  expoCodeSigning: {
    certificatePath: 'mobile/code-signing/expo-update-certificate.pem',
    keyId: 'main'
  }
}`;
export const nativeUpdatesExpoSigning = `\
bunx absolute mobile update signing generate \\
  --private-key "$HOME/.config/absolutejs/shop-expo-update.pem"`;
export const nativeUpdatesKeys = `\
# Private key: keep it on the build machine, outside the project
openssl genpkey -algorithm EC -pkeyopt ec_paramgen_curve:P-256 \\
  -out "$HOME/.config/absolutejs/mobile-update.pem"

# Public key: this value goes in absolute.config.ts
openssl pkey -in "$HOME/.config/absolutejs/mobile-update.pem" \\
  -pubout -outform DER | openssl base64 -A`;
export const nativeUpdatesOperate = `\
bunx absolute mobile update status
bunx absolute mobile update advance
bunx absolute mobile update pause
bunx absolute mobile update resume
bunx absolute mobile update cancel
bunx absolute mobile update rollback                       # back to the build in the store
bunx absolute mobile update rollback --release amu_RELEASE # back to an earlier update`;
export const nativeUpdatesProvision = `\
# Local storage for development and single-machine testing
bunx absolute mobile update provision --storage local --yes

# S3-compatible storage, required in production
bunx absolute mobile update provision --storage s3 --force --yes`;
export const nativeUpdatesRolloutConfig = `\
updates: {
  publicKeys: { 'production-2026': '...' },
  server: {
    health: { failureRate: 0.2, minimumReports: 20 },
    rollout: {
      automatic: true,
      stages: [
        { rollout: 0.05, minimumReports: 20, observationMinutes: 60 },
        { rollout: 0.25, minimumReports: 100, observationMinutes: 360 },
        { rollout: 1 }
      ]
    }
  }
}`;
