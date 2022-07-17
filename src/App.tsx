import { AlertContextProvider } from './contexts/AlertContext'
import { AuthContextProvider } from './contexts/AuthContext'

import { Router } from './Router'

export function App() {
	return (
		<AuthContextProvider>
			<AlertContextProvider>
				<Router />
			</AlertContextProvider>
		</AuthContextProvider>
	)
}