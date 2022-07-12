import { useState, useMemo } from 'react'
import { format, sub, add } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { IconButton } from "../components/IconButton"
//import '../styles/home.css'

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
		<div className='max-w-5xl w-full mx-auto p-4'>
			<header className='flex justify-between items-center'>
				<div>
					<IconButton icon="angles-left" color="blue" onClick={decrementYear} />
					<IconButton icon="angle-left" color="purple" onClick={decrementMonth} />
				</div>

				<h2 className='capitalize'>
					{format(date, 'MMMM yyyy', { locale: ptBR })}
				</h2>

				<div>
					<IconButton icon="angle-right" color="purple" onClick={incrementMonth} />
					<IconButton icon="angles-right" color="blue" onClick={incrementYear} />
				</div>
			</header>

			<table className='w-full mt-8 border-collapse text-lg text-center'>
				<thead>
					<tr>
						{WEEK_DAYS.map(day => {
							return (
								<th
									className='bg-gray-700 border-2 border-gray-600 p-3'
									key={day}
								>{day}</th>
							)
						})}
					</tr>
				</thead>

				<tbody>
					{month_days.map((week, i) => {
						return (
							<tr key={i}>
								{week.map((day, j) => {
									return (
										<td
											style={{
												cursor: day !== '' ? 'pointer' : 'default'
											}}
											className='border-2 border-gray-700 py-6'
											key={j}
										>{day}</td>
									)
								})}
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}