import { FormEvent, useEffect, useState } from "react"
import { format } from "date-fns"
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Input } from "../../components/Input"
import { LabelsControl } from '../../components/LabelsControl'
import { Label } from '../../interfaces/Label'
import { EventsController } from '../../controllers/EventsController'
import { useAlert } from '../../contexts/AlertContext'

interface CreateEventError {
	name?: string
	start?: string
	end?: string
}

type Optional = string | undefined

export function Event() {
	const [name, setName] = useState('')
	const [description, setDescription] = useState<Optional>('')
	const [start, setStart] = useState(format(new Date, 'yyyy-MM-dd'))
	const [startTime, setStartTime] = useState(format(new Date, 'HH:mm'))
	const [end, setEnd] = useState<Optional>('')
	const [endTime, setEndTime] = useState<Optional>('')
	const [notify, setNotify] = useState(false)
	const [labels, setLabels] = useState<Label[]>([])
	const [error, setError] = useState<CreateEventError>()

	const { show } = useAlert()
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()

	useEffect(() => {
		if (id) {
			new EventsController().findById(id).then(data => {
				setName(data.name)
				setDescription(data.description)

				setStart(data.startDate)
				setStartTime(data.startTime)

				setEnd(data.endDate)
				setEndTime(data.endTime)

				if (data.labels)
					setLabels(data.labels)
			})
		}
	}, [id])

	async function handleCreateEventFormSubmit(event: FormEvent) {
		event.preventDefault()

		try {
			const data = {
				name,
				description,
				start: `${start} ${startTime}`,
				end: end ? `${end} ${endTime}` : undefined,
				notify,
				labels_ids: labels.map(label => label.id)
			}

			let message = ''
			const controller = new EventsController()

			if (!id)
				message = await controller.create(data)
			else
				message = await controller.edit(data, id)

			show('Tudo certo!', message, 4000)
			navigate('/')
		} catch (err: any) {
			const { message, errors } = err.response.data

			if (errors)
				setError(errors)
			else
				setError(undefined)

			show('Ocorreu um erro!', message)
		}
	}

	return (
		<div className="px-8 py-6 w-full md:w-[720px] mx-auto">
			<h1>{ id ? 'Editar' : 'Novo' } Evento</h1>

			<form className="mt-4" onSubmit={handleCreateEventFormSubmit}>
				<Input
					type='text'
					label="Nome"
					value={name}
					error={error?.name}
					onChange={e => setName(e.target.value)}
				/>

				<div className="border-gray-500 border-2 rounded px-4 pt-5 mb-4">
					<label className="block mb-2">
						Início <span className='text-red-400 ml-1'>{error?.start}</span>
					</label>

					<div className="flex justify-between place-items-end">
						<div className="w-[48%]">
							<Input type='date' value={start} onChange={e => setStart(e.target.value)} />
						</div>

						<div className="w-[48%]">
							<Input type='time' value={startTime} onChange={e => setStartTime(e.target.value)} />
						</div>
					</div>
				</div>

				<div className="border-gray-500 border-2 rounded px-4 pt-5 mb-4">
					<label className="block mb-2">
						Fim (opcional) <span className='text-red-400 ml-1'>{error?.end}</span>
					</label>

					<div className="flex justify-between place-items-end">
						<div className="w-[48%]">
							<Input type='date' value={end} onChange={e => setEnd(e.target.value)} />
						</div>

						<div className="w-[48%]">
							<Input type='time' value={endTime} onChange={e => setEndTime(e.target.value)} />
						</div>
					</div>
				</div>

				<div className="flex items-center mb-4">
					<input
						type="checkbox"
						className="w-5 h-5 text-blue-600"
						checked={notify}
						onChange={() => setNotify(!notify)}
					/>

					<label className="ml-2">Receber notificação</label>
				</div>

				<LabelsControl onChange={labels => setLabels(labels)} />

				<label className="block mb-2">Descrição</label>
				<textarea
					rows={3}
					className="border rounded w-full py-2 px-3 mb-3 text-gray-900 bg-white"
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>

				<div className="flex gap-4 text-lg text-gray-50">
					<button className="bg-blue-500 hover:bg-blue-600 py-2 px-8 rounded" type="submit">
						Confirmar
					</button>

					<Link className="bg-purple-500 hover:bg-purple-600 py-2 px-8 rounded" to='/'>
						Cancelar
					</Link>
				</div>
			</form>
		</div>
	)
}