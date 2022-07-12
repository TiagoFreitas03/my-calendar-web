import { ButtonHTMLAttributes } from 'react'

import '../styles/icon-button.scss'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon: string
	color: 'blue' | 'purple' | 'pink' | 'orange' | 'yellow'
}

export function IconButton({ icon, color, ...rest }: IconButtonProps) {
	return (
		<button
			className={`icon-button bg-${color}`}
			{...rest}
		>
			<i className={`fa-solid fa-${icon}`} />
		</button>
	)
}