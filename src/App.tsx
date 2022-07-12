import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Header } from './components/Header'

import './styles/global.scss'

export function App() {
	return (
		<BrowserRouter>
			<Header />

			<Routes>
				<Route path='/' element={<p>home</p>} />

				<Route path='*' element={<p>página não encontrada</p>} />
			</Routes>
		</BrowserRouter>
	)
}