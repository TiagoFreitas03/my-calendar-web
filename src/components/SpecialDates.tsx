import { useState, useEffect } from 'react'

import { getSpecialDates } from '../utils/dates'
import { SpecialDate } from '../interfaces/Date'

interface SpecialDatesProps {
	year: number
	month: number
}

export function SpecialDates({ month, year }: SpecialDatesProps) {
	const [holidays, setHolidays] = useState<SpecialDate[]>([])
	const [celebrations, setCelebrations] = useState<SpecialDate[]>([])
	const [owds, setOwds] = useState<SpecialDate[]>([])

	useEffect(() => {
		const dates = getSpecialDates(month, year)

		setHolidays(dates.holidays)
		setCelebrations(dates.celebrations)
		setOwds(dates.owds)
	}, [month, year])

	return (
		<div>
			<section>
				<h4>Feriados:</h4>
				{holidays.length > 0 ? 
					holidays.map((date, index) => {
						return <p key={index}>{date.day} - {date.name}</p>
					}) : 
					<p>Nenhum feriado neste mês.</p>
				}
			</section>

			<section>
				<h4>Datas Comemorativas:</h4>
				{celebrations.length > 0 ? 
					celebrations.map((date, index) => {
						return <p key={index}>{date.day} - {date.name}</p>
					}) : 
					<p>Nenhuma data comemorativa neste mês.</p>
				}
			</section>

			<section>
				<h4>Pontos Facultativos:</h4>
				{owds.length > 0 ? 
					owds.map((date, index) => {
						return <p key={index}>{date.day} - {date.name}</p>
					}) : 
					<p>Nenhum ponto facultativo neste mês.</p>
				}
			</section>
		</div>
	)
}