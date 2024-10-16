import { NextAuthOptions } from 'next-auth'

import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/db'

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
    async signIn({ user, account }) {
      if (!user.email || !user.name) return false

      try {
        const exist = await prisma.account.findUnique({
          where: {
            email: user.email
          }
        })

        let userId

        if (exist) {
          const updateData: Prisma.AccountUpdateInput = {
            lastLogin: new Date()
          }

          if (!exist.googleId && account?.provider === 'google') updateData.googleId = user.id

          if (!exist.githubId && account?.provider === 'github') updateData.githubId = user.id

          if (Object.keys(updateData).length > 1) {
            await prisma.account.update({
              where: { id: exist.id },
              data: updateData
            })
          }

          userId = exist.id
        } else {
          const newUser = await prisma.account.create({
            data: {
              email: user.email,
              username: user.name,
              lastLogin: new Date(),
              additionalData: {},
              googleId: account?.provider === 'google' ? user.id : null,
              githubId: account?.provider === 'github' ? user.id : null
            }
          })

          userId = newUser.id
        }
        user.id = userId
        return true
      } catch (err) {
        console.error('Error creating or updating user:', err)
        return false
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET
}

/**
type AuthorizationResult = { authorize: boolean }

const otbiAuthorized = async ({ email }: { email: string }): Promise<AuthorizationResult> => {
  if (!config.otbi?.api || !config.otbi?.apiKey || !config.otbi?.origin) return { authorize: true }

  const { api, apiKey, origin } = config.otbi
  const URL = `${api}/api/authorized/emails/${apiKey}`

  const headers = new Headers({
    'Content-Type': 'application/json',
    Origin: origin || ''
  })

  try {
    const response = await fetch(URL, { headers })

    const data: { emails?: string[] } = (await response.json()) as { emails?: string[] }
    const { emails = [] } = data

    if (emails && emails.length && !emails.includes(email)) return { authorize: false }
    else return { authorize: true }
  } catch (error) {
    console.error(`Error during authorization check`)
    return { authorize: true }
  }
}

const { authorize } = await otbiAuthorized({ email: profile.email })

if (!authorize) return cb(null, false)
 */
