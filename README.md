# Let's Go TS — Master TypeScript from JavaScript

💙 An interactive TypeScript tutorial site for JavaScript developers, modeled after [letsgogo](https://github.com/cjrutherford/letsgogo).

## Features

- **Interactive code playground** powered by Monaco Editor
- **Real TypeScript execution** via a Node.js/tsx backend server
- **11 modules, 34 lessons, 30+ challenges** covering the full TypeScript journey
- **Progress tracking** with localStorage (no account required)
- **PWA support** for offline access
- **TypeScript blue theme** (#3178c6)
- **React 19 + Vite + TailwindCSS v4** frontend

## Curriculum

| # | Module | Lessons |
|---|--------|---------|
| 1 | TypeScript Basics | 5 |
| 2 | JavaScript → TypeScript | 3 |
| 3 | Type System | 3 |
| 4 | Advanced Types | 3 |
| 5 | Async TypeScript | 3 |
| 6 | Modules & Packages | 3 |
| 7 | Testing | 3 |
| 8 | Frontend (React) | 3 |
| 9 | Backend (Node.js) | 3 |
| 10 | Popular Packages | 3 |
| 11 | Polish & Deploy | 3 |

## Getting Started

### Prerequisites

- Node.js 20+
- npm 9+

### Install

```bash
npm install
```

### Development

Run both the frontend and the TypeScript execution server:

```bash
# Terminal 1 — Frontend (Vite dev server)
npm run dev

# Terminal 2 — Backend (TypeScript runner on :3001)
npm run server
```

Or use the start script:

```bash
./start.sh
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

### Docker

```bash
docker build -t lets-go-ts .
docker run -p 80:80 lets-go-ts
```

## Architecture

```
letsgots/
├── src/
│   ├── components/
│   │   ├── Layout.tsx          # Sidebar navigation layout
│   │   ├── LessonView.tsx      # Lesson + ModuleView components
│   │   ├── ChallengeCard.tsx   # Coding challenge with playground
│   │   ├── CodePlayground.tsx  # Monaco editor + run button
│   │   ├── SyntaxHighlight.tsx # react-syntax-highlighter wrapper
│   │   └── PWAInstallPrompt.tsx
│   ├── pages/
│   │   ├── Landing.tsx         # Marketing landing page
│   │   ├── Login.tsx           # Auth (localStorage-based)
│   │   └── Home.tsx            # Dashboard with module list
│   ├── lib/
│   │   ├── auth.tsx            # Auth context
│   │   ├── progress.tsx        # Progress tracking context
│   │   ├── content.ts          # Module/lesson registry + markdown imports
│   │   ├── challenges.ts       # 30+ TypeScript coding challenges
│   │   ├── tsRunner.ts         # Client-side fetch to execution server
│   │   └── db.ts               # Optional Turso/LibSQL cloud sync
│   └── content/modules/        # Markdown lesson files
│       ├── basics/
│       ├── javascript-to-typescript/
│       ├── type-system/
│       ├── advanced-types/
│       ├── async/
│       ├── modules/
│       ├── testing/
│       ├── frontend/
│       ├── backend/
│       ├── packages/
│       └── polish/
├── server/
│   └── run.ts                  # Express server — runs TS code via tsx
└── ...config files
```

## Environment Variables

Copy `.env.example` to `.env`:

```env
# Optional: Turso/LibSQL for cloud progress sync
VITE_TURSO_DATABASE_URL=
VITE_TURSO_AUTH_TOKEN=
```

Leave empty to use localStorage only.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, TailwindCSS v4
- **Editor**: Monaco Editor (`@monaco-editor/react`)
- **Backend**: Express 5, tsx
- **Markdown**: react-markdown + remark-gfm
- **Highlighting**: react-syntax-highlighter
- **PWA**: vite-plugin-pwa
- **Optional DB**: Turso/LibSQL

## License

MIT