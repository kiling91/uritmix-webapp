import React, { useState } from 'react'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { Popup } from 'devextreme-react/popup'
import { Button, TagBox, TextBox, Validator } from 'devextreme-react'
import { Lookup, DropDownOptions } from 'devextreme-react/lookup'
import { RequiredRule, StringLengthRule } from 'devextreme-react/validator'
import NumberBox from 'devextreme-react/number-box'
import { dto } from 'uritmix.api'
import { RuleCaption } from '../base/ruleCaption'
import { AbonnementDomain } from '../domainConfig'
import { POPUP_FORM_WIDTH, POPUP_POSITION } from '../config'
import AbonnementStore from './store/abonnementStore'
import ShowErrors from '../ui/ShowErrors'
import { createLessonsLookupStore } from '../store/lessonsLookupStore'
import { discountLookup, validityLookup } from '../base/lookup'

interface Param {
	abonnement?: dto.Abonnement | null
	onClose: (id: number, needReload: boolean) => void
}

const toArray = (abonnement?: dto.Abonnement | null): number[] => {
	let lessonsId: number[] = []
	if (abonnement != null) {
		for (let lesson of abonnement!.lessons) {
			lessonsId.push(lesson.id)
		}
	}
	return lessonsId
}

const CreateEditAbonnement = observer((param: Param) => {
	const store = useLocalObservable(() => new AbonnementStore())
	const [name, setName] = useState<string>(param.abonnement?.name || null)
	const [lessonsId, setLessonsId] = useState<number[]>(
		toArray(param.abonnement)
	)
	const [validity, setValidity] = useState(
		param.abonnement?.validity || dto.AbonnementValidityView.OneDay
	)
	const [maxNumberOfVisits, setNumberOfVisits] = useState<number>(
		param.abonnement?.maxNumberOfVisits || AbonnementDomain.NumberOfVisitsMin
	)
	const [basePrice, setBasePrice] = useState<number>(
		param.abonnement?.basePrice || AbonnementDomain.BasePriceMin
	)
	const [maxDiscount, setDiscount] = useState(
		param.abonnement?.maxDiscount || dto.DiscountView.D0
	)

	const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!name || lessonsId.length == 0) {
			store.addError(RuleCaption.requiredFieldsNotAssigned())
			return
		}

		if (param.abonnement) {
			const res = await store.edit(param.abonnement.id, {
				name: name,
				validity: validity,
				maxNumberOfVisits: maxNumberOfVisits,
				basePrice: basePrice,
				lessonIds: lessonsId,
				maxDiscount: maxDiscount
			})
			if (res && store.value?.id) param.onClose(store.value.id, true)
		} else {
			const res = await store.create({
				name: name,
				validity: validity,
				maxNumberOfVisits: maxNumberOfVisits,
				basePrice: basePrice,
				lessonIds: lessonsId,
				maxDiscount: maxDiscount
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
									min={AbonnementDomain.NameMinLength}
									max={AbonnementDomain.NameMaxLength}
									message={RuleCaption.length(
										AbonnementDomain.NameMinLength,
										AbonnementDomain.NameMaxLength
									)}
								/>
							</Validator>
						</TextBox>
					</div>
					{/*LessonId*/}
					<div className='required'>
						<label className='small mb-1' htmlFor='inputName'>
							{'Lessons'}
						</label>
						<TagBox
							disabled={store.loading}
							className='mb-3'
							placeholder={'Select lessons'}
							dataSource={createLessonsLookupStore()}
							searchEnabled={false}
							displayExpr={item => item?.name}
							defaultValue={lessonsId}
							onValueChanged={e => {
								let lessonsId: number[] = []
								for (let lesson of e.value) {
									if (lesson.id == undefined) {
										lessonsId.push(lesson)
									} else {
										lessonsId.push(lesson.id)
									}
								}

								setLessonsId(lessonsId)
							}}
						>
							<DropDownOptions
								showTitle={false}
								shading={false}
								fullScreen={false}
							/>
							<Validator>
								<RequiredRule message={RuleCaption.required('Lessons')} />
							</Validator>
						</TagBox>
					</div>
					{/*Validity*/}
					<div className='required'>
						<label className='small mb-1' htmlFor='inputName'>
							{'Validity'}
						</label>
						<Lookup
							className='mb-3'
							placeholder={'Select validity'}
							showCancelButton={false}
							showDropDownButton={false}
							dataSource={validityLookup()}
							disabled={store.loading}
							displayExpr='name'
							valueExpr='id'
							searchEnabled={false}
							value={validity}
							onValueChanged={e => setValidity(e.value)}
						>
							<DropDownOptions showTitle={false} />
							<Validator>
								<RequiredRule message={RuleCaption.required('Validity')} />
							</Validator>
						</Lookup>
					</div>
					{/*Max number of visits*/}
					<div className='required'>
						<label className='small mb-1' htmlFor='inputName'>
							{'Max number of visits'}
						</label>
						<NumberBox
							disabled={store.loading}
							defaultValue={maxNumberOfVisits}
							onValueChanged={e => setNumberOfVisits(e.value)}
							showSpinButtons={true}
							min={AbonnementDomain.NumberOfVisitsMin}
							max={AbonnementDomain.NumberOfVisitsMax}
							format='#0'
						/>
					</div>
					{/*Price*/}
					<div className='required'>
						<label className='small mb-1' htmlFor='inputName'>
							{'Base price'}
						</label>
						<NumberBox
							disabled={store.loading}
							defaultValue={basePrice}
							onValueChanged={e => setBasePrice(e.value)}
							min={AbonnementDomain.BasePriceMin}
							max={AbonnementDomain.BasePriceMax}
							format='#0.##'
						/>
					</div>
					{/*Discount*/}
					<div className='required'>
						<label className='small mb-1' htmlFor='inputName'>
							{'Max discount'}
						</label>
						<Lookup
							className='mb-3'
							placeholder={'Select max discount'}
							showCancelButton={false}
							showDropDownButton={false}
							dataSource={discountLookup()}
							disabled={store.loading}
							displayExpr='name'
							valueExpr='id'
							searchEnabled={false}
							value={maxDiscount}
							onValueChanged={e => setDiscount(e.value)}
						>
							<DropDownOptions showTitle={false} />
							<Validator>
								<RequiredRule message={RuleCaption.required('Max discount')} />
							</Validator>
						</Lookup>
					</div>
					{/*Discount*/}
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
		if (param.abonnement == null) return 'Create abonnement'
		return 'Edit abonnement'
	}

	const buttonTitle = () => {
		if (param.abonnement == null) return 'Create'
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

export default CreateEditAbonnement
