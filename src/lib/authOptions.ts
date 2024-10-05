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
        } else {
          await prisma.account.create({
            data: {
              email: user.email,
              username: user.name,
              lastLogin: new Date(),
              additionalData: {},
              googleId: account?.provider === 'google' ? user.id : null,
              githubId: account?.provider === 'github' ? user.id : null
            }
          })
        }

        return true
      } catch (err) {
        console.error('Error creating or updating user:', err)
        return false
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET
}
