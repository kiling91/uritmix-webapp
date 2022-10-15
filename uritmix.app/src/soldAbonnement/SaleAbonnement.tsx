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
import SoldAbonnementStore from './store/soldAbonnementStore'
import ShowErrors from '../ui/ShowErrors'
import { createLessonsLookupStore } from '../store/lessonsLookupStore'
import { discountLookup } from '../store/lookup'

interface Param {
	onClose: (id: number, needReload: boolean) => void
}

const SaleAbonnement = observer((param: Param) => {
	const store = useLocalObservable(() => new SoldAbonnementStore())

	const [discount, setDiscount] = useState(dto.DiscountView.D0)

	const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		store.addError(RuleCaption.requiredFieldsNotAssigned())
		return
	}

	const onClose = () => {
		if (!store.loading) param.onClose(-1, false)
	}

	const form = () => {
		return (
			<form onSubmit={onSubmit}>
				<ShowErrors errors={store.errors} />
				<fieldset disabled={store.loading}>
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
