export const nativeExpoConfig = `\
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  mobile: {
    engine: 'expo',
    appId: 'com.example.shop',
    appName: 'Shop',
    server: { productionOrigin: 'https://shop.example.com' },
    routes: {
      native: {
        '/scanner': './mobile/native/scanner.tsx',
        '/products/:productId': './mobile/native/product.tsx',
        '/files/*': './mobile/native/files.tsx'
      }
    }
  }
});`;
export const nativeExpoDev = `\
bun dev                            # Metro, the dev client and your server together
bun dev --android-device emulator-5554
bun dev --ios-device "iPhone 16"`;
export const nativeExpoRelease = `\
bunx absolute mobile build android src/backend/server.ts
bunx absolute mobile build ios src/backend/server.ts
bunx absolute mobile publish android --play-track internal`;
export const nativeExpoRoute = `\
// mobile/native/product.tsx
import { FlatList, Pressable, Text } from 'react-native';
import type { AbsoluteNativeRouteProps } from '@absolutejs/absolute/mobile';
import type { ProductPageProps } from '../../src/frontend/pages/Product';

export default function Product({
  pageProps,
  params,
  reload
}: AbsoluteNativeRouteProps<ProductPageProps, { productId: string }>) {
  return (
    <FlatList
      data={pageProps.variants}
      keyExtractor={(variant) => variant.id}
      ListHeaderComponent={<Text>{pageProps.name} #{params.productId}</Text>}
      onRefresh={reload}
      refreshing={false}
      renderItem={({ item }) => (
        <Pressable>
          <Text>{item.label}</Text>
        </Pressable>
      )}
    />
  );
}`;
export const nativeExpoServerRoute = `\
// The same handler serves the web page and the native route's pageProps
.get('/products/:productId', async ({ params, request }) =>
  handleReactPageRequest({
    index: asset(manifest, 'ProductIndex'),
    Page: Product,
    props: await loadProduct(params.productId),
    request
  })
)`;
