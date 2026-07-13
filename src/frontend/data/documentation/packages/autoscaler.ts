import { PackageDocData } from '../../../../types/packageDocs';

export const autoscalerPackageData: PackageDocData = {
	category: 'Platform & Infra',
	description:
		'Runs the decision loop of a horizontal autoscaler for infrastructure you operate yourself: it reads pluggable signals (CPU, queue depth, p95 latency), combines them into a pressure score, and asks your actuator to spawn or drain instances within declarative min/max, threshold, and cooldown rules. Because the actuator is caller-supplied, the same loop scales VMs, containers, processes, or isolates — you define what an instance is. It is the same scaling engine that powers AbsoluteJS hosting, packaged for any Bun fleet you run on your own servers.',
	features: [
		{
			description:
				'createPolicy sets min/max instance counts, scale-up and scale-down thresholds, step sizes, and independent cooldown timers — a fleet that just scaled up can still scale down moments later.',
			title: 'Declarative scaling policy'
		},
		{
			description:
				'The ratioSignal helper normalizes any observed/target metric (CPU utilization, queue depth, latency) to a common score. A signal that throws is excluded from the score, so one offline metric source never breaks the loop.',
			title: 'Pluggable signals'
		},
		{
			description:
				'You supply list, spawn, drain, and terminate callbacks. The decision logic stays cloud-agnostic while your control plane talks to Hetzner, Kubernetes, or a local process pool.',
			title: 'Bring your own actuator'
		},
		{
			description:
				"Combine readings with 'max' (worst pressure wins — the safe default for elasticity), weighted 'avg', or a custom function over the raw readings.",
			title: 'Combine strategies'
		},
		{
			description:
				'With an optional audit broker attached, every decision emits autoscaler.scale.up, autoscaler.scale.down, or autoscaler.hold events, so the trail explains why the fleet is where it is.',
			title: 'Built-in audit trail'
		}
	],
	installCommand: 'bun add @absolutejs/autoscaler',
	links: [
		{
			href: 'https://github.com/absolutejs/autoscaler',
			label: 'GitHub'
		},
		{
			href: 'https://www.npmjs.com/package/@absolutejs/autoscaler',
			label: 'npm'
		}
	],
	name: 'Autoscaler',
	notes: [
		{
			body: 'This package owns the decision half of an autoscaler. The actuator half — actually provisioning a VM, draining a pod, killing a process — is the callback set you inject, so nothing here is tied to a specific cloud.',
			title: 'Decisions, not provisioning',
			variant: 'info'
		},
		{
			body: 'The package is pre-1.0. The policy and signal shapes are settling, but expect minor API adjustments before a stable release.',
			title: 'Beta',
			variant: 'warning'
		}
	],
	npmName: '@absolutejs/autoscaler',
	samples: [
		{
			code: `\
import {
  createAutoscaler,
  createPolicy,
  ratioSignal,
} from '@absolutejs/autoscaler';

const scaler = createAutoscaler({
  policy: createPolicy({
    min: 1,
    max: 20,
    scaleUp:   { threshold: 0.75, cooldownMs: 60_000, step: 1 },
    scaleDown: { threshold: 0.30, cooldownMs: 300_000, step: 1 },
  }),
  signals: [
    ratioSignal('cpu',   0.80, async () => await meter.cpuUtilization()),
    ratioSignal('queue', 100,  async () => await queue.depth(),
                               { observedKey: 'depth' }),
    ratioSignal('latencyP95', 200, async () => await metrics.p95()),
  ],
  combine: 'max', // worst pressure wins. or 'avg', or a custom fn
  actuator: {
    list:      () => fleet.list(),
    spawn:     () => fleet.provision(),
    drain:     (id) => loadBalancer.remove(id),
    terminate: (id) => fleet.destroy(id),
  },
  intervalMs: 30_000,
});

scaler.start();
// evaluates signals and applies a decision every 30s`,
			description:
				'Wire signals, a policy, and your actuator into a running loop. The actuator callbacks define what an instance is — here a VM fleet behind a load balancer.',
			heading: 'Quick Start',
			language: 'typescript'
		},
		{
			code: `\
const decision = await scaler.step();
// {
//   action: 'scale-up' | 'scale-down' | 'hold',
//   score, currentCount, desiredCount,
//   reason, readings: [...], at
// }`,
			description:
				'Call step() for a single evaluation instead of the interval loop — useful for cron-driven scaling or testing a policy against live signals.',
			heading: 'One-Shot Decisions',
			language: 'typescript'
		}
	],
	status: 'beta',
	tagline:
		'Policy-driven horizontal autoscaling loop for Bun fleets — pluggable signals, declarative thresholds, and an actuator you supply.',
	version: '0.1.0'
};
