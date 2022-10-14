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
import { RequiredRule, StringLengthRule } from 'devextreme-react/validator'
import { RuleCaption } from '../base/ruleCaption'
import { PersonDomain } from '../domainConfig'
import { POPUP_FORM_WIDTH, POPUP_POSITION } from '../config'
import PersonStore from './store/personStore'
import ShowErrors from '../ui/ShowErrors'
import Visibility from '../ui/Visibility'

interface Param {
	isTrainer: boolean
	onClose: (id: number, needReload: boolean) => void
}

const CreatePerson = observer((param: Param) => {
	const store = useLocalObservable(() => new PersonStore())

	const [firstName, setFirstName] = useState<string>()
	const [lastName, setLastName] = useState<string>()
	const [description, setDescription] = useState<string>()

	const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (firstName && lastName) {
			const res = await store.create({
				firstName: firstName,
				lastName: lastName,
				isTrainer: param.isTrainer,
				description: description
			})
			if (res && store.value?.id) param.onClose(store.value.id, true)
			return
		}
		store.addError(RuleCaption.requiredFieldsNotAssigned())
	}

	const onClose = () => {
		if (!store.loading) param.onClose(-1, false)
	}

	const form = () => {
		return (
			<form onSubmit={onSubmit}>
				<ShowErrors errors={store.errors} />
				<fieldset disabled={store.loading}>
					{/*Firstname*/}
					<div className='required'>
						<label className='small mb-1'>{'Firstname'}</label>
						<TextBox
							mode='text'
							disabled={store.loading}
							className='mb-3'
							placeholder={'Enter firstaname'}
							value={firstName}
							onValueChanged={e => setFirstName(e.value)}
						>
							<Validator>
								<RequiredRule message={RuleCaption.required('Firstaname')} />
								<StringLengthRule
									trim
									min={PersonDomain.NameMinLength}
									max={PersonDomain.NameMaxLength}
									message={RuleCaption.length(
										PersonDomain.NameMinLength,
										PersonDomain.NameMaxLength
									)}
								/>
							</Validator>
						</TextBox>
					</div>
					{/*Lastname*/}
					<div className='required'>
						<label className='small mb-1'>{'Lastname'}</label>
						<TextBox
							mode='text'
							className='mb-3'
							placeholder={'Enter lastname'}
							value={lastName}
							disabled={store.loading}
							onValueChanged={e => setLastName(e.value)}
						>
							<Validator>
								<RequiredRule message={RuleCaption.required('Lastname')} />
								<StringLengthRule
									trim
									min={PersonDomain.NameMinLength}
									max={PersonDomain.NameMaxLength}
									message={RuleCaption.length(
										PersonDomain.NameMinLength,
										PersonDomain.NameMaxLength
									)}
								/>
							</Validator>
						</TextBox>
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
							max={PersonDomain.DescriptionMaxLength}
							message={RuleCaption.lengthMax(PersonDomain.DescriptionMaxLength)}
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
						{store.loading ? '...' : 'Create'}
					</Button>
				</div>
			</form>
		)
	}

	const title = () => {
		if (param.isTrainer) return 'Create person'
		return 'Create customer'
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

export default CreatePerson
