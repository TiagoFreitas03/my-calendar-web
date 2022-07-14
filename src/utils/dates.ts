import { add, sub } from 'date-fns'

import { SpecialDate, VariableSpecialDate } from '../interfaces/Date'

export function getSpecialDates(month: number, year: number) {
	const dates: SpecialDate[] = []

	const addHoliday = (day: number, name: string) => dates.push({ day, name, type: 'FN' })
	const addCelebration = (day: number, name: string) => dates.push({ day, name, type: 'DC' })
	const addOwd = (day: number, name: string) =>	dates.push({ day, name, type: 'PF' })

	switch (month) {
		case 0: // Janeiro
			addHoliday(1, 'Confraternização')
			addCelebration(1, 'Ano-Novo')
			break
		case 2: // Março
			addCelebration(8, 'Dia Internacional da Mulher')
			break
		case 3: // Abril
			addHoliday(21, 'Tiradentes')
			addCelebration(19, 'Dia do Índio')
			addCelebration(22, 'Descobrimento do Brasil')
			break
		case 4: // Maio
			addHoliday(1, 'Dia do Trabalho')
			break
		case 5: // Junho
			addCelebration(12, 'Dia dos Namorados')
			addCelebration(24, 'Dia de São João')
			break
		case 6: // Julho
			addCelebration(9, 'Dia da Revolução Constitucionalista')
			addCelebration(20, 'Dia do Amigo e Internacional da Amizade')
			break
		case 7: // Agosto
			addCelebration(22, 'Dia do Folclore')
			addCelebration(25, 'Dia do Soldado')
			break
		case 8: // Setembro
			addHoliday(7, 'Independência do Brasil')
			addCelebration(21, 'Dia da Árvore')
			break
		case 9: // Outubro
			addHoliday(12, 'Nossa Senhora Aparecida')
			addCelebration(12, 'Dia das Crianças')
			addCelebration(15, 'Dia do Professor')
			addCelebration(31, 'Dia das Bruxas (Halloween)')
			addCelebration(31, 'Dia do Saci')
			addOwd(28, 'Dia do Servidor Público')
			break
		case 10: // Novembro
			addHoliday(2, 'Finados')
			addHoliday(15, 'Proclamação da República')
			addCelebration(1, 'Dia de Todos os Santos')
			addCelebration(19, 'Dia da Bandeira')
			addCelebration(20, 'Dia Nacional da Consciência Negra')
			break
		case 11: // Dezembro
			addHoliday(25, 'Natal')
			addCelebration(24, 'Véspera de Natal')
			addCelebration(31, 'Véspera de Ano-Novo')
			break
	}

	const variableDates = getVariableDates(month, year)
	dates.push(...variableDates)
	dates.sort((x, y) => x.day - y.day)

	return {
		dates,
		holidays: dates.filter(d => d.type === 'FN').map(d => d.day),
		celebrations: dates.filter(d => d.type === 'DC').map(d => d.day),
		owds: dates.filter(d => d.type === 'PF').map(d => d.day),
	}
}

function calculateEaster(year: number) {
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

function getVariableDates(month: number, year: number) {
	const dates: SpecialDate[] = []
	const easter = calculateEaster(year)

	const aux: VariableSpecialDate[] = [
		{ date: sub(easter, { days: 47 }), name: 'Carnaval', type: 'PF' },
		{ date: sub(easter, { days: 46 }), name: 'Cinzas', type: 'DC' },
		{ date: sub(easter, { days: 7 }), name: 'Domingo de Ramos', type: 'DC' },
		{ date: sub(easter, { days: 3 }), name: 'Quinta-feira Santa', type: 'DC' },
		{ date: sub(easter, { days: 2 }), name: 'Sexta-feira Santa', type: 'FN' },
		{ date: sub(easter, { days: 1 }), name: 'Sábado de Aleluia', type: 'DC' },
		{ date: easter, name: 'Páscoa', type: 'DC' },
		{ date: add(easter, { days: 60 }), name: 'Corpus Christi', type: 'PF' },
	]

	aux.forEach(d => {
		const { date, type, name } = d
		const day = date.getDate()

		if (date.getMonth() === month)
			dates.push({ day, name, type })
	})

	if (month === 4) {
		let date = new Date(year, 4, 1) // 1º de Maio
		let sundayCount = date.getDay() === 0 ? 1 : 0

		while (sundayCount < 2) {
			date = add(date, { days: 1 })

			if (date.getDay() === 0)
				sundayCount++
		}

		dates.push({ day: date.getDate(), name: 'Dia das Mães', type: 'DC' })
	}

	if (month === 7) {
		let date = new Date(year, 7, 1) // 1º de Agosto
		let sundayCount = date.getDay() === 0 ? 1 : 0

		while (sundayCount < 2) {
			date = add(date, { days: 1 })

			if (date.getDay() === 0)
				sundayCount++
		}

		dates.push({ day: date.getDate(), name: 'Dia dos Pais', type: 'DC' })
	}

	return dates
}