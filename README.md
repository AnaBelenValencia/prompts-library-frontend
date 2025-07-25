# Prompt Library – Frontend

This is the **frontend application** for the Prompt Library project, built with:

- [Next.js](https://nextjs.org/) + React
- [shadcn/ui](https://ui.shadcn.dev/)
- Tailwind CSS with custom green-themed design
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- TypeScript, fully typed

---

## Getting Started

### Install dependencies

```bash
npm install
npm run dev
```
The app will run at http://localhost:3000


## Project structure

frontend/
├── app/                  # Next.js app directory
│   ├── page.tsx          # Main prompt listing page
│   └── layout.tsx        # Root layout with global styles and Toaster
│
├── components/           # Reusable UI components
│   ├── PromptCard.tsx
│   ├── PromptModal.tsx
│   ├── PromptDetailModal.tsx
│   └── ui/               # shadcn/ui components
│
├── lib/
│   └── utils.ts          # cn() utility for class merging and contants
│
├── public/               # Static assets (if needed)
│
├── styles/
│   └── globals.css       # Tailwind + custom theming
│
├── tsconfig.json         # TypeScript config
└── tailwind.config.ts    # Tailwind + shadcn config

## Environment
Node.js ≥ 18.x
Tailwind CSS ≥ 3.x
Next.js ≥ 13 (App Router)
shadcn/ui installed and configured