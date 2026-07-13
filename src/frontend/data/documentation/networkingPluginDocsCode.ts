export const networkingBasic = `\
import { networking } from '@absolutejs/absolute';
import { Elysia } from 'elysia';

new Elysia()
  .get('/', () => handleReactPageRequest({ Page: Home, index: indexPath }))
  .use(networking);  // Starts the server: no .listen() needed`;
export const networkingEnv = `\
# .env file
HOST=localhost
PORT=3000

# The networking plugin reads these automatically
# HOST defaults to 'localhost'
# PORT defaults to 3000`;
export const networkingExplained = `\
// The networking plugin does everything when you .use() it:
// 1. Reads HOST and PORT from environment variables
// 2. Checks for the --host flag
// 3. Starts the server with the correct configuration
// 4. Logs the connection info

new Elysia()
  .get('/', handler)
  .post('/api', handler)
  .use(networking);  // Starts the server`;
export const networkingFull = `\
import { Elysia } from 'elysia';
import { prepare, asset, networking } from '@absolutejs/absolute';
import { handleReactPageRequest } from '@absolutejs/absolute/react';
import Home from './pages/Home';

const { absolutejs, manifest } = await prepare();

new Elysia()
  .use(absolutejs)
  .get('/', () => handleReactPageRequest({ Page: Home, index: asset(manifest, 'HomeIndex') }))
  .get('/api/health', () => ({ status: 'ok' }))
  .use(networking);`;
export const networkingHost = `\
# Run with --host flag to expose to network
bun run src/backend/server.ts --host

# This binds to 0.0.0.0 instead of localhost
# Useful for testing on mobile devices or local network access`;
export const networkingLogging = `\
Server running at http://localhost:3000
Network: http://192.168.1.100:3000`;
