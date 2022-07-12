import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'

import './styles/global.scss'
import './styles/utilities.scss'

export function App() {
	return (
		<BrowserRouter>
			<Header />

			<div className='wrapper'>
				<Routes>
					<Route path='/' element={<p>home</p>} />

					<Route path='*' element={<p>página não encontrada</p>} />
				</Routes>

				<Sidebar />
			</div>
		</BrowserRouter>
	)
}