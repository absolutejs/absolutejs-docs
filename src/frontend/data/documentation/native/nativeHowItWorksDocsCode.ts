export const howItWorksKeepReleases = `\
# CI: restore the previous build’s mobile releases before building
- uses: actions/cache@v4
  with:
    path: build/.absolutejs/mobile-compatibility
    key: mobile-releases-\${{ github.run_id }}
    restore-keys: mobile-releases-`;
export const howItWorksPageRequest = `\
GET https://shop.example.com/products/42
Accept: application/vnd.absolute.page+json
x-absolute-mobile-page-id: react:ProductIndex`;
export const howItWorksPageResponse = `\
{
  "protocol": 1,
  "response": {
    "kind": "page",
    "framework": "react",
    "pageId": "react:ProductIndex",
    "props": { "product": { "id": "42", "name": "Field Jacket" } },
    "status": 200
  }
}`;
export const howItWorksPageRoute = `\
.get('/products/:id', async ({ params }) =>
  handleReactPageRequest({
    Page: Product,
    index: asset(manifest, 'ProductIndex'),
    props: { product: await loadProduct(params.id) }
  })
)`;
export const howItWorksReleaseStore = `\
// mobile.compatibility.ts
import { S3Client } from '@aws-sdk/client-s3';
import { awsS3BlobStore } from '@absolutejs/blob/aws-s3';

export default awsS3BlobStore({
  bucket: 'shop-mobile-releases',
  client: new S3Client({ region: 'us-east-1' })
});

// absolute.config.ts
mobile: {
  // ...
  compatibility: { store: 'mobile.compatibility.ts' }
}`;
