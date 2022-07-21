import { Label } from './Label'

export interface Event {
	id: string
	name: string
	description?: string
	start: string
	end?: string
	startDate: string
	startTime: string
	endDate?: string
	endTime?: string
	created_at: string
	labels?: Label[]
}