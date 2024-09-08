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
DATABASE_URL=""
PORT=
NODE_ENV=""

NEXTAUTH_SECRET=""
NEXTAUTH_URL=""

DOMAIN="planner.tbello.dev"

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

APPLICATION_NAME="Planner"
MAIL_CREDENTIALS_USER=""
MAIL_CREDENTIALS_PASSWORD=""
MAIL_DISABLED=""
```

4. Set up the database:

```
npx prisma migrate dev --name init
```

5. Run the development server:

```
npm run dev
```

## Prisma

### Setting up Prisma

1. Install Prisma and Prisma Client

```bash
npm install prisma --save-dev

npm install @prisma/client
```

2. Initialize prisma

```bash
npx prisma init
```

3. Update Database Schema

When initially developing, it's safe to use

```bash

npx prisma db push

```

Since it hasnt been in any production enviroment yet.

However, once deployed and changes needs to be made to the schema it's recommended to follow this workflow

- Local Development:

1. Modify Your Prisma Schema:

- Make changes to your `schema.prisma` file.

2. Apply Changes Locally:

- If the changes affect the database structure, run:

  ```bash
  npx prisma migrate dev
  ```

- If the changes only affect the Prisma Client (not the database), run:

  ```bash
  npx prisma generate
  ```

- Production Deployment:

1. Prepare Your Migration Files:

- During development, after running `prisma migrate dev`, commit the migration files generated in the `prisma/migrations` directory to your version control.

2. Deploy to Production:

- After deploying your code to the production environment, apply the migrations to the production database with:

  ```bash
  npx prisma migrate deploy
  ```

- Key Points:
  - `prisma migrate dev` is the main command you’ll use during local development for creating migrations and applying changes.
  - `prisma migrate deploy` is what you use in production to safely apply migrations.
  - `prisma generate` is used to regenerate the Prisma Client when you make schema changes that don’t require database alterations.

### Using Prisma Studio

```bash
npx prisma studio
```
