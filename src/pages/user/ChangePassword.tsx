import { FormEvent, useState } from "react"

import { Input } from "../../components/Input"
import { PasswordsController } from '../../controllers/PasswordsController'
import { useAlert } from '../../contexts/AlertContext'
import { useNavigate } from "react-router-dom"

interface ChangePasswordError {
	current: string
	newPassword: string
}

export function ChangePassword() {
	const [current, setCurrent] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [error, setError] = useState<ChangePasswordError>()

	const alert = useAlert()
	const navigate = useNavigate()

	async function handleChangePasswordFormSubmit(event: FormEvent) {
		event.preventDefault()

		try {
			const message = await new PasswordsController().update(current, newPassword)

			alert.show('Tudo certo', message)

			setTimeout(() => { navigate('/') }, 1000)
		} catch (err: any) {
			const { message, errors } = err.response.data

			alert.show('Ocorreu um erro', message)

			if (errors)
				setError(errors)
			else
				setError(undefined)
		}
	}

	return (
		<div className="w-full max-w-lg mx-auto flex items-center text-gray-100">
			<form
				className="border border-gray-600 bg-gray-700 rounded p-6 w-full"
				onSubmit={handleChangePasswordFormSubmit}
			>
				<strong className='block text-xl mb-5'>Atualização de senha</strong>

				<Input
					label="Senha atual"
					type='password'
					value={current}
					onChange={e => setCurrent(e.target.value)}
					error={error?.current ?? ''}
				/>

				<Input
					label="Nova senha"
					type='password'
					value={newPassword}
					onChange={e => setNewPassword(e.target.value)}
					error={error?.newPassword ?? ''}
				/>

				<div className="flex items-center justify-between mt-4 mb-1">
					<button
						className="bg-blue-500 hover:bg-blue-600 py-2 px-8 rounded text-lg text-gray-50"
						type="submit"
					>
						Confirmar
					</button>
				</div>
			</form>
		</div>
	)
}