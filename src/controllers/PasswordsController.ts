import { api } from "../utils/api"

export class PasswordsController {
	async retrieve(email: string) {
		const res = await api.post('forgot_password', { email })

		return res.data
	}
}