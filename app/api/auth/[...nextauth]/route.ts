import NextAuth from 'next-auth/next'
import prisma from '@/prisma/PrismaClient'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import { AuthOptions } from 'next-auth'
import bcrypt from 'bcrypt'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        name: {
          label: 'Username',
          type: 'text',
          placeholder: 'John Smith',
        },

        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        // check to see if email and password is there
        if (!credentials.name || !credentials.password) {
          return null
        }

        // check to see if user exists
        const user = await prisma.user.findUnique({
          where: {
            name: credentials.name,
          },
        })
        // if no user was found
        if (!user) {
          return null
        }

        // check to see if password matches
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        )

        // if password does not match

        return passwordMatch ? user : null
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },

  /*---------------------------------------------------------------------------
  callbacks: {
    async jwt({ token, user }) {
      // Step 1: update the token based on the user object

      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Step 2: update the session.user based on the token object
      console.log({ session, token });
      if (token && session.user) {
        session.user.role = token.role;
        console.log("callback session --------------", session);
      }
      return session;
    },
  },
  -------------------------------------------------------------------*/

  debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
