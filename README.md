This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Clear Architecture principles

```bash
src/
├── app/                     # Next.js App Router entrypoints
│   ├── (auth)/              # Auth routes (login, register)
│   ├── dashboard/           # Protected route (admin UI)
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Entry/home
│
├── presentation/            # UI layer (components/pages/hooks)
│   ├── components/          # Reusable UI components (Button, Table, etc.)
│   ├── layouts/             # UI layout components (Sidebar, Header, etc.)
│   ├── hooks/               # UI-related hooks
│   └── pages/               # View logic (mapped to routes)
│
├── application/             # Application layer (use-cases, services)
│   ├── use-cases/           # Business use-cases
│   └── services/            # Interfaces for API/data services
│
├── domain/                  # Domain layer (entities, types)
│   ├── entities/            # Business models (User, Product)
│   └── stores/              # Store using Zustand
│
├── infrastructure/          # Infrastructure (APIs, databases)
│   ├── graphql/             # Graphql API call logic (e.g. Axios)
│   └── websocket/           # Websocket
│
├── common/                  # Common (configs, constants, interfaces, theme, utils, languages)
│   ├── configs/             # configs
│   ├── interfaces/          # interfaces
│   ├── theme/               # theme
│   ├── utils/               # utils
│   ├── languages/           # languages
│   └── constants/           # constants
│
└── styles/                  # Global CSS/styling

```

🧠 Example: Login Flow

UI: presentation/pages/LoginPage.tsx

Use-case: application/use-cases/auth/LoginUseCase.ts

Service: application/services/AuthService.ts

Infra: infrastructure/graphql/client.graphql

Model: domain/entities/User.ts
