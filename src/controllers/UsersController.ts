import { api } from "../utils/api"
import { User } from '../interfaces/User'

interface UserCreateData {
	name: string
	email: string
	password: string
	birth_date?: string
	picture?: File
}

interface AuthenticateResponse {
	message: string
	token: string
}

export class UsersController {
	async create({ name, email, password, birth_date, picture }: UserCreateData) {
		const data = new FormData()

		data.append('name', name)
		data.append('email', email)
		data.append('password', password)

		if (birth_date)
			data.append('birth_date', birth_date)

		if (picture)
			data.append('picture', picture)

		const res = await api.post('user', data)

		return res.data
	}

	async login(email: string, password: string) {
		const res = await api.post('login', { email, password })

		return res.data as AuthenticateResponse
	}

	async show() {
		const res = await api.get('user')

		return res.data as User
	}
}