import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import logo from '../images/logo.svg'
import '../styles/header.scss'

export function Header() {
	const currentDate = format(new Date(), 'EEEEEE, d MMMM', { locale: ptBR })

	return (
		<header className="header-container">
			<img src={logo} alt="MyCalendar" />

			<p>Para uma vida mais organizada</p>

			<span>{ currentDate }</span>
		</header>
	)
}