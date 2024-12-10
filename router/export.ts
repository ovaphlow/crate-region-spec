import { Context, Hono } from 'hono'

const app = new Hono()
	.post('/excel', exportExcel)

export default app

export async function exportExcel(c: Context) {
	const {columns, data} = await c.req.json()
	console.info(columns, 'columns')
	console.info(data, 'data')
	return c.text('Export Excel')
}