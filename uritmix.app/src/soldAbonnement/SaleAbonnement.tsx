import React, { useEffect, useState } from 'react'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { Popup } from 'devextreme-react/popup'
import { Button, Validator } from 'devextreme-react'
import { Lookup, DropDownOptions } from 'devextreme-react/lookup'
import { RequiredRule, StringLengthRule } from 'devextreme-react/validator'
import { dto } from 'uritmix.api'
import { RuleCaption } from '../base/ruleCaption'
import { AbonnementDomain } from '../domainConfig'
import { POPUP_FORM_WIDTH, POPUP_POSITION } from '../config'
import SoldAbonnementStore from './store/soldAbonnementStore'
import ShowErrors from '../ui/ShowErrors'
import {
	discountLookup,
	discountToString,
	discountToValue,
	validityToString
} from '../base/lookup'
import { AbonnementsLookupStore } from '../store/abonnementsLookupStore'

interface Param {
	personId: number
	onClose: (id: number, needReload: boolean) => void
}

const SaleAbonnement = observer((param: Param) => {
	const store = useLocalObservable(() => new SoldAbonnementStore())

	const [abonnementId, setAbonnementId] = useState<number | null>(null)
	const [abonnement, setAbonnement] = useState<dto.Abonnement | null>(null)

	const [discount, setDiscount] = useState<dto.DiscountView>(
		dto.DiscountView.D0
	)
	const [abonnementStore, setAbonnementStore] =
		useState<AbonnementsLookupStore | null>(null)

	useEffect(() => {
		setAbonnementStore(new AbonnementsLookupStore())
	}, [])

	useEffect(() => {
		const fetchData = async () => {
			if (abonnementId) {
				const a = await abonnementStore.byKey(abonnementId)
				setAbonnement(a)
			}
		}
		fetchData().then()
	}, [abonnementId])

	const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (abonnementId == null)
			store.addError(RuleCaption.requiredFieldsNotAssigned())
		const res = await store.sale({
			abonnementId: abonnementId,
			discount: discount,
			personId: param.personId
		})
		if (res && store.value?.id) param.onClose(store.value.id, true)

		return
	}

	const onClose = () => {
		if (!store.loading) param.onClose(-1, false)
	}

	const renderAbonnement = () => {
		return (
			<table className='table table-bordered table-striped'>
				<colgroup>
					<col className='col-md-4' />
					<col className='col-md-8' />
				</colgroup>
				<tbody>
					<tr>
						<td>
							<b>{'Validity'}</b>
						</td>
						<td>{validityToString(abonnement.validity)}</td>
					</tr>
					<tr>
						<td>
							<b>{'Max number of visits'}</b>
						</td>
						<td>{abonnement.maxNumberOfVisits}</td>
					</tr>
					<tr>
						<td>
							<b>{'Max discount'}</b>
						</td>
						<td>{discountToString(abonnement.maxDiscount)}</td>
					</tr>
					<tr>
						<td>
							<b>{'Base price'}</b>
						</td>
						<td>{abonnement.basePrice}</td>
					</tr>
					<tr>
						<td colSpan={2}>
							{abonnement.lessons.map(lesson => (
								<h5 key={lesson.id} className='d-inline'>
									<span className='badge bg-secondary me-1'>{lesson.name}</span>
								</h5>
							))}
						</td>
					</tr>
				</tbody>
			</table>
		)
	}

	const getDiscountLookup = () => {
		let discount = discountLookup()
		let result: { id: dto.DiscountView; name: string }[] = []
		for (let d of discount) {
			if (d.id <= abonnement.maxDiscount) {
				result.push(d)
			}
		}
		return result
	}

	const totalPrice = () => {
		return abonnement.basePrice * (1.0 - discountToValue(discount))
	}

	const form = () => {
		return (
			<form onSubmit={onSubmit}>
				<ShowErrors errors={store.errors} />
				<fieldset disabled={store.loading}>
					{/*AbonnementId*/}
					<div className='required'>
						<label className='small mb-1' htmlFor='inputName'>
							{'Abonnement'}
						</label>
						<Lookup
							disabled={store.loading}
							className='mb-3'
							placeholder={'Select abonnement'}
							dataSource={abonnementStore.getStore()}
							searchEnabled={false}
							displayExpr={item => (item ? `${item.name}` : '')}
							defaultValue={abonnementId}
							onValueChanged={e => setAbonnementId(e.value.id)}
						>
							<DropDownOptions
								showTitle={false}
								shading={false}
								fullScreen={false}
							/>
							<Validator>
								<RequiredRule message={RuleCaption.required('Abonnement')} />
							</Validator>
						</Lookup>
					</div>
					{abonnement && renderAbonnement()}
					{/*Discount*/}
					{abonnement && (
						<>
							<div className='required'>
								<label className='small mb-1' htmlFor='inputName'>
									{'Discount'}
								</label>
								<Lookup
									className='mb-3'
									placeholder={'Select discount'}
									showCancelButton={false}
									showDropDownButton={false}
									dataSource={getDiscountLookup()}
									disabled={store.loading}
									displayExpr='name'
									valueExpr='id'
									searchEnabled={false}
									value={discount}
									onValueChanged={e => setDiscount(e.value)}
								>
									<DropDownOptions showTitle={false} />
									<Validator>
										<RequiredRule
											message={RuleCaption.required('Max discount')}
										/>
									</Validator>
								</Lookup>
							</div>
							<h5>Total price: {totalPrice()}</h5>
						</>
					)}
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
		return 'Sale abonnement'
	}

	const buttonTitle = () => {
		return 'Sale'
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

export default SaleAbonnement
