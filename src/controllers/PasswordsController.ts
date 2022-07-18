import { api } from "../utils/api"

export class PasswordsController {
	async retrieve(email: string) {
		const res = await api.post('forgot_password', { email })

		return res.data.message as string
	}

	async reset(password: string, id: string) {
		const res = await api.patch(`password/${id}`, { password })

		return res.data.message as string
	}

	async update(current: string, newPassword: string) {
		const res = await api.patch('password', { current, newPassword })

		return res.data.message as string
	}
}