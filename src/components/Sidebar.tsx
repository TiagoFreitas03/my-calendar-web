import { Link } from 'react-router-dom'

import '../styles/sidebar.css'

interface SidebarProps {
	onClose: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
	return (
		<aside
			className={
				"fixed h-screen max-w-[360px] w-[80vw] top-0 right-0 mr-[-80vw] py-6 px-5 transition-all" +
				" bg-gray-700 border-l-2 border-gray-600 text-center flex flex-col justify-between"
			}
			id='sidebar'
		>
			<header>
				<i
					className='fa-solid fa-times fa-2x absolute top-8 right-8 cursor-pointer'
					onClick={onClose}
				/>
				<h3 className='leading-7 text-2xl'>
					Bem-vindx ao<br />MyCalendar
				</h3>
			</header>

			<div>
				<Link to='/login' className='bg-blue-500 hover:bg-blue-600'>Entrar</Link>

				<Link to='/register' className='bg-purple-500 hover:bg-purple-600'>Cadastre-se</Link>
			</div>

			<footer className='mb-3'>
				<p>&copy; 2022 MyCalendar</p>
			</footer>
		</aside>
	)
}