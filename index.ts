import * as XLSX from 'xlsx'

const port = process.env.PORT ? Number(process.env.PORT) : 8423

Bun.serve({
	port: port,
	fetch: async (req, server) => {
		if (new URL(req.url).pathname === '/crate-api-region-spec/excel') {
			// 添加 CORS 预检处理
			if (req.method === 'OPTIONS') {
				return new Response('', {
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods': 'POST, OPTIONS',
						'Access-Control-Allow-Headers': 'Content-Type',
					},
				})
			}

			if (req.method !== 'POST') {
				return new Response('Method not allowed!', {
					status: 405,
					headers: { 'Access-Control-Allow-Origin': '*' },
				})
			}

			const body = await req.text()
			if (!body) {
				return new Response('Bad request!', {
					status: 400,
					headers: { 'Access-Control-Allow-Origin': '*' },
				})
			}
			const { columns, data } = JSON.parse(body)

			const wb = XLSX.utils.book_new()
			const ws = XLSX.utils.aoa_to_sheet([columns, ...data])
			XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')

			const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })

			return new Response(buf, {
				headers: {
					'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
					'Content-Disposition': 'attachment; filename="export.xlsx"',
					'Access-Control-Allow-Origin': '*',
				},
			})
		}
		return new Response('404!')
	},
})

console.info(`Server started at http://localhost:${port}`)
