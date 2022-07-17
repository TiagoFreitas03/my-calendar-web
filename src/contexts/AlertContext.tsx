import { ReactNode, useState, createContext, useContext } from 'react'

interface ContextProps {
	children: ReactNode
}

interface IAlertContextProps {
	show: (title: string, message: string, timeout?: number) => void
}

const AlertContext = createContext({} as IAlertContextProps)

export function AlertContextProvider({ children }: ContextProps) {
	const [alertId, setAlertId] = useState('')
	const [title, setTitle] = useState('')
	const [message, setMessage] = useState('')

	function hide(alertId: string) {
		if (document.getElementById(alertId)) {
			setTitle('')
			setMessage('')
		}
	}

	function show(title: string, message: string, timeout: number = 3000) {
		const newId = String(new Date().getTime())

		setAlertId(newId)
		setTitle(title)
		setMessage(message)

		setTimeout(() => hide(newId), timeout)
	}

	return (
		<AlertContext.Provider value={{ show }}>
			<div className="fixed flex justify-center bottom-8 left-8">
				{ message !== '' && title !== '' &&
					<div
						className="bg-gray-700 border border-gray-600 rounded-sm"
						id={alertId}
					>
						<header className='bg-blue-500 text-gray-700 pl-4 pr-2 py-2 flex justify-between'>
							<strong>{title}</strong>

							<span
								className='cursor-pointer text-xl ml-4'
								onClick={() => hide(alertId)}
							>
								&times;
							</span>
						</header>

						<span className='block p-4'>{message}</span>
					</div>
				}
			</div>

			{children}
		</AlertContext.Provider>
	)
}

export const useAlert = () => useContext(AlertContext)