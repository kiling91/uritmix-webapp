import React, { useMemo, useState } from 'react'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { Popup } from 'devextreme-react/popup'
import {
	Button,
	CheckBox,
	TagBox,
	TextArea,
	TextBox,
	Validator
} from 'devextreme-react'
import { Lookup, DropDownOptions } from 'devextreme-react/lookup'
import { RequiredRule, StringLengthRule } from 'devextreme-react/validator'
import NumberBox from 'devextreme-react/number-box'
import { dto } from 'uritmix.api'
import { RuleCaption } from '../base/ruleCaption'
import { AbonnementDomain } from '../domainConfig'
import { POPUP_FORM_WIDTH, POPUP_POSITION } from '../config'
import AbonnementStore from './store/abonnementStore'
import ShowErrors from '../ui/ShowErrors'
import { createLessonsLookupStore } from './store/lessonsLookupStore'

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
	const [numberOfVisits, setNumberOfVisits] = useState<number>(
		param.abonnement?.numberOfVisits || AbonnementDomain.NumberOfVisitsMin
	)
	const [basePrice, setBasePrice] = useState<number>(
		param.abonnement?.basePrice || AbonnementDomain.BasePriceMin
	)
	const [discount, setDiscount] = useState(
		param.abonnement?.discount || dto.DiscountView.D0
	)

	const validityLookup = () => {
		return [
			{
				Id: dto.AbonnementValidityView.OneDay,
				Name: 'One day'
			},
			{
				Id: dto.AbonnementValidityView.OneMonth,
				Name: 'One month'
			},
			{
				Id: dto.AbonnementValidityView.ThreeMonths,
				Name: 'Three months'
			},
			{
				Id: dto.AbonnementValidityView.HalfYear,
				Name: 'Half year'
			},
			{
				Id: dto.AbonnementValidityView.Year,
				Name: 'Year'
			}
		]
	}

	const discountLookup = () => {
		return [
			{
				Id: dto.DiscountView.D0,
				Name: 'Discount 0%'
			},
			{
				Id: dto.DiscountView.D5,
				Name: 'Discount 5%'
			},
			{
				Id: dto.DiscountView.D10,
				Name: 'Discount 10%'
			},
			{
				Id: dto.DiscountView.D15,
				Name: 'Discount 15%'
			},
			{
				Id: dto.DiscountView.D20,
				Name: 'Discount 20%'
			},
			{
				Id: dto.DiscountView.D25,
				Name: 'Discount 25%'
			},
			{
				Id: dto.DiscountView.D30,
				Name: 'Discount 30%'
			},
			{
				Id: dto.DiscountView.D40,
				Name: 'Discount 40%'
			},
			{
				Id: dto.DiscountView.D50,
				Name: 'Discount 50%'
			},
			{
				Id: dto.DiscountView.D60,
				Name: 'Discount 60%'
			},
			{
				Id: dto.DiscountView.D70,
				Name: 'Discount 70%'
			},
			{
				Id: dto.DiscountView.D80,
				Name: 'Discount 80%'
			},
			{
				Id: dto.DiscountView.D90,
				Name: 'Discount 90%'
			}
		]
	}

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
				numberOfVisits: numberOfVisits,
				basePrice: basePrice,
				lessonIds: lessonsId,
				discount: discount
			})
			if (res && store.value?.id) param.onClose(store.value.id, true)
		} else {
			const res = await store.create({
				name: name,
				validity: validity,
				numberOfVisits: numberOfVisits,
				basePrice: basePrice,
				lessonIds: lessonsId,
				discount: discount
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
							displayExpr='Name'
							valueExpr='Id'
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
							defaultValue={numberOfVisits}
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
							{'Price'}
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
							displayExpr='Name'
							valueExpr='Id'
							searchEnabled={false}
							value={discount}
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
						{store.loading ? '...' : 'Create'}
					</Button>
				</div>
			</form>
		)
	}

	const title = () => {
		return 'Create abonnement'
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
