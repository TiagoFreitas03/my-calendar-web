import { useState, useMemo } from 'react'
import { format, sub, add } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { IconButton } from "../components/IconButton"
import '../styles/home.scss'

const WEEK_DAYS = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB']

export function Home() {
	const [date, setDate] = useState(new Date())

	const decrementYear = () => setDate(sub(date, { years: 1 }))
	const decrementMonth = () => setDate(sub(date, { months: 1 }))
	const incrementMonth = () => setDate(add(date, { months: 1 }))
	const incrementYear = () => setDate(add(date, { years: 1 }))

	const month_days = useMemo(() => {
		const days: string[][] = [[]]

		while (days[0].length < date.getDay())
			days[0].push('')

		const finalDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

		for (let i = 1; i <= finalDay; i++) {
			days[days.length - 1].push(i.toString())

			if (days[days.length - 1].length === 7)
				days.push([])
		}

		while (days[days.length - 1].length < 7)
			days[days.length - 1 ].push('')

		return days
	}, [date])

	return (
		<div className='home-container'>
			<header>
				<div>
					<IconButton icon="angles-left" color="blue" onClick={decrementYear} />
					<IconButton icon="angle-left" color="purple" onClick={decrementMonth} />
				</div>

				<h2>{format(date, 'MMMM yyyy', { locale: ptBR })}</h2>

				<div>
					<IconButton icon="angle-right" color="purple" onClick={incrementMonth} />
					<IconButton icon="angles-right" color="blue" onClick={incrementYear} />
				</div>
			</header>

			<table>
				<thead>
					<tr>
						{WEEK_DAYS.map(day => <th key={day}>{day}</th>)}
					</tr>
				</thead>

				<tbody>
					{month_days.map((week, i) => {
						return (
							<tr key={i}>
								{week.map((day, j) => <td key={j}>{day}</td>)}
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}