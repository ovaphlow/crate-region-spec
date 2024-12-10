import 'jsr:@std/dotenv/load'
import { Context, Hono } from 'hono'
import exportRoute from './router/export.ts'

const app = new Hono()

app.get('/', (c: Context) => {
	return c.text('Hello Hono!')
})

const uriPrefix = '/crate-region-spec-api'

app.route(uriPrefix + '/export', exportRoute)

const port = Number(Deno.env.get('PORT')) || 8423
Deno.serve({ port }, app.fetch)
