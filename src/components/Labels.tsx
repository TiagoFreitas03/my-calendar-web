import { Label } from '../interfaces/Label'

interface LabelsProps {
	data: Label[]
	showRemoveButton?: boolean
	onRemove?: (id: number) => void
}

export function Labels({ data, showRemoveButton, onRemove: remove }: LabelsProps) {
	return (
		<div className='flex flex-row gap-4 my-4'>
			{data.map(label => {
				return (
					<span
						key={label.id}
						style={{ border: `2px solid ${label.color}` }}
						className="px-4 py-2 rounded-lg"
					>
						{label.name}

						{ showRemoveButton &&
							<span
								className='cursor-pointer ml-2 mr-0 text-gray-300 text-lg'
								onClick={() => remove ? remove(label.id) : null}
							>
								&times;
							</span>
						}
					</span>
				)
			})}
		</div>
	)
}