# Restaurant App

A restaurant app with unit tests and CI/CD workflow. Developed using the most recent [Next.js 13](https://nextjs.org/) features, such as the app directory and server actions. Deployed on [Vercel](https://restaurant-app-pied.vercel.app/).

## Features:

- Shopping cart
- Create an order
- Delete created order
- View created orders

## Tech stack used:

- [Next.js 13](https://nextjs.org/), [Prisma](https://www.prisma.io/), [DaisyUI](https://daisyui.com/), [React Hook Form](https://react-hook-form.com/)
- [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/)

## Getting Started

Replace DB_PRISMA_URL variable with your own PostgreSQL database url in the .env.local file:

```
DB_PRISMA_URL="postgresql://"
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
