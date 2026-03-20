# Lovable Handoff

## Project Summary

This repository is a news platform with three parts:

- `frontend`: public news website built with Vite + React + TypeScript + Tailwind
- `backend`: Express + TypeScript API
- `admin`: separate admin dashboard

For now, the main focus should be the `frontend` app.

## Frontend Stack

- Vite
- React 18
- TypeScript
- Tailwind CSS
- Radix UI / shadcn-style components
- React Router
- TanStack Query

Important frontend files:

- `frontend/src/App.tsx`
- `frontend/src/components/news/PhotoCardStudio.tsx`
- `frontend/src/components/news/PhotocardDownload.tsx`
- `frontend/src/services/apiService.ts`
- `frontend/src/config/api.ts`
- `frontend/vite.config.ts`

## Current Deployment Setup

Vercel is configured at the repo root to deploy the frontend only.

Root `vercel.json`:

- install command: `npm install --prefix frontend`
- build command: `npm run build --prefix frontend`
- output directory: `frontend/dist`

## API / Environment Notes

- Frontend API base comes from `VITE_API_URL`
- Fallback API base is `http://localhost:5000`
- Frontend Vite config uses `envDir: '..'`, so env handling assumes the repo root

## Current Status

The frontend build is passing.

Verified with:

```bash
npm run build --prefix frontend
```

## Latest Completed Work

The photocard editor was updated in `frontend/src/components/news/PhotoCardStudio.tsx` with:

- orientation-based social format selection
- format presets for Instagram portrait, Instagram story, Instagram square, Facebook square, YouTube thumbnail, and wide banner
- dynamic preview and export size based on the selected medium
- clearer editing sections:
  - Story Selector
  - Publish Medium
  - Content
  - Image Framing
  - Headline Layout
  - Footer and Branding
- preview moved later in the layout flow
- guide toggle moved closer to the preview

## What Should Be Preserved

- Keep this as a Vite React app, not a Next.js rewrite
- Preserve the existing route structure in `frontend/src/App.tsx`
- Preserve Tailwind and current component patterns
- Do not break the current Vercel frontend deployment
- Keep the photocard page route as `/photocard`
- Keep API calls compatible with the existing backend structure

## Good Starting Scope For Lovable

Ask Lovable to continue only on the frontend first.

Suggested areas:

1. Improve photocard UX and polish without rewriting the whole app
2. Clean up component structure in the news pages
3. Improve responsive behavior
4. Improve visual consistency while preserving the current content model
5. Add missing loading, empty, and error states where needed

## Prompt To Paste Into Lovable

```text
I have an existing Vite + React + TypeScript news website project. Please continue development on the frontend only and preserve the current stack and route structure.

Project context:
- Public frontend is in the `frontend` folder
- It uses Vite, React Router, Tailwind CSS, TypeScript, and shadcn-style components
- Do not convert this project to Next.js
- Keep the current route structure from `frontend/src/App.tsx`
- Keep API integration compatible with the existing backend
- The frontend deploys on Vercel from the repo root using:
  - install: npm install --prefix frontend
  - build: npm run build --prefix frontend
  - output: frontend/dist

Important files:
- frontend/src/App.tsx
- frontend/src/components/news/PhotoCardStudio.tsx
- frontend/src/components/news/PhotocardDownload.tsx
- frontend/src/services/apiService.ts
- frontend/src/config/api.ts
- frontend/vite.config.ts

Recent completed work:
- The photocard editor now supports multiple social media sizes and orientations
- Available formats include Instagram portrait, Instagram story, Instagram square, Facebook square, YouTube thumbnail, and wide banner
- Preview and export should follow the selected format
- The photocard editor controls are grouped into sections:
  - Story Selector
  - Publish Medium
  - Content
  - Image Framing
  - Headline Layout
  - Footer and Branding

What I want next:
- Continue improving the frontend in the same style
- Keep the code clean and modular
- Preserve current functionality
- Make responsive UX better
- Do not break the Vercel deployment setup

Please first inspect the current frontend structure, summarize what you understand, and then propose a safe step-by-step improvement plan before making changes.
```

## Recommended Way To Use Lovable

1. Start with the `frontend` folder and the files listed above.
2. Give Lovable the prompt from this file.
3. Ask it to make one focused change at a time.
4. After each change, have it re-run the frontend build.
5. Keep backend and admin changes separate unless absolutely needed.

## If Lovable Gets Confused

Tell it this directly:

```text
Do not rebuild this project from scratch. Work inside the existing frontend codebase and preserve the current routes, Tailwind setup, Vite setup, and API integration.
```
