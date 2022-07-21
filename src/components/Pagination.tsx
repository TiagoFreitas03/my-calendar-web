import { ReactNode, useMemo } from "react"

import { colors } from "../utils/config"

interface PaginationProps {
	current: number
	total: number
	maxPages?: number
	children: ReactNode
	onChange: (page: number) => void
}

interface PageButtonProps {
	children: ReactNode
	color?: string
	onClick: () => void
}

export function Pagination(props: PaginationProps) {
	const { current, total, maxPages = 3, children, onChange: setPage } = props

	const pages = useMemo(() => {
		const pageNumbers = [current]
		let insertBefore = true, insertAfter = true

		for (let count = 1; count < maxPages; count ++) {
			if (insertBefore) {
				const aux = current - count

				if (aux > 0) pageNumbers.unshift(aux)
				else insertBefore = false
			}

			if (insertAfter) {
				const aux = current + count

				if (aux <= total) pageNumbers.push(aux)
				else insertAfter = false
			}

			if (!(insertAfter || insertBefore))
				break
		}

		return pageNumbers
	}, [total, current])

	function changePage(page: number) {
		window.scrollTo({ top: 0, behavior: 'smooth' })

		if (page > 0 && page <= total)
			setPage(page)
	}

	function PageButton({ children, color, onClick }: PageButtonProps) {
		return (
			<span
				className="px-4 py-3 border-2 border-blue-600 rounded-md mx-0.5 cursor-pointer"
				onClick={onClick}
				style={{ backgroundColor: color ?? '' }}
			>
				{children}
			</span>
		)
	}

	return (
		<div>
			{children}

			<div className="text-center my-6">
				<PageButton onClick={() => changePage(current - 1)}>
					<i className="fa-solid fa-chevron-left" />
				</PageButton>

				{pages.map(page => {
					return (
						<PageButton
							key={page}
							onClick={() => changePage(page)}
							color={current === page ? colors.blue : ''}
						>
							{page}
						</PageButton>
					)
				})}

				<PageButton onClick={() => changePage(current + 1)}>
					<i className="fa-solid fa-chevron-right" />
				</PageButton>
			</div>
		</div>
	)
}