export const deployAnnotations = `\
// Per-release metadata stored at releases/<id>/.deploy-meta.json.
// Surfaces on DeployResult.annotations and via deployer.readReleaseMeta(id).
const release = await deployer.deploy({
  annotations: {
    commitSha: 'abc1234',
    ref:       'refs/heads/main',
    message:   'fix: handle null in checkout',
    author:    'alex@example.com',
    tags:      { ci: 'github-actions', env: 'production' },
  },
});

// Resume a failed release — restart from the dead step. Useful when the
// deploy fails on 'verify' (slow health check) but the release is intact
// on disk.
const resumed = await deployer.deploy({ resumeReleaseId: failedReleaseId });

// Dry-run — log the plan without mutating the target. Verify pipeline
// shape from CI before flipping a real 'current' symlink.
await deployer.deploy({ dryRun: true });`;
export const deployPipeline = `\
// Default pipeline for a Bun project on Linux:
//   prepare → upload → install → build → link → restart → verify
//
// Override entirely or splice your own step in:
import { defaultBunPipeline, type DeployStep } from '@absolutejs/deploy';

const customSteps: DeployStep[] = [
  ...defaultBunPipeline(),
  {
    name: 'warm-cache',
    run: async (ctx) => {
      await ctx.target.exec(\`curl -s http://localhost:\${ctx.env.PORT}/warm-cache\`);
    },
  },
];

createDeployer({ /* ... */ steps: customSteps });`;
export const deployProcessManagers = `\
// bareManager (default) — 'nohup bun run start &' + pid file. Zero
// remote dependency.
import { bareManager } from '@absolutejs/deploy';
createDeployer({ /* ... */ processManager: bareManager() });

// systemdManager — generate + install a systemd unit pointing at current/.
// daemon-reload + restart. The production answer for VMs.
import { systemdManager } from '@absolutejs/deploy';
createDeployer({
  /* ... */
  processManager: systemdManager({
    user:      'deploy',
    group:     'deploy',
    execStart: '/usr/local/bin/bun run start',
    restart:   'always',
  }),
});

// Or implement your own (PM2, supervisord, runit, @absolutejs/runtime):
const customManager: ProcessManager = {
  reload: async (target, ctx) => { /* ... */ },
  stop:   async (target, ctx) => { /* ... */ },
  status: async (target, ctx) => 'running',
};`;
export const deployQuickStart = `\
import { createDeployer, sshTarget, systemdManager } from '@absolutejs/deploy';

const deployer = createDeployer({
  appName: 'my-app',
  target: sshTarget({
    host:     'droplet-1.example.com',
    user:     'deploy',
    identity: '~/.ssh/id_ed25519',
  }),
  source: { kind: 'directory', root: './' },
  env:    { PORT: '3000', DATABASE_URL: process.env.DATABASE_URL! },
  processManager: systemdManager({ user: 'deploy' }),
  verify: { kind: 'http', url: 'http://localhost:3000/health' },
});

const release = await deployer.deploy();
console.log(\`Deployed \${release.releaseId} in \${release.durationMs}ms\`);`;
export const deployRollback = `\
// Rollback — re-points 'current' at a previous release and restarts.
// No re-upload, no re-install, no re-build. Fast.
const previous = (await deployer.listReleases()).at(-2);
if (previous) await deployer.rollback(previous);

// Housekeeping — keep last N releases on disk.
await deployer.prune({ keep: 5 });

// Inspect a release's metadata.
const meta = await deployer.readReleaseMeta(releaseId);
// → { releaseId, annotations, status, failedStep?, completedSteps, ... }`;
export const deployTargets = `\
// localTarget — runs in a local directory. Tests + same-box workflows.
import { localTarget } from '@absolutejs/deploy';
const target = localTarget({ root: '/srv/my-app', env: { ... } });

// sshTarget — shells out to system ssh + rsync. Zero ssh2 dep. Works
// against ANY VPS where the controller machine has ssh + rsync in PATH
// (mac / linux / WSL all do).
import { sshTarget } from '@absolutejs/deploy';
const target = sshTarget({
  host:       'droplet-1.example.com',
  user:       'deploy',
  port:       22,
  identity:   '~/.ssh/id_ed25519',
  rsync:      true,                  // false → scp fallback
  sshFlags:   ['-o', 'ServerAliveInterval=30'],
});

// A Target is just { exec(cmd, opts?), upload(local, remote, opts?), close?() }.
// Anything that satisfies that contract is a valid target. Provider-specific
// adapters that DON'T fit (Cloudflare Workers API, Fly Machines API, AWS
// Fargate task-run) ship as sibling packages.`;
export const deployVerify = `\
// HTTP verify — most common.
verify: {
  kind: 'http',
  url: 'http://localhost:3000/health',
  retries: 30,
  intervalMs: 1_000,
  expectStatus: 200,
};

// TCP verify — for non-HTTP services.
verify: { kind: 'tcp', host: 'localhost', port: 3000, retries: 30 };

// Custom verify — escape hatch.
verify: {
  kind: 'custom',
  check: async (ctx) => {
    const result = await ctx.target.exec('healthcheck.sh');
    return result.exitCode === 0;
  },
};`;
