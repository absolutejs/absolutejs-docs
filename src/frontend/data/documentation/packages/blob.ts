import { PackageDocData } from '../../../../types/packageDocs';

export const blobPackageData: PackageDocData = {
	adapterGroups: [
		{
			description:
				'Both adapters implement the same BlobStore interface, so swapping providers is a one-constructor change.',
			heading: 'Adapters',
			items: [
				{
					description:
						'Filesystem storage for dev, tests, and single-host deployments. Atomic writes via temp file + rename; metadata stored alongside each key.',
					name: '@absolutejs/blob/local'
				},
				{
					description:
						'AWS S3, Cloudflare R2, Backblaze B2, MinIO, Wasabi, Tigris — any S3-compatible HTTP API via a narrow S3ClientLike shape.',
					name: '@absolutejs/blob/s3'
				}
			]
		}
	],
	category: 'Data & Sync',
	description:
		'Object storage substrate for the AbsoluteJS PaaS: one BlobStore interface (put, get, getStream, head, delete, list, presign) with adapters for local disk and any S3-compatible service. The S3 adapter takes a narrow S3ClientLike shape instead of depending on the AWS SDK directly, so the SDK stays out of your dependency tree until you need it. Other AbsoluteJS packages ride this substrate for uploads, replay artifacts, and media storage.',
	features: [
		{
			description:
				'put, get, getStream, head, delete, list, and presign behave identically across adapters, so provider choice is a deploy-time detail.',
			title: 'One BlobStore interface'
		},
		{
			description:
				'AWS S3, Cloudflare R2, Backblaze B2, MinIO, Wasabi, and Tigris all work through the same s3BlobStore adapter — only the endpoint changes.',
			title: 'S3-compatible adapter'
		},
		{
			description:
				'The adapter accepts a narrow S3ClientLike object, keeping @aws-sdk/client-s3 out of your dependency tree as a hard dependency.',
			title: 'No hard SDK dependency'
		},
		{
			description:
				'presign builds time-limited URLs for direct browser upload (operation: put) or download (operation: get) without proxying bytes through your server.',
			title: 'Presigned URLs'
		},
		{
			description:
				'Every operation runs validateKey, rejecting leading slashes, NUL bytes, and . or .. path segments with BlobError(INVALID_KEY) — path traversal is closed at the substrate level.',
			title: 'Key validation built in'
		},
		{
			description:
				'getStream serves large blobs without loading them into memory, and list paginates with a cursor you pass back into the next call.',
			title: 'Streaming and pagination'
		}
	],
	installCommand: 'bun add @absolutejs/blob',
	links: [
		{
			href: 'https://www.npmjs.com/package/@absolutejs/blob',
			label: 'npm'
		},
		{
			href: 'https://github.com/absolutejs/blob',
			label: 'GitHub'
		}
	],
	name: 'Blob',
	notes: [
		{
			body: '@absolutejs/blob is 0.x — the BlobStore interface is settling, and option shapes may still shift between minor versions.',
			title: 'Beta interface',
			variant: 'warning'
		},
		{
			body: 'The local adapter throws BlobError(UNSUPPORTED) for presign. If you need presigned URLs in development, run the S3 adapter against a local MinIO.',
			title: 'Presign requires an S3 backend',
			variant: 'info'
		}
	],
	npmName: '@absolutejs/blob',
	samples: [
		{
			code: `import { localBlobStore } from '@absolutejs/blob/local';

const blobs = localBlobStore({ root: './var/blobs' });

await blobs.put('users/42/avatar.png', body, {
	contentType: 'image/png'
});

const bytes = await blobs.get('users/42/avatar.png'); // null if missing
const meta = await blobs.head('users/42/avatar.png');
await blobs.delete('users/42/avatar.png'); // idempotent`,
			description:
				'The local adapter stores files on disk — ideal for development, tests, and single-host deployments. get returns null for missing keys instead of throwing, and delete is idempotent.',
			heading: 'Quick Start',
			language: 'typescript'
		},
		{
			code: `import {
	S3Client,
	PutObjectCommand,
	GetObjectCommand,
	HeadObjectCommand,
	DeleteObjectCommand,
	ListObjectsV2Command
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3BlobStore } from '@absolutejs/blob/s3';

// Cloudflare R2 — swap the endpoint for B2, MinIO, Wasabi, Tigris
const aws = new S3Client({
	credentials: { accessKeyId, secretAccessKey },
	endpoint: \`https://\${ACCOUNT_ID}.r2.cloudflarestorage.com\`,
	region: 'auto'
});

// Wire the narrow S3ClientLike shape onto the real SDK client
const blobs = s3BlobStore({
	bucket: 'my-bucket',
	client: {
		deleteObject: (input) => aws.send(new DeleteObjectCommand(input)),
		getObject: (input) => aws.send(new GetObjectCommand(input)),
		headObject: (input) => aws.send(new HeadObjectCommand(input)),
		listObjectsV2: (input) => aws.send(new ListObjectsV2Command(input)),
		presignGetObject: (input, options) =>
			getSignedUrl(aws, new GetObjectCommand(input), options),
		presignPutObject: (input, options) =>
			getSignedUrl(aws, new PutObjectCommand(input), options),
		putObject: (input) => aws.send(new PutObjectCommand(input))
	}
});

// Time-limited URL for direct browser upload
const url = await blobs.presign('uploads/file.pdf', {
	operation: 'put',
	ttlSeconds: 900
});`,
			description:
				'The S3 adapter works with any S3-compatible service. You hand it an S3ClientLike object wired onto the real AWS SDK client, so the SDK is your dependency, not the substrate’s.',
			heading: 'S3-Compatible Services',
			language: 'typescript'
		}
	],
	status: 'beta',
	tagline:
		'One BlobStore interface over local disk and every S3-compatible service, without a hard AWS SDK dependency.',
	version: '0.1.0'
};
