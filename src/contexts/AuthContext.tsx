import { ReactNode, createContext, useContext, useState, useEffect } from 'react'

import { api } from '../utils/api'

interface ContextProps {
	children: ReactNode
}

interface AuthContextData {
	token: string
	signed: boolean
	loading: boolean
	signIn: (token: string) => void
	signOut: () => void
}

const AuthContext = createContext({} as AuthContextData)

export function AuthContextProvider({ children }: ContextProps) {
	const [token, setToken] = useState('')
	const [loading, setLoading] = useState(true)

	function saveLocalData(token: string) {
		api.defaults.headers.common['Authorization'] = `Bearer ${token}`

		setToken(token)
	}

	useEffect(() => {
		const storagedToken = localStorage.getItem('token')

		if (storagedToken)
			saveLocalData(storagedToken)

		setLoading(false)
	}, [])

	function signIn(token: string) {
		localStorage.setItem('token', token)

		saveLocalData(token)
	}

	function signOut() {
		localStorage.removeItem('user')
		localStorage.removeItem('token')

		setToken('')
	}

	return (
		<AuthContext.Provider value={{ token, loading, signed: token !== '', signIn, signOut }}>
			{ children }
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)