import { Link } from 'react-router-dom'

import '../styles/sidebar.scss'

export function Sidebar() {
	function closeSidebar() {
		const sidebar = document.getElementById('sidebar')

		if (sidebar)
			sidebar.classList.remove('toggled')
	}

	return (
		<aside className="sidebar-container" id='sidebar'>
			<header>
				<i className='fa-solid fa-times fa-2x' onClick={closeSidebar} />
				<h3>Bem-vindx ao<br />MyCalendar</h3>
			</header>

			<div>
				<Link to='/login' className='bg-blue'>Entrar</Link>
				<Link to='/register' className='bg-purple'>Cadastre-se</Link>
			</div>

			<footer>
				<p>&copy; 2022 MyCalendar</p>
			</footer>
		</aside>
	)
}