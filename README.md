# Moody

<img src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"> &nbsp; <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white"> &nbsp; <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"> &nbsp; <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"> &nbsp; <img src="https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white"> &nbsp; <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"> &nbsp; <img src="https://img.shields.io/badge/daisyUI-1ad1a5?style=for-the-badge&logo=daisyui&logoColor=white"> &nbsp; <img src="https://img.shields.io/badge/Font_Awesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white">

Moody is a simple Mood Tracking app! Keep track of timestamped mood entries, and associated feelings, influences, and notes.

**Demo:** https://moody-me.vercel.app/

## Features

- NextAuth with Google
- Track mood, influences, feelings, and journal entries
- View historical entries
- Delete mood entries

## Development

### Local Environment

**Connect Github Repo to Vercel:**

- Push the code to a Github Repo
- Create a new Vercel project and connect to the Github repo

**Install Dependencies:**

```bash
npm install
```

**Setup Vercel PostGres SQL Database:**

1. In the Storage tab, create a new db
2. Run `npm i -g vercel@latest` to install the Vercel CLI
3. Pull down the environment variables:

```bash
vercel env pull .env
```

**Create the database tables:**

```bash
npx prisma db push
```

**Generate the Prisma client:**

```bash
npx prisma generate
```

**Seed the database:**

```bash
npm run prisma:seed
```

**Run Prisma Studio:**

```bash
npx prisma studio
```

> View on `http://localhost:5555/`

**Setup Authentication:**

1. Go to https://console.cloud.google.com/
2. Click **APIs & Services**
3. Create a new project
4. Go to **Credentials** > **Create Credentials** > **Oauth Client Id**
5. Under **Authorized Callback URIs**, add your local environment: http://localhost:3000/api/auth/callback/google
6. Add your production domain in the same format

**Update `.env` variables:**
The Vercel PostgresSQL db variables should have already been synced. Ensure you have a `.env.local` file with your local variables. Your `.env` will store production variables.

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `NEXTAUTH_URL` = `"http://localhost:3000"`
- `SECRET` = _Generate random string_

**Start Development Server:**

```bash
npm run dev
```

> View on `http://localhost:3000/`

### Deployment

#### Configuration

- Ensure your production domain is set in Google Oauth Authorized Callback URIs - https://your-domain.com/api/auth/callback/google
- Ensure your production domain is set as the `NEXTAUTH_URL` in `.env`
- You can utilize the same `CLIENT_ID` and `CLIENT_SECRET`

#### Vercel

_Your PostgresSQL variables should already be setup in Vercel._

1. In Vercel, go to Settings > Environment Variables
2. Add the variables you added to `.env` above
