import cookie from '@elysiajs/cookie'
import jwt from '@elysiajs/jwt'
import { Elysia, t, type Static } from 'elysia'
import { env } from '../env'

const jwtPayload = t.Object({
  sub: t.String(),
  restaurantId: t.Optional(t.String()),
})

export const auth = new Elysia()
  .use(
    jwt({
      secret: env.JWT_SECRET,
      schema: jwtPayload,
    }),
  )
  .use(cookie())
  .derive(({ jwt, setCookie, removeCookie, cookie }) => {
    return {
      signUser: async (payload: Static<typeof jwtPayload>) => {
        const token = await jwt.sign(payload)

        setCookie('auth-elysia', token, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/',
        })
      },
      signOutUser: () => {
        removeCookie('auth-elysia')
      },
      getCurrentUser: async () => {
        const payload = await jwt.verify(cookie['auth-elysia'])

        if (!payload) {
          throw new Error('Unauthorized')
        }

        return {
          userId: payload.sub,
          restaurantId: payload.restaurantId,
        }
      },
    }
  })
