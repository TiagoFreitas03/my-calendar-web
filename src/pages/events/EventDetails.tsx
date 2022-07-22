import { useState, useEffect } from 'react'
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom'
import { Labels } from '../../components/Labels'
import { useAlert } from '../../contexts/AlertContext'

import { EventsController } from '../../controllers/EventsController'
import { Event } from '../../interfaces/Event'

export function EventDetails() {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()
	const { show } = useAlert()

	const [event, setEvent] = useState<Event>()

	if (!id) {
		return (<Navigate to='/' replace />)
	}

	useEffect(() => {
		new EventsController().findById(id).then(data => setEvent(data))
	}, [id])

	async function deleteEvent(eventId: string) {
		try {
			const message = await new EventsController().delete(eventId)

			show('Tudo certo!', message)

			navigate('/')
		} catch (err: any) {
			const { message } = err.response.data

			show('Ocorreu um erro!', message)
		}
	}

	return (
		<div className='w-full md:w-[720px] mx-auto px-4 pt-4'>
			{ event ? (
				<div className='leading-8'>
					<div className='flex justify-between mb-8 mt-4'>
						<h2>{event.name}</h2><br />

						<div>
							<Link
								className='border-2 border-purple-500 rounded-lg p-2 cursor-pointer mr-2'
								to={`/edit_event/${event.id}`}
							>
								<i className='fa-solid fa-pencil' />
							</Link>

							<button
								className='border-2 border-pink-500 rounded-lg px-2.5 py-0.5 cursor-pointer'
								onClick={() => deleteEvent(event.id)}
							>
								<i className='fa-solid fa-trash' />
							</button>
						</div>
					</div>

					{ event.description && <p>{event.description}</p> }

					<br /><p>Início: {event.start}</p>

					{ event.end && <p>Fim: {event.end}</p> }

					<br /><h3 className='text-lg'>Etiquetas</h3>

					{ event.labels && <Labels data={event.labels} /> }
				</div>
			) : (
				<p>O evento não foi encontrado.</p>
			) }
		</div>
	)
}