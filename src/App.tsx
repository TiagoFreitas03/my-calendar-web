import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Header } from './components/Header'

import { Home } from './pages/Home'

export function App() {
	return (
		<BrowserRouter>
			<div className="flex flex-col min-h-screen">
				<Header />

				<main className="flex flex-1">
					<Routes>
						<Route path='/' element={<Home />} />

						<Route path='*' element={<p>página não encontrada</p>} />
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	)
}