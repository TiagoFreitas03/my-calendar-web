import { add, sub } from 'date-fns'

import { SpecialDate, VariableSpecialDate } from '../interfaces/Date'

export function calculateEaster(year: number) {
	const c = Math.floor(year / 100)
	const n = year - 19 * Math.floor(year / 19)
	const k = Math.floor((c - 17) / 25)

	let i = c - Math.floor(c / 4) - Math.floor((c - k) / 3) + 19 * n + 15
	i = i - 30 * Math.floor((i / 30))
	i = i - Math.floor(i / 28) * (1 - Math.floor(i / 28) *
		Math.floor(29 / (i + 1)) * Math.floor((21 - n) / 11))

	let j = year + Math.floor(year / 4) + i + 2 - c + Math.floor(c / 4)
	j = j - 7 * Math.floor(j / 7)

	const l = i - j
	const m = 3 + Math.floor((l + 40) / 44)
	const d = l + 28 - 31 * Math.floor(m / 4)

	return new Date(year, m - 1, d)
}

export function getVariableDates(month: number, year: number) {
	const holidays: SpecialDate[] = []
	const celebrations: SpecialDate[] = []
	const owds: SpecialDate[] = []

	const addHoliday = (day: number, name: string) => holidays.push({ day, name })
	const addCelebration = (day: number, name: string) => celebrations.push({ day, name })
	const addOwd = (day: number, name: string) => owds.push({ day, name })

	const easter = calculateEaster(year)

	const dates: VariableSpecialDate[] = [
		{ date: sub(easter, { days: 47 }), name: 'Carnaval', type: 'PF' },
		{ date: sub(easter, { days: 46 }), name: 'Cinzas', type: 'DC' },
		{ date: sub(easter, { days: 7 }), name: 'Domingo de Ramos', type: 'DC' },
		{ date: sub(easter, { days: 3 }), name: 'Quinta-feira Santa', type: 'DC' },
		{ date: sub(easter, { days: 2 }), name: 'Sexta-feira Santa', type: 'FN' },
		{ date: sub(easter, { days: 1 }), name: 'Sábado de Aleluia', type: 'DC' },
		{ date: easter, name: 'Páscoa', type: 'DC' },
		{ date: add(easter, { days: 60 }), name: 'Corpus Christi', type: 'PF' },
	]

	dates.forEach(d => {
		const { date, type, name } = d
		const day = date.getDate()

		if (date.getMonth() === month) {
			switch (type) {
				case 'FN':
					addHoliday(day, name)
					break
				case 'DC':
					addCelebration(day, name)
					break
				case 'PF':
					addOwd(day, name)
					break
			}
		}
	})

	if (month === 4) {
		let sundayCount = 0
		let day = new Date(year, 4, 1) // 1º de Maio

		while (sundayCount < 2) {
			if (day.getDay() === 0)
				sundayCount++

			day = add(day, { days: 1 })
		}

		addCelebration(day.getDate(), 'Dia das Mães')
	}

	if (month === 7) {
		let sundayCount = 0
		let day = new Date(year, 7, 1) // 1º de Agosto

		while (sundayCount < 2) {
			if (day.getDay() === 0)
				sundayCount++

			day = add(day, { days: 1 })
		}

		addCelebration(day.getDate(), 'Dia dos Pais')
	}

	return { holidays, celebrations, owds }
}