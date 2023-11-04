import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/prisma/PrismaClient'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcrypt'
import { NextAuthOptions } from 'next-auth'

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        name: {
          label: "Nom d'utilisateur",
          type: 'text',
          placeholder: "Nom d'utilisateur",
        },
        password: {
          label: 'Mot de passe',
          type: 'password',
          placeholder: 'Mot de passe',
        },
      },

      async authorize(credentials: any) {
        // check to see if name and password is there
        if (!credentials.name || !credentials.password) {
          return null
        }

        // check to see if user exists
        const user = await prisma.user.findUnique({
          where: {
            name: credentials.name.toLowerCase().replace(/[^a-z0-9]/gi, ''),
          },
        })
        // if no user was found
        if (!user) {
          return null
        }

        // check to see if password matches
        const passwordMatch = bcrypt.compare(
          credentials.password,
          user.password
        )

        // if password does not match
        return (await passwordMatch) ? user : null
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async session({ session, token }) {
      const currentUser = await prisma.user.findUnique({
        where: { id: token.sub },
      })
      if (currentUser) {
        session.user.role = currentUser.role
        console.log(session.user.role)
        return session
      }

      return session
    },
  },

  debug: process.env.NODE_ENV === 'development',
}

export default authOptions
