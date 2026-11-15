export const vitalsBatchBody = `\
POST /__absolute/vitals
Content-Type: application/json

{
  "route": "/pricing",
  "navigationType": "navigate",
  "metrics": [
    { "name": "LCP", "value": 1234, "id": "v5-…", "rating": "good", "delta": 1234 },
    { "name": "CLS", "value": 0.02, "id": "v5-…", "rating": "good", "delta": 0.02 }
  ]
}`;
export const vitalsConfig = `\
// absolute.config.ts
import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
  reactDirectory: 'src/frontend/react',
  vitals: { sampleRate: 0.25 }
});`;
export const vitalsHtmlTag = `\
<script type="module" src="/__absolute/vitals/reporter.js" data-absolute-vitals></script>`;
export const vitalsOnVital = `\
// src/backend/server.ts
import { onVital } from '@absolutejs/absolute';

onVital((report, request) => {
  if (report.rating !== 'poor') return;

  console.warn(
    \`[vitals] \${report.name} \${report.value} on \${report.route}\`,
    request.headers.get('user-agent')
  );
});`;
export const vitalsRemoteEndpoint = `\
// absolute.config.ts
export default defineConfig({
  reactDirectory: 'src/frontend/react',
  vitals: {
    endpoint: 'https://metrics.example.com/vitals',
    sampleRate: 0.1
  }
});

// src/backend/server.ts: the browser now posts to another origin
secureHeaders({
  contentSecurityPolicy: {
    directives: {
      'connect-src': ["'self'", 'https://metrics.example.com']
    }
  }
});`;
export const vitalsReportType = `\
type VitalReport = {
  name: 'CLS' | 'FCP' | 'INP' | 'LCP' | 'TTFB';
  value: number;
  id: string;
  route: string;
  rating?: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
  navigationType?: string;
};`;
export const vitalsStopHandler = `\
const stop = onVital(async (report) => {
  await saveVital(report);
});

// later
stop();`;
