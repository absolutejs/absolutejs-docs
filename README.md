# AbsoluteJS Documentation

The source for [absolutejs.com](https://absolutejs.com), including framework guides, package references, ecosystem discovery, examples, and the AbsoluteJS blog.

## Local development

```sh
bun install
bun run dev
```

## Ecosystem catalog

The package catalog is generated from every public workspace repository under `~/abs`; private hosted-platform source is deliberately excluded. Run:

```sh
bun run catalog:generate
bun run check:docs
```

The generator reads package manifests, README sections, examples, commands, public exports, monorepo contents, versions, and repository links. Generated project and subpackage pages are registered as real documentation routes and included in sitemap generation.

## Validation

```sh
bun run check:docs
bun run typecheck
bunx absolute build
```

`check:docs` prevents undocumented projects or subpackages, non-searchable package entry points, private platform exposure, and regressions to historical package names.

## Architecture

- `scripts/generateEcosystemCatalog.ts` derives documentation data from the workspace.
- `src/frontend/data/documentation/packages` contains generated and curated package data.
- `src/frontend/components/documentation` contains framework guides and package views.
- `src/frontend/data/sidebarData.ts` is the authoritative route registry.
- `absolute.config.ts` projects that registry into the automatically generated sitemap.
