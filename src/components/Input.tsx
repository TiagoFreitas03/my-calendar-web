import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
	error?: string
}

export function Input({ label, error, ...rest }: InputProps) {
	return (
		<div className="mb-4">
			{
				label &&
				<label className="block mb-2">
					{ label }
					{ error && <span className='text-red-400 ml-2'>{error}*</span> }
				</label>
			}

			<input
				className="border rounded w-full py-2 px-3 mb-3 text-gray-900 bg-white"
				{...rest}
			/>
		</div>
	)
}