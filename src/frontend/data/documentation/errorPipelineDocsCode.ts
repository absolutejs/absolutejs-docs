export const errorPipelineBrowser = `\
import { captureException, initBeacon } from '@absolutejs/beacon';
import { createRecorder } from '@absolutejs/replay';

// 1. Record the session. Chunks upload via a pluggable transport
//    (wire @absolutejs/blob). Inputs are masked by default.
const recorder = createRecorder({
  project: 'web',
  release: import.meta.env.VITE_RELEASE,
  upload: (chunk) =>
    uploadToBlob(
      \`replays/\${chunk.replayId}/\${chunk.seq}.json\`,
      JSON.stringify(chunk),
    ),
});

// 2. Point the beacon at the ingest endpoint and stamp every event
//    with the active replayId — the cross-link the dashboard uses.
initBeacon({
  project: 'web',
  endpoint: 'https://api.example.com/ingest',
  release: import.meta.env.VITE_RELEASE,
  environment: 'production',
  getReplayId: () => recorder.replayId,
});

// 3. On error, flush the replay tail so the DOM around it is stored.
window.addEventListener('error', () => void recorder.flush());

// Uncaught errors + unhandled rejections are captured automatically;
// manual capture works anywhere:
try {
  await checkout();
} catch (error) {
  captureException(error, { tags: { component: 'billing' } });
}`;
export const errorPipelineServer = `\
import { Elysia } from 'elysia';
import { ingestPlugin } from '@absolutejs/errors/ingest';
import { createPostgresIssueStore } from '@absolutejs/errors-postgres';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL ?? '');
const store = createPostgresIssueStore({ sql }); // lazy, auto-created schema

// POST /ingest: Schema-validate the untrusted body, push into the
// coalescing buffer, answer 202 immediately. A drainer flushes every
// ~500ms — ONE recordCoalesced upsert per (project, fingerprint) group.
const ingest = await ingestPlugin({
  store,
  onIssue: (result) => {
    // Fires ONLY on a new issue or a regression — the page-someone hook.
    if (result.isNew || result.isRegression) notify(result.issue);
  },
});

new Elysia().use(ingest).listen(3000);`;
