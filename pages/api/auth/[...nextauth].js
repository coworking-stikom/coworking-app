import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import users from '../../../helper/users'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    Providers.Credentials({
      authorize: async (body) => {
        try {
          const user = await users.signin(body)
          return {
            email: user.email,
            image: user.avatarUrl,
            name: user.fullName
          }
        } catch (error) {
          throw new Error(error.message)
        }
      }
    })
  ],
  callbacks: {
    session: async (session, user) => {
      session.id = user.id
      return Promise.resolve(session)
    }
  }
})
