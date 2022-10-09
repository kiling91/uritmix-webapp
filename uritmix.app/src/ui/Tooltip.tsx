import React from 'react'
import { OverlayTrigger, Tooltip as Tl } from 'react-bootstrap'
import { Placement } from 'react-bootstrap/esm/types'

type Props = {
	tooltip: string
	placement?: Placement
}

const Tooltip: React.FC<Props> = ({
	tooltip,
	placement = 'bottom',
	children
}) => (
	<OverlayTrigger
		placement={placement}
		overlay={<Tl id='button-tooltip-2'>{tooltip}</Tl>}
	>
		{({ ref, ...triggerHandler }) => (
			<div ref={ref} {...triggerHandler}>
				{children}
			</div>
		)}
	</OverlayTrigger>
)

export default Tooltip
