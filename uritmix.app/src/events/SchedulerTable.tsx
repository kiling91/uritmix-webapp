import React, { useEffect, useState } from 'react'
import { Button, Scheduler } from 'devextreme-react'
import { Editing, Resource } from 'devextreme-react/scheduler'
import { nameof } from 'ts-simple-nameof'
import Loading from '../ui/Loading'
import moment from 'moment'
import * as Icon from 'react-feather'
import { dto } from 'uritmix.api'
import EventsStore from './store/eventssStore'
import Visibility from '../ui/Visibility'

const Appointment = model => {
	const { targetedAppointmentData } = model.data
	const lesson = targetedAppointmentData.lesson
	const room = targetedAppointmentData.room
	const start = moment(targetedAppointmentData.startDate).format('LT')
	const end = moment(targetedAppointmentData.endDate).format('LT')

	return (
		<div>
			<p className='text-start mb-0'>{lesson.name}</p>
			<p className='text-start mb-0'>{room.name}</p>
			<p className='text-start mb-0'>
				{start} - {end}
			</p>
		</div>
	)
}

interface TooltipParam {
	value: dto.Event
	onEdit: (value: dto.Event) => void
	onDelete: (value: dto.Event) => void
}

const AppointmentTooltip = (param: TooltipParam) => {
	const onEdit = () => {
		param.onEdit(param.value)
	}
	const onDelete = () => {
		param.onDelete(param.value)
	}
	const drawStatus = () => {
		if (param.value.type == dto.EventTypeView.InProgress)
			return <Icon.Play height={'48px'} width={'48px'} color='#2ECC71' />
		if (param.value.type == dto.EventTypeView.Finished)
			return <Icon.Power height={'48px'} width={'48px'} color='#E74C3C' />
		if (param.value.type == dto.EventTypeView.NotStarted)
			return <Icon.Calendar height={'48px'} width={'48px'} color='#3498DB' />
		return <></>
	}

	const drawStatusText = () => {
		if (param.value.type == dto.EventTypeView.InProgress)
			return <b>{'In progress'}</b>
		if (param.value.type == dto.EventTypeView.Finished)
			return <b>{'Finished'}</b>
		if (param.value.type == dto.EventTypeView.NotStarted)
			return <b>{'Not started'}</b>
		return <></>
	}

	const date = moment(param.value.startDate).format('MMM Do')
	const start = moment(param.value.startDate).format('LT')
	const end = moment(param.value.endDate).format('LT')
	const lesson = param.value.lesson
	return (
		<div className='d-flex justify-content-between'>
			<div className='col d-flex align-items-between'>
				<div className='me-1'>
					{drawStatus()}
					<div>{drawStatusText()}</div>
				</div>
				<div className='ms-1'>
					<h6 className='text-start fw-bold mb-0'>
						{lesson.name} ({lesson.durationMinute} min.)
					</h6>
					<p className='text-start mb-0'>
						{lesson.trainer.firstName} {lesson.trainer.lastName}
					</p>
					<p className='text-start mb-0'>{param.value.room.name}</p>
					<p className='text-start mb-0'>
						{date} {start} - {end}
					</p>
				</div>
			</div>

			<Visibility visible={param.value.type == dto.EventTypeView.NotStarted}>
				<div className='d-inline'>
					<Button
						icon='edit'
						type='back'
						stylingMode={'outlined'}
						className={'me-1'}
						onClick={onEdit}
					/>
				</div>
				<div className='d-inline'>
					<Button
						icon='trash'
						type='back'
						stylingMode={'outlined'}
						className={'me-1'}
						onClick={onDelete}
					/>
				</div>
			</Visibility>
		</div>
	)
}

interface Param {
	initScheduler: (scheduler: Scheduler) => void
	onEdit: (value: dto.Event) => void
	onDelete: (value: dto.Event) => void
}

const SchedulerTable = ({ initScheduler, onEdit, onDelete }: Param) => {
	const [store, setStore] = useState<EventsStore | null>(null)

	useEffect(() => {
		setStore(new EventsStore())
	}, [])

	if (store == null) return <Loading />

	const appointmentTooltip = model => {
		return (
			<AppointmentTooltip
				value={model.targetedAppointmentData}
				onEdit={onEdit}
				onDelete={onDelete}
			/>
		)
	}

	return (
		<Scheduler
			ref={ref => {
				if (ref) initScheduler(ref)
			}}
			timeZone='Europe/Moscow'
			dataSource={store.getStore()}
			views={[
				{
					type: 'day',
					name: 'Day',
					maxAppointmentsPerCell: 'auto' // unlimited
				},
				{
					type: 'week',
					name: 'Week',
					maxAppointmentsPerCell: 'auto'
				}
			]}
			defaultCurrentView={'Week'}
			defaultCurrentDate={moment()}
			startDayHour={8}
			endDayHour={21}
			remoteFiltering={true}
			dateSerializationFormat='yyyy-MM-ddTHH:mm:ssZ'
			startDateExpr={nameof<dto.Event>(o => o.startDate)}
			endDateExpr={nameof<dto.Event>(o => o.endDate)}
			appointmentComponent={Appointment}
			appointmentTooltipRender={appointmentTooltip}
			onAppointmentFormOpening={e => {
				e.cancel = true
			}}
			onAppointmentDblClick={e => {
				e.cancel = true
			}}
		>
			<Editing
				allowAdding={false}
				allowDeleting={true}
				allowDragging={false}
				allowResizing={false}
				allowTimeZoneEditing={false}
				allowUpdating={false}
			/>
			<Resource
				dataSource={store.getRooms()}
				fieldExpr={nameof<dto.Event>(o => o.roomId)}
				useColorAsDefault={true}
			/>
		</Scheduler>
	)
}

export default SchedulerTable
