# Admin Console

Minnt admin console — a [Next.js](https://nextjs.org) 16 app (App Router) with TypeScript, Tailwind CSS v4, and [shadcn/ui](https://ui.shadcn.com) (new-york style) configured.

## Getting started

Install dependencies and run the dev server:

```bash
pnpm install
pnpm dev
```

The app runs on [http://localhost:4086](http://localhost:4086).

## Scripts

| Script        | Description                          |
| ------------- | ------------------------------------ |
| `pnpm dev`    | Start the dev server (port 4086)     |
| `pnpm build`  | Production build                     |
| `pnpm start`  | Serve the production build           |
| `pnpm lint`   | Run ESLint                           |

## Environment

Copy `.env.example` to `.env` and fill in the values.

## Adding UI components

shadcn/ui is preconfigured (`components.json`, `src/components/ui`, `@/lib/utils`). Add components with:

```bash
pnpm dlx shadcn@latest add button
```

## Structure

```
src/
  app/            # App Router routes, layout, globals.css
  components/ui/  # shadcn/ui components
  lib/            # utils (cn helper, etc.)
```
