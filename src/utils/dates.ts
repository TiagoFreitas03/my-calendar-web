import { SpecialDate } from '../interfaces/Date'
import { getVariableDates } from './variableDates'

export function getSpecialDates(month: number, year: number) {
	const holidays: SpecialDate[] = []
	const celebrations: SpecialDate[] = []
	const owds: SpecialDate[] = []

	const addHoliday = (day: number, name: string) => holidays.push({ day, name })
	const addCelebration = (day: number, name: string) => celebrations.push({ day, name })
	const addOwd = (day: number, name: string) => owds.push({ day, name })

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
			addHoliday(12, 'Dia das Crianças')
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

	const variableDates = getVariableDates(year, month)
	holidays.push(...variableDates.holidays)
	celebrations.push(...variableDates.celebrations)
	owds.push(...variableDates.owds)

	return {
		holidays,
		holidaysDates: holidays.map(h => h.day),
		celebrations,
		celebrationsDates: celebrations.map(c => c.day),
		owds,
		owdsDates: owds.map(d => d.day)
	}
}