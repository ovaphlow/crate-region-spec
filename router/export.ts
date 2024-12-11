import { Context, Hono } from 'hono'
import * as XLSX from 'xlsx'

const app = new Hono()
	.post('/excel', exportExcel)

export default app

/**
 * Handles the export of data to an Excel file.
 * 
 * @param {Context} c - The context object containing the request and response.
 */
async function exportExcel(c: Context) {
	const { columns, data } = await c.req.json()

	const wb = XLSX.utils.book_new()
	const ws = XLSX.utils.aoa_to_sheet([
		columns,
		...data
	])
	XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')

	const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })

	c.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
	c.header('Content-Disposition', 'attachment; filename="export.xlsx"')
	return c.body(buf)
}