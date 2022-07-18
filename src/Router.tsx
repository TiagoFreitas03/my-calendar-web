import { BrowserRouter, Routes, Route, Navigate,  } from 'react-router-dom'

import { useAuth } from './contexts/AuthContext'
import { Header } from './components/Header'

import { NotFound } from './pages/NotFound'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Logout } from './pages/Logout'
import { Register } from './pages/Register'
import { ForgotPassword } from './pages/ForgotPassword'
import { ResetPassword } from './pages/ResetPassword'

interface RouteProps {
	E: () => JSX.Element
}

export function Router() {
	const { signed } = useAuth()

	const Public = ({ E }: RouteProps) => signed ? <Navigate to={'/'} replace /> : <E />

	const Private = ({ E }: RouteProps) => signed ? <E /> : <Navigate to={'/login'} replace />

	return (
		<BrowserRouter>
			<div className="flex flex-col min-h-screen">
				<Header />

				<main className="flex flex-1">
					<Routes>
						<Route path='/' element={<Home />} />

						<Route path='/login' element={<Public E={Login} />} />
						<Route path='/register' element={<Public E={Register} />} />
						<Route path='/forgot_password' element={<Public E={ForgotPassword} />} />
						<Route path='/reset_password/:id' element={<Public E={ResetPassword} />} />

						<Route path='/logout' element={<Private E={Logout} />} />

						<Route path='*' element={<NotFound />} />
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	)
}