# Planner

Planner is a sleek and intuitive scheduling app built with Next.js that allows users to effortlessly plan, manage, and view their events in a calendar format. Whether organizing daily tasks or coordinating important events, Planner ensures you stay on top of your schedule with ease.

## Features

- **Next.js**: Fast, scalable, and modern React framework.
- **TypeScript**: Strongly typed programming to catch errors early and improve code quality.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Prisma ORM**: Elegant and powerful database toolkit for PostgreSQL.
- **Auth.js (NextAuth)**: Authentication via Google or GitHub.
- **Zod**: TypeScript-first schema declaration and validation library.
- **TUI Calendar**: Feature-rich calendar component for scheduling events.

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Oluwatobii/planner.git
   cd planner
   ```

2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables:

Create a .env file in the root directory with the following variables:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
NEXTAUTH_URL=http://localhost:8030
NEXTAUTH_SECRET=your-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

4. Set up the database:

```
npx prisma migrate dev --name init
```

5. Run the development server:

```
npm run dev
```
