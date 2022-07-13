import { useState, useMemo } from 'react'
import { format, sub, add } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { IconButton } from "../components/IconButton"
import { SpecialDates } from '../components/SpecialDates'

const WEEK_DAYS = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB']

export function Home() {
	const [date, setDate] = useState(new Date())

	const month = date.getMonth()
	const year = date.getFullYear()

	const decrementYear = () => setDate(sub(date, { years: 1 }))
	const decrementMonth = () => setDate(sub(date, { months: 1 }))
	const incrementMonth = () => setDate(add(date, { months: 1 }))
	const incrementYear = () => setDate(add(date, { years: 1 }))

	const monthDays = useMemo(() => {
		const days: string[][] = [[]]

		const firstDay = new Date(year, month, 1)
		const lastDay = new Date(year, month + 1, 0).getDate()

		while (days[0].length < firstDay.getDay())
			days[0].push('')

		for (let i = 1; i <= lastDay; i++) {
			days[days.length - 1].push(i.toString())

			if (days[days.length - 1].length === 7)
				days.push([])
		}

		while (days[days.length - 1].length < 7)
			days[days.length - 1 ].push('')

		return days
	}, [date])

	const isToday = (day: string) => {
		const today = new Date()
		const [d, m, y] = [today.getDate(), today.getMonth(), today.getFullYear()]

		return day === d.toString() && month === m && year === y
	}

	const getBackgroundColor = (day: string) => {
		if (isToday(day))
			return '#FFBE0B'

		return '#09090A'
	}

	const getTextColor = (day: string) => {
		if (isToday(day))
			return '#09090A'

		return '#E1E1E6'
	}

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
					{monthDays.map((week, i) => {
						return (
							<tr key={i}>
								{week.map((day, j) => {
									return (
										<td
											style={{
												cursor: day !== '' ? 'pointer' : 'default',
												background: getBackgroundColor(day),
												color: getTextColor(day)
											}}
											className='border-2 border-gray-700 py-6 font-semibold'
											key={j}
										>{day}</td>
									)
								})}
							</tr>
						)
					})}
				</tbody>
			</table>

			<SpecialDates month={month} year={year} />
		</div>
	)
}