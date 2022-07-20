import { Label } from './Label'

export interface Event {
	id: string
	name: string
	description?: string
	start: string
	end?: string
	created_at: string
	labels?: Label[]
}