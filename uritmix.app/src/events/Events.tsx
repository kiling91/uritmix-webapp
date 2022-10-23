import React, { useMemo, useState } from 'react'
import SchedulerTable from './SchedulerTable'
import { Button, Scheduler } from 'devextreme-react'
import Tooltip from '../ui/Tooltip'
import Visibility from '../ui/Visibility'
import CreateEditEvent from './CreateEditEvent'
import { dto } from 'uritmix.api'

enum ModalMode {
	Create,
	Edit,
	None
}

const Events = () => {
	const [scheduler, setScheduler] = useState<Scheduler | null>(null)

	const [modalMode, setModalMode] = useState(ModalMode.None)
	const [current, setCurrent] = useState<dto.Event | null>(null)

	const initScheduler = (scheduler: Scheduler) => {
		setScheduler(scheduler)
	}

	const onEdit = (value: dto.Event) => {
		setCurrent(value)
		setModalMode(ModalMode.Edit)
	}

	const onDelete = (value: dto.Event) => {
		console.warn(`On delete ${value.id}`)
	}

	const onCreate = () => {
		setModalMode(ModalMode.Create)
	}

	const onCloseModal = (_: number, needReload: boolean) => {
		if (needReload) scheduler?.instance.getDataSource().reload()
		setCurrent(null)
		setModalMode(ModalMode.None)
	}

	const schedulerTable = useMemo(
		() => (
			<SchedulerTable
				initScheduler={initScheduler}
				onEdit={onEdit}
				onDelete={onDelete}
			/>
		),
		[current]
	)

	return (
		<div className='card'>
			<div className='card-header'>
				<div className='d-flex align-items-center justify-content-between'>
					<div>{'Scheduler'}</div>
					<div className='d-flex justify-content-between'>
						<Tooltip tooltip={'Create event'}>
							<Button
								icon='plus'
								type='default'
								text='Create event'
								className={'mx-1'}
								onClick={onCreate}
							/>
						</Tooltip>
					</div>
				</div>
			</div>
			<div className='card-body'>
				{schedulerTable}
				{/*Modal*/}
				<Visibility visible={modalMode == ModalMode.Create}>
					<CreateEditEvent onClose={onCloseModal} />
				</Visibility>
				<Visibility visible={modalMode == ModalMode.Edit}>
					<CreateEditEvent onClose={onCloseModal} event={current} />
				</Visibility>
				{/*Modal*/}
			</div>
		</div>
	)
}

export default Events
