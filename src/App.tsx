import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'

import { Home } from './pages/Home'

import './styles/global.scss'
import './styles/utilities.scss'

export function App() {
	return (
		<BrowserRouter>
			<Header />

			<div className='wrapper'>
				<main>
					<Routes>
						<Route path='/' element={<Home />} />

						<Route path='*' element={<p>página não encontrada</p>} />
					</Routes>
				</main>

				<Sidebar />
			</div>
		</BrowserRouter>
	)
}