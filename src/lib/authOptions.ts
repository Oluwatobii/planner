import { NextAuthOptions } from 'next-auth'

import GithubProvider from 'next-auth/providers/github'

import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Save Users to Database
      // console.log({ user, account, profile, email, credentials })
      return true
    }
  },
  secret: process.env.NEXTAUTH_SECRET
}
