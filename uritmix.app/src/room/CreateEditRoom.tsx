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
import { AbonnementDomain, RoomDomain } from '../domainConfig'
import { POPUP_FORM_WIDTH, POPUP_POSITION } from '../config'
import RoomStore from './store/roomStore'
import ShowErrors from '../ui/ShowErrors'

interface Param {
	room?: dto.Room | null
	onClose: (id: number, needReload: boolean) => void
}

const CreateEditRoom = observer((param: Param) => {
	const store = useLocalObservable(() => new RoomStore())
	const [name, setName] = useState<string>(param.room?.name ?? '')
	const [description, setDescription] = useState<string>(
		param.room?.description ?? ''
	)

	const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (name == null || name.trim() == '') {
			store.addError(RuleCaption.requiredFieldsNotAssigned())
			return
		}

		if (param.room == null) {
			const res = await store.create({
				name: name,
				description: description
			})
			if (res && store.value?.id) param.onClose(store.value.id, true)
		} else {
			const res = await store.edit(param.room.id, {
				name: name,
				description: description
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
									min={RoomDomain.NameMinLength}
									max={RoomDomain.NameMaxLength}
									message={RuleCaption.length(
										RoomDomain.NameMinLength,
										RoomDomain.NameMaxLength
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
							max={RoomDomain.DescriptionMaxLength}
							message={RuleCaption.lengthMax(RoomDomain.DescriptionMaxLength)}
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
		if (param.room == null) return 'Create room'
		return 'Edit room'
	}

	{
		/*Костыль нужны для перерисовки в Popup*/
	}
	console.log(store.loading)
	return (
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
	)
})

export default CreateEditRoom
