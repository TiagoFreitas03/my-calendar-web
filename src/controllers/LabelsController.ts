import { api } from '../utils/api'
import { Label } from '../interfaces/Label'

interface CreateLabelResponse {
	message: string
	label: Label
}

export class LabelsController {
	async create(name: string, color: string) {
		color = color.replace('#', '')

		const res = await api.post('label', { name, color })

		return res.data as CreateLabelResponse
	}

	async search(name?: string) {
		const res = await api.get(`label?name=${name ?? ''}`)

		return res.data as Label[]
	}
}