import React, { useState } from 'react'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { Popup } from 'devextreme-react/popup'
import {
	Button,
	CheckBox,
	TextArea,
	TextBox,
	Validator
} from 'devextreme-react'
import { Lookup, DropDownOptions } from 'devextreme-react/lookup'
import { RequiredRule, StringLengthRule } from 'devextreme-react/validator'
import NumberBox from 'devextreme-react/number-box'
import { dto } from 'uritmix.api'
import { RuleCaption } from '../base/ruleCaption'
import { LessonDomain } from '../domainConfig'
import { POPUP_FORM_WIDTH, POPUP_POSITION } from '../config'
import LessonStore from './store/lessonStore'
import ShowErrors from '../ui/ShowErrors'
import { createPersonsLookupStore } from './store/personsLookupStore'

interface Param {
	lesson?: dto.Lesson | null
	onClose: (id: number, needReload: boolean) => void
}

const CreateEditLesson = observer((param: Param) => {
	const store = useLocalObservable(() => new LessonStore())
	const [name, setName] = useState<string>(param.lesson?.name ?? '')
	const [description, setDescription] = useState<string>(
		param.lesson?.description ?? ''
	)
	const [trainerId, setTrainerId] = useState<number | null>(
		param.lesson?.trainer?.id ?? null
	)
	const [durationMinute, setDurationMinute] = useState<number>(
		LessonDomain.DurationMinuteMin
	)
	const [basePrice, setBasePrice] = useState<number>(LessonDomain.BasePriceMin)

	console.warn(`Trainer id ${trainerId}`)

	const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (name == null || trainerId == null || name.trim() == '') {
			store.addError(RuleCaption.requiredFieldsNotAssigned())
			return
		}

		if (param.lesson == null) {
			const res = await store.create({
				name: name,
				description: description,
				trainerId: trainerId,
				durationMinute: durationMinute,
				basePrice: basePrice
			})
			if (res && store.value?.id) param.onClose(store.value.id, true)
		} else {
			const res = await store.edit(param.lesson.id, {
				name: name,
				description: description,
				trainerId: trainerId,
				durationMinute: durationMinute,
				basePrice: basePrice
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
					{/*Name*/}
					<div className='required'>
						<label className='small mb-1'>{'Name'}</label>
						<TextBox
							mode='text'
							disabled={store.loading}
							className='mb-3'
							placeholder={'Enter name'}
							value={name}
							onValueChanged={e => setName(e.value)}
						>
							<Validator>
								<RequiredRule message={RuleCaption.required('Name')} />
								<StringLengthRule
									trim
									min={LessonDomain.NameMinLength}
									max={LessonDomain.NameMaxLength}
									message={RuleCaption.length(
										LessonDomain.NameMinLength,
										LessonDomain.NameMaxLength
									)}
								/>
							</Validator>
						</TextBox>
					</div>
					{/*TrainerId*/}
					<div className='required'>
						<label className='small mb-1' htmlFor='inputName'>
							{'Trainer'}
						</label>
						<Lookup
							disabled={store.loading}
							className='mb-3'
							placeholder={'Select trainer'}
							dataSource={createPersonsLookupStore()}
							searchEnabled={false}
							displayExpr={item =>
								item ? `${item.firstName} ${item.lastName}` : ''
							}
							defaultValue={trainerId}
							onValueChanged={e => setTrainerId(e.value.id)}
						>
							<DropDownOptions
								showTitle={false}
								shading={false}
								fullScreen={false}
							/>
							<Validator>
								<RequiredRule message={RuleCaption.required('Trainer')} />
							</Validator>
						</Lookup>
					</div>
					{/*Duration minute*/}
					<div className='required'>
						<label className='small mb-1' htmlFor='inputName'>
							{'Duration minute'}
						</label>
						<NumberBox
							disabled={store.loading}
							defaultValue={durationMinute}
							onValueChanged={e => setDurationMinute(e.value)}
							showSpinButtons={true}
							min={LessonDomain.DurationMinuteMin}
							max={LessonDomain.DurationMinuteMax}
							format='#0'
						/>
					</div>
					{/*Base trainer price*/}
					<div className='required'>
						<label className='small mb-1' htmlFor='inputName'>
							{'Trainer price'}
						</label>
						<NumberBox
							disabled={store.loading}
							defaultValue={basePrice}
							onValueChanged={e => setBasePrice(e.value)}
							min={LessonDomain.BasePriceMin}
							max={LessonDomain.BasePriceMax}
							format='#0.##'
						/>
					</div>
					{/*Description*/}
					<label className='small mb-1'>{'Description'}</label>
					<TextArea
						disabled={store.loading}
						value={description}
						onValueChanged={e => setDescription(e.value)}
					>
						<StringLengthRule
							trim
							max={LessonDomain.DescriptionMaxLength}
							message={RuleCaption.lengthMax(LessonDomain.DescriptionMaxLength)}
						/>
					</TextArea>
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

	const buttonTitle = () => {
		if (param.lesson == null) return 'Create'
		return 'Edit'
	}

	const title = () => {
		if (param.lesson == null) return 'Create lesson'
		return 'Edit lesson'
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

export default CreateEditLesson
