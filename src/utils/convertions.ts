export function toNumber(variable: any, defaultValue: number) {
	if (isNaN(variable))
		return defaultValue

	return Number(variable)
}