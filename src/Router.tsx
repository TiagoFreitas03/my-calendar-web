import { BrowserRouter, Routes, Route, Navigate,  } from 'react-router-dom'

import { useAuth } from './contexts/AuthContext'
import { Header } from './components/Header'

import { NotFound } from './pages/NotFound'
import { Home } from './pages/Home'

import { Login } from './pages/user/Login'
import { Logout } from './pages/user/Logout'
import { Register } from './pages/user/Register'

import { ForgotPassword } from './pages/user/ForgotPassword'
import { ResetPassword } from './pages/user/ResetPassword'
import { ChangePassword } from './pages/user/ChangePassword'

import { Event } from './pages/events/Event'
import { NextEvents } from './pages/events/NextEvents'
import { EventDetails } from './pages/events/EventDetails'
import { CreateLabel } from './pages/CreateLabel'

interface RouteProps {
	E: () => JSX.Element
}

export function Router() {
	const { signed, loading } = useAuth()

	if (loading) {
		return (
			<div className='h-[100vh] flex justify-center items-center'>
				<h1>Carregando...</h1>
			</div>
		)
	}

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
						<Route path='/change_password' element={<Private E={ChangePassword} />} />

						<Route path='/create_event' element={<Private E={Event} />} />
						<Route path='/edit_event/:id' element={<Private E={Event} />} />
						<Route path='/next_events' element={<Private E={NextEvents} />} />
						<Route path='/event/:id' element={<Private E={EventDetails} />} />
						<Route path='/create_label' element={<Private E={CreateLabel} />} />

						<Route path='*' element={<NotFound />} />
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	)
}