import { PackageDocData } from '../../../../types/packageDocs';

export const renownPackageData: PackageDocData = {
	category: 'Dev Tools',
	description:
		'A gamified, quantified-self layer for programming: XP is earned by the craft and importance of your work — never by commit count — with thousands of achievements, deep activity recaps and competitive per-project leaderboards. It is editor- and agent-agnostic: a filesystem watcher tracks activity in any editor with zero plugins, and coding agents like Claude Code, Codex, Cursor and Copilot are first-class participants. The CLI talks to the hosted leaderboard at renown.absolutejs.com out of the box, and a GitHub Action can score every contributor on each push.',
	features: [
		{
			description:
				'A craft engine scores each commit by substance — generated files, lockfiles, minified code and reformats score near zero — with bonuses for tests, docs and new code, and penalties for junk or grinding.',
			title: 'Craft-based XP'
		},
		{
			description:
				'Only commits you authored count, and a project-importance multiplier weighs open source, GitHub stars (log scale) and contributions to repos that are not your own.',
			title: 'Not cheese-able'
		},
		{
			description:
				'An editor-agnostic daemon watches your git repos and emits activity heartbeats with zero editor plugins — it works in VS Code, Neovim, JetBrains, anything.',
			title: 'Works in any editor'
		},
		{
			description:
				'renown link verifies your GitHub account, and public boards rank server-recomputed, GitHub-verified XP — no board ranks purely self-reported data.',
			title: 'Verified leaderboards'
		},
		{
			description:
				'A catalog of 10,000 achievements with global rarity percentages, skills, quests and collectible pets, browsable from the renown TUI.',
			title: '10k achievements'
		},
		{
			description:
				'Drop the absolutejs/renown@v1 Action into any repo and every push refreshes contributors’ renown and the repo’s own project leaderboard — no secrets in the workflow, and the step never fails your build.',
			title: 'GitHub Action sync'
		}
	],
	installCommand: 'bun add -g @absolutejs/renown',
	links: [
		{
			href: 'https://www.npmjs.com/package/@absolutejs/renown',
			label: 'npm'
		},
		{
			href: 'https://renown.absolutejs.com',
			label: 'Live leaderboard'
		}
	],
	name: 'Renown',
	notes: [
		{
			body: 'The CLI points at the hosted leaderboard by default — no config needed. Self-hosters set RENOWN_ENDPOINT (or pass with: { endpoint } to the Action) to target their own server.',
			title: 'Hosted by default',
			variant: 'info'
		},
		{
			body: 'The companion renown-vscode extension (v0.1.0) brings renown into the editor: a live status-bar HUD with your score and this-week delta, activity-driven sync that asks the server to recompute from your real GitHub commits, and a sidebar panel with your pet roster and the repo’s leaderboard. It is a pure client — editing only triggers a refresh, never sets your score.',
			title: 'VS Code extension',
			variant: 'info'
		}
	],
	npmName: '@absolutejs/renown',
	samples: [
		{
			code: `bun add -g @absolutejs/renown   # or: npm install -g @absolutejs/renown
renown link                     # link your GitHub account -> verified score
renown                          # open the TUI: skills, quests, pets, leaderboard

# wire it into your editor so XP accrues as you work
renown install-agent all        # Claude Code / Codex hooks + tmux HUD`,
			description:
				'Install the CLI, link your GitHub account and open the TUI. The hosted leaderboard works with no config.',
			heading: 'Quick Start',
			language: 'bash'
		},
		{
			code: `# .github/workflows/renown.yml
name: Renown
on: [push]
jobs:
  renown:
    runs-on: ubuntu-latest
    steps:
      - uses: absolutejs/renown@v1   # hosted leaderboard by default

# prefer no extra action? the CLI does the same:
#   - run: npx -y @absolutejs/renown ci-sync`,
			description:
				'The Action reads GitHub’s own event context and recomputes each linked contributor server-side — no manual sync and no secrets in the workflow.',
			heading: 'Score Every Push from CI',
			language: 'text'
		}
	],
	status: 'beta',
	tagline:
		'Earn XP and achievements for real, meritorious dev work in any editor, with per-project leaderboards.',
	version: '0.3.2'
};
