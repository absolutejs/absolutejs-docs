export const devicesImport = `\
import { camera, location, share } from '@absolutejs/devices';`;
export const devicesLocationWatch = `\
import { location } from '@absolutejs/devices';

const permission = await location.requestPermission({ precision: 'coarse' });
if (permission.state === 'granted') {
  const stop = await location.watch(
    (event) => {
      if (event.type === 'position') moveMarker(event.position);
      else showLocationError(event.error);
    },
    { accuracy: 'balanced' }
  );
  // later, when the map closes
  await stop();
}`;
export const devicesPermissionFlow = `\
import { camera, isDeviceError } from '@absolutejs/devices';

// Call from a button press: requesting permission shows the system prompt.
const scanReceipt = async () => {
  const status = await camera.capability();
  if (!status.available) return showUploadFallback(status.reason);

  const permission = await camera.requestPermission();
  if (permission.state !== 'granted') return showCameraHelp(permission);

  try {
    const photo = await camera.takePhoto({
      direction: 'rear',
      transform: { width: 1600, height: 1600, quality: 80 }
    });
    preview.src = photo.webPath;
  } catch (error) {
    if (isDeviceError(error) && error.code === 'cancelled') return;
    throw error;
  }
};`;
export const devicesReactCleanup = `\
import { useEffect, useState } from 'react';
import { network } from '@absolutejs/devices';

export const OfflineBanner = () => {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    let stop: (() => void | Promise<void>) | undefined;
    let active = true;

    void network.status().then((status) => setOnline(status.connected));
    void network
      .onChange((status) => setOnline(status.connected))
      .then((unsubscribe) => {
        if (active) stop = unsubscribe;
        else void unsubscribe();
      });

    return () => {
      active = false;
      void stop?.();
    };
  }, []);

  return online ? null : <p role="status">You are offline</p>;
};`;
export const devicesStorage = `\
import { secureStorage, storage } from '@absolutejs/devices';

await storage.set('theme', 'dark');            // preferences, plain text
await secureStorage.set('pin-hint', hint);     // Keychain or Android Keystore`;
export const devicesSvelteCleanup = `\
<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { lifecycle } from '@absolutejs/devices';

  let stop: (() => void | Promise<void>) | undefined;

  onMount(async () => {
    stop = await lifecycle.onResume(() => refreshInbox());
  });

  onDestroy(() => {
    void stop?.();
  });
</script>`;
export const devicesTesting = `\
import { afterEach, expect, test } from 'bun:test';
import { installDeviceAdapter, network } from '@absolutejs/devices';
import { createTestDeviceAdapter } from '@absolutejs/devices/testing';

let cleanup: (() => void) | undefined;
afterEach(() => cleanup?.());

test('shows the offline banner when the connection drops', async () => {
  const device = createTestDeviceAdapter({
    platform: { os: 'android', isNative: true }
  });
  cleanup = installDeviceAdapter(device.adapter);

  const seen: boolean[] = [];
  await network.onChange((status) => seen.push(status.connected));
  device.emitNetwork({ connected: false, connectionType: 'none' });

  expect(seen).toEqual([false]);
});`;
