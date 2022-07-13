export interface SpecialDate {
	day: number
	name: string
}

export interface VariableSpecialDate {
	date: Date
	name: string
	type: 'FN' | 'DC' | 'PF'
}