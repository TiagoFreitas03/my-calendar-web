type SpecialDateTypes =
	'FN' | // Feriado Nacional
	'DC' | // Data Comemorativa
	'PF'   // Ponto Facultativo

export interface SpecialDate {
	day: number
	name: string
	type: SpecialDateTypes
}

export interface VariableSpecialDate {
	date: Date
	name: string
	type: SpecialDateTypes
}