import { BrowserRouter, Routes, Route, Navigate,  } from 'react-router-dom'

import { useAuth } from './contexts/AuthContext'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { ForgotPassword } from './pages/ForgotPassword'

interface RouteProps {
	E: () => JSX.Element
}

export function Router() {
	const { signed } = useAuth()

	const PublicRoute = ({ E }: RouteProps) => signed ? <Navigate to={'/'} replace /> : <E />

	//const PrivateRoute = ({ E }: RouteProps) => signed ? <E /> : <Navigate to={'/login'} replace />

	return (
		<BrowserRouter>
			<div className="flex flex-col min-h-screen">
				<Header />

				<main className="flex flex-1">
					<Routes>
						<Route path='/' element={<Home />} />

						<Route path='/login' element={<PublicRoute E={Login} />} />
						<Route path='/register' element={<PublicRoute E={Register} />} />
						<Route path='/forgot_password' element={<PublicRoute E={ForgotPassword} />} />

						<Route path='*' element={<p>página não encontrada</p>} />
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	)
}