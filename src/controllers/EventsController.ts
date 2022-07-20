import { format } from 'date-fns'

import { api } from "../utils/api"
import { Event } from '../interfaces/Event'

interface EventCreate {
	name: string
	description?: string
	start: string
	end?: string
	notify: boolean
	labels_ids?: number[]
}

export class EventsController {
	async create(data: EventCreate) {
		const res = await api.post('event', data)

		return res.data.message as string
	}

	async edit(data: EventCreate, id: string) {
		const res = await api.patch(`event/${id}`, data)

		return res.data.message as string
	}

	async searchByName(name?: string, page?: number, limit?: number) {
		const filters: string[] = []

		if (name)
			filters.push(`name=${name}`)

		if (page)
			filters.push(`page=${page}`)

		if (limit)
			filters.push(`limit=${limit}`)

		const res = await api.get(`event?${filters.join('&')}`)

		return res.data as Event[]
	}

	async searchByReference(date: Date) {
		const ref = format(date, 'yyyy-MM-dd')

		const res = await api.get(`month_events/${ref}`)

		return res.data as Event[]
	}

	async searchByDay(date: Date) {
		const ref = format(date, 'yyyy-MM-dd')

		const res = await api.get(`day_events/${ref}`)

		return res.data as Event[]
	}

	async findById(id: string) {
		const res = await api.get(`event/${id}`)

		return res.data as Event
	}

	async delete(id: string) {
		const res = await api.delete(`event/${id}`)

		return res.data.message as string
	}
}