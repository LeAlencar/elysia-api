import { Elysia, t } from 'elysia'

const app = new Elysia()
  .get('/', () => 'Hello Elysia')
  .get('/id/:id', ({ params: { id } }) => id, {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)

export type App = typeof app
