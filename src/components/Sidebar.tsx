import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'
import { UsersController } from '../controllers/UsersController'
import { User } from '../interfaces/User'
import '../styles/sidebar.css'

interface SidebarProps {
	onClose: () => void
}

interface MenuLinkProps {
	link: string
	text: string
	icon: string
}

export function Sidebar({ onClose: close }: SidebarProps) {
	const { signed } = useAuth()

	const [user, setUser] = useState<User>()

	useEffect(() => {
		if (signed)
			new UsersController().show().then(data => setUser(data))
		else
			setUser(undefined)
	}, [signed])

	function CloseBtn() {
		return (
			<i
				className='fa-solid fa-times fa-2x absolute top-8 right-8 cursor-pointer'
				onClick={close}
			/>
		)
	}

	function MenuLink({ icon, link, text }: MenuLinkProps) {
		return (
			<Link
				to={link}
				className='border hover:bg-blue-500 p-2'
				onClick={close}
			>
				<i className={`mr-1 fa-solid fa-${icon}`} /> {text}
			</Link>
		)
	}

	return (
		<aside
			className={
				"fixed h-screen max-w-[360px] w-[80vw] top-0 right-0 mr-[-80vw] py-6 px-5 transition-all" +
				" bg-gray-700 border-l-2 border-gray-600 text-center flex flex-col justify-between"
			}
			id='sidebar'
		>
			<header className='flex flex-col justify-center text-center'>
				<CloseBtn />

				{ user ?
					<>
						<img
							src={user.picture ?? ''}
							alt={user.name}
							className='p-1 bg-white border rounded-[50%] w-20 h-20 mx-auto mb-4'
						/>

						<strong>{user.name}</strong>
					</> :
					<h3 className='leading-7 text-2xl'>Bem-vindx ao<br />MyCalendar</h3>
				}
			</header>

			{ user ?
				<div>
					<MenuLink icon='calendar-plus' text='Cadastrar Evento' link='/create_event' />
					<MenuLink icon='calendar-days' text='Próximos Eventos' link='/next_events' />
					<MenuLink icon='key' text='Alterar Senha' link='/change_password' />
					<MenuLink icon='arrow-right-from-bracket' text='Sair' link='/logout' />
				</div> :
				<div>
					<Link to='/login' className='bg-blue-500 hover:bg-blue-600' onClick={close}>
						Entrar
					</Link>

					<Link to='/register' className='bg-purple-500 hover:bg-purple-600' onClick={close}>
						Cadastre-se
					</Link>
				</div>
			}

			<footer className='mb-3'>
				<p>&copy; 2022 MyCalendar</p>
			</footer>
		</aside>
	)
}