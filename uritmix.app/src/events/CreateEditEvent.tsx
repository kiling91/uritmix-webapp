import React, { useState } from 'react'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { Popup } from 'devextreme-react/popup'
import { Button, DateBox, TagBox, TextBox, Validator } from 'devextreme-react'
import { Lookup, DropDownOptions } from 'devextreme-react/lookup'
import { RequiredRule, StringLengthRule } from 'devextreme-react/validator'
import NumberBox from 'devextreme-react/number-box'
import { dto } from 'uritmix.api'
import { RuleCaption } from '../base/ruleCaption'
import { AbonnementDomain } from '../domainConfig'
import { POPUP_FORM_WIDTH, POPUP_POSITION } from '../config'
import ShowErrors from '../ui/ShowErrors'
import { createLessonsLookupStore } from '../store/lessonsLookupStore'
import { discountLookup, validityLookup } from '../base/lookup'
import EventStore from './store/eventStore'
import moment from 'moment'
import { createRoomLookupStore } from '../store/roomStore'

interface Param {
	event?: dto.Event | null
	onClose: (id: number, needReload: boolean) => void
}

const toDate = (e?: dto.Event | null): Date | null => {
	if (e == null) {
		return null
	}
	return new Date(e.startDate)
}

const CreateEditEvent = observer((param: Param) => {
	const store = useLocalObservable(() => new EventStore())
	const [date, setDate] = useState<Date | null>(toDate(param.event))
	const [lessonsId, setLessonsId] = useState<number | null>(
		param.event?.lessonId || null
	)
	const [roomId, setRoomId] = useState<number | null>(
		param.event?.roomId || null
	)

	const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!date || !lessonsId || !roomId) {
			store.addError(RuleCaption.requiredFieldsNotAssigned())
			return
		}

		if (param.event) {
			const res = await store.edit(param.event.id, {
				startDate: date.toISOString(),
				lessonId: lessonsId,
				roomId: roomId
			})
			if (res && store.value?.id) param.onClose(store.value.id, true)
		} else {
			const res = await store.create({
				startDate: date.toISOString(),
				lessonId: lessonsId,
				roomId: roomId
			})
			if (res && store.value?.id) param.onClose(store.value.id, true)
		}
	}

	const onClose = () => {
		if (!store.loading) param.onClose(-1, false)
	}

	const form = () => {
		return (
			<form onSubmit={onSubmit}>
				<ShowErrors errors={store.errors} />
				<fieldset disabled={store.loading}>
					{/*LessonId*/}
					<div className='required'>
						<label className='small mb-1' htmlFor='inputName'>
							{'Lesson'}
						</label>
						<Lookup
							disabled={store.loading}
							className='mb-3'
							placeholder={'Select lesson'}
							dataSource={createLessonsLookupStore()}
							searchEnabled={false}
							displayExpr={item =>
								item ? `${item.name} (${item.durationMinute} min.)` : ''
							}
							defaultValue={lessonsId}
							onValueChanged={e => setLessonsId(e.value.id)}
						>
							<DropDownOptions
								showTitle={false}
								shading={false}
								fullScreen={false}
							/>
							<Validator>
								<RequiredRule message={RuleCaption.required('Lesson')} />
							</Validator>
						</Lookup>
					</div>
					{/*roomId*/}
					<div className='required'>
						<label className='small mb-1' htmlFor='inputName'>
							{'Room'}
						</label>
						<Lookup
							disabled={store.loading}
							className='mb-3'
							placeholder={'Select room'}
							dataSource={createRoomLookupStore()}
							searchEnabled={false}
							displayExpr={item => (item ? `${item.name}` : '')}
							defaultValue={roomId}
							onValueChanged={e => setRoomId(e.value.id)}
						>
							<DropDownOptions
								showTitle={false}
								shading={false}
								fullScreen={false}
							/>
							<Validator>
								<RequiredRule message={RuleCaption.required('Lesson')} />
							</Validator>
						</Lookup>
					</div>
					{/*Start date*/}
					<div className='required'>
						<label className='small mb-1' htmlFor='inputName'>
							{'Start date'}
						</label>
						<DateBox
							disabled={store.loading}
							defaultValue={date}
							type='datetime'
							min={moment().toISOString()}
							onValueChanged={e => setDate(e.value)}
						/>
					</div>
				</fieldset>
				<hr className='my-3' />
				<div className='d-flex justify-content-end gap-3'>
					<Button
						className={'dx-btn'}
						type='default'
						stylingMode='outlined'
						onClick={onClose}
						disabled={store.loading}
					>
						{'Cancel'}
					</Button>
					<Button
						className={'dx-btn'}
						type='default'
						useSubmitBehavior={true}
						stylingMode='contained'
						disabled={store.loading}
					>
						{store.loading ? '...' : buttonTitle()}
					</Button>
				</div>
			</form>
		)
	}

	const title = () => {
		if (param.event == null) return 'Create event'
		return 'Edit event'
	}

	const buttonTitle = () => {
		if (param.event == null) return 'Create'
		return 'Edit'
	}

	return (
		<>
			{/*Костыль нужны для перерисовки в Popup*/}
			{store.errors.length > 0 && <>Errors</>}
			{store.loading && <>Loading</>}
			<Popup
				width={POPUP_FORM_WIDTH}
				height={'auto'}
				position={POPUP_POSITION}
				showTitle={true}
				visible={true}
				title={title()}
				dragEnabled={false}
				hideOnOutsideClick={false}
				onHiding={onClose}
				contentRender={form}
			/>
		</>
	)
})

export default CreateEditEvent
