# WAECMock

A clean, responsive mock exam app for practising WAEC/JAMB-style multiple-choice questions. Pick a subject, answer one question per page, and get an instant explanation whenever you choose the wrong answer.

> **Status:** Front-end only. Auth and questions are currently stored locally. A backend is planned.

## Features

- **8 subjects, 20 questions each:** Mathematics, English, Physics, Chemistry, Biology, Geography, Agriculture, Economics
- **Sample questions on the home page**, switchable by subject
- **One question per page** with Next and Back buttons and a progress bar
- **Instant feedback:** correct and wrong answers are highlighted, and an explanation shows when you pick wrong
- **Answers lock once picked**, like a real exam
- **Guest limits:**
  - Online guests can answer up to **10** questions
  - Offline guests can answer up to **2** questions
  - After the limit, a prompt sends them to log in or sign up
- **Auth pages:** login (email + password) and signup (email + password + username)
- **Results page** with a score and a full review of the questions answered
- **Fully responsive**, with a mobile-first layout

## Tech Stack

| Purpose    | Tool                                |
| ---------- | ----------------------------------- |
| Framework  | React 19 + TypeScript               |
| Build tool | Vite                                |
| Styling    | Tailwind CSS v4                     |
| State      | Zustand (with `persist` middleware) |
| Routing    | React Router                        |

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm, pnpm or yarn

### Install and run

```bash
# install dependencies
npm install

# start the dev server
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### Other scripts

```bash
npm run build     # type-check and build for production
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

## Project Structure

```
src/
├─ components/
│  ├─ Layout.tsx          # navbar, footer, page outlet
│  ├─ QuestionCard.tsx    # question, options, feedback, explanation
│  └─ AuthForm.tsx        # shared login/signup form
├─ data/
│  ├─ helpers.ts          # build() helper for compact question rows
│  ├─ questions.ts        # subjects list + merged question bank
│  ├─ math.ts             # one file per subject (20 questions each)
│  ├─ english.ts
│  ├─ physics.ts
│  ├─ chemistry.ts
│  ├─ biology.ts
│  ├─ geography.ts
│  ├─ agriculture.ts
│  └─ economics.ts
├─ hooks/
│  └─ useOnline.ts        # online/offline detection
├─ pages/
│  ├─ Home.tsx
│  ├─ Exam.tsx
│  ├─ Results.tsx
│  ├─ Login.tsx
│  └─ Signup.tsx
├─ store/
│  ├─ authStore.ts        # localStorage-based auth (temporary)
│  └─ examStore.ts        # current exam state
├─ config.ts              # guest question limits
├─ types.ts
├─ App.tsx
├─ main.tsx
└─ index.css
```

## Configuration

Guest limits live in `src/config.ts`:

```ts
export const FREE_LIMIT = 10; // guest limit when online
export const OFFLINE_LIMIT = 2; // guest limit when offline
```

To test the gate quickly, set `FREE_LIMIT` to a small number such as `3`.

To test offline mode, open DevTools, go to **Network**, set throttling to **Offline**, and start an exam as a guest.

## Adding Questions

Each subject is a file in `src/data/`. Every question is one row:

```ts
[question, [optionA, optionB, optionC, optionD], correctIndex, explanation];
```

`correctIndex` is the **0-based** position of the right option (`0` = A, `1` = B, `2` = C, `3` = D).

```ts
['What is the SI unit of force?', ['Joule', 'Watt', 'Newton', 'Pascal'], 2, 'Force = mass × acceleration, measured in newtons (N).'],
```

### Adding a new subject

1. Create `src/data/yoursubject.ts`:

   ```ts
   import { build } from "./helpers";

   export const yoursubject = build("yoursubject", "ys", [
     // rows here
   ]);
   ```

   The second argument is the ID prefix. Keep it unique across subjects (for example, `ec` for economics so it doesn't clash with `e` for English).

2. Register it in `src/data/questions.ts`:

   ```ts
   import { yoursubject } from "./yoursubject";

   export const subjects: Subject[] = [
     // ...existing subjects
     { id: "yoursubject", name: "Your Subject", emoji: "📚" },
   ];

   export const questions = [
     // ...existing spreads
     ...yoursubject,
   ];
   ```

## How It Works

- **Exam flow:** `Home` → `Exam` (one question per page) → `Results`
- **Auth gate:** when a guest reaches their limit, a modal offers Log in, Create account, or Finish and see results. After authenticating, they return to the same exam.
- **Scoring:** guests are scored only on the questions they reached. Logged-in users are scored on the full set.
- **Auth (temporary):** accounts are stored in `localStorage` under `waec_users`, and the session is persisted under `auth`. Passwords are SHA-256 hashed with the email as salt.

## Important Notes

- **Local auth is for development only.** It is not secure, because anyone can read or edit `localStorage`. Do not use it in production.
- Opening the app with no connection at all needs a service worker. Questions are already bundled in the JS, so adding a PWA setup (for example `vite-plugin-pwa`) would make it fully offline-capable.
- Review the question answers and explanations against your own syllabus and marking scheme before using them for real students.

## Roadmap

- [ ] Backend API for auth and questions (replace `login` and `signup` in `authStore.ts`, and the question source in `examStore.ts`)
- [ ] Countdown timer for timed mock exams
- [ ] Question navigator grid to jump between questions
- [ ] Randomised question order and shuffled options
- [ ] Score history and progress tracking per user
- [ ] PWA support for full offline use
- [ ] Multi-subject mock exams (JAMB-style, 4 subjects)

## Backend Migration Checklist

When the backend is ready, only a few places need to change:

| File                 | Change                                                                                                                             |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `store/authStore.ts` | Replace `login` and `signup` bodies with API calls. Keep the `Promise<string \| null>` return type so `AuthForm` needs no changes. |
| `store/examStore.ts` | Replace the `allQuestions.filter(...)` in `start()` with a fetch.                                                                  |
| `pages/Results.tsx`  | Optionally post results to the API.                                                                                                |

## License

Add your license here (for example MIT).
