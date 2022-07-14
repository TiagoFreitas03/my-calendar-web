import { useState, useEffect } from 'react'

import { getSpecialDates } from '../utils/dates'
import { SpecialDate } from '../interfaces/Date'
import { colors } from '../utils/config'

interface SpecialDatesProps {
	year: number
	month: number
}

interface SubtitleProps {
	color: 'blue' | 'purple' | 'pink' | 'orange' | 'yellow'
	text: string
}

export function SpecialDates({ month, year }: SpecialDatesProps) {
	const [dates, setDates] = useState<SpecialDate[]>([])

	useEffect(() => {
		const specialDates = getSpecialDates(month, year)
		setDates(specialDates.dates)
	}, [month, year])

	function Subtitle({ color, text }: SubtitleProps) {
		return (
			<p className='my-2'>
				<span className="px-2 mr-2" style={{ background: colors[color] }}></span>
				{text}
			</p>
		)
	}

	return (
		<div className='mt-6'>
			<div className='md:max-w-[50vw]'>
				<Subtitle color='blue' text='Feriado' />
				<Subtitle color='purple' text='Data Comemorativa' />
				<Subtitle color='pink' text='Ponto Facultativo' />
				<Subtitle color='orange' text='Hoje' />
				<Subtitle color='yellow' text='Selecionado' />
			</div>

			<div className='bg-gray-700 rounded-lg p-5 mt-4'>
				<h4>Feriados e Datas Comemorativas:</h4>

				{dates.length > 0 ?
					dates.map((date, index) => {
						return (
							<p key={index} className="flex my-3 items-center">
								<span
									className='w-8 py-1 text-center rounded-md mr-2'
									style={{ background: date.type === 'FN' ? colors.blue :
										date.type === 'DC' ? colors .purple : colors.pink
									}}
								>
									{date.day}
								</span>
								{date.name}
							</p>
						)
					}) :
					<p className='mt-2'>Nenhum feriado ou data comemorativa este mês.</p>
				}
			</div>
		</div>
	)
}