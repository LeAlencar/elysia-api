import { Elysia } from 'elysia'
import { registerRestaurant } from './routes/register-restaurant'
import { sendAuthLink } from './routes/send-auth-link'
import { authenticateFromLink } from './routes/authenticate-from-link'
import { signOut } from './routes/sign-out'

const app = new Elysia()
  .use(registerRestaurant)
  .use(sendAuthLink)
  .use(authenticateFromLink)
  .use(signOut)

app.listen(3000, () => {
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
  )
})

export type App = typeof app
