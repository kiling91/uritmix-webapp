import React from 'react'
import { observer } from 'mobx-react-lite'
import { Popup } from 'devextreme-react/popup'
import { Button } from 'devextreme-react'
import { dto } from 'uritmix.api'
import { POPUP_FORM_WIDTH, POPUP_POSITION } from '../config'
import { discountToString, validityToString } from '../base/lookup'

interface Param {
	soldAbonnement: dto.SoldAbonnement
	onClose: (id: number, needReload: boolean) => void
}

const SoldAbonnementInfo = observer((param: Param) => {
	const onClose = () => {
		param.onClose(-1, false)
	}

	const formatDate = (date: string) => {
		var mydate = new Date(date)
		return mydate.toLocaleDateString()
	}

	const baseAbonnementData = () => {
		return (
			<div>
				<h4>{'Basic abonnement info'}</h4>
				<table className='table table-bordered table-striped'>
					<colgroup>
						<col className='col-md-4' />
						<col className='col-md-8' />
					</colgroup>
					<tbody>
						<tr>
							<td>
								<b>{'Name'}</b>
							</td>
							<td>{param.soldAbonnement.name}</td>
						</tr>
						<tr>
							<td>
								<b>{'Validity'}</b>
							</td>
							<td>{validityToString(param.soldAbonnement.validity)}</td>
						</tr>
						<tr>
							<td>
								<b>{'Max number of visits'}</b>
							</td>
							<td>{param.soldAbonnement.numberOfVisits}</td>
						</tr>
						<tr>
							<td>
								<b>{'Max discount'}</b>
							</td>
							<td>{param.soldAbonnement.discount}</td>
						</tr>
						<tr>
							<td>
								<b>{'Base price'}</b>
							</td>
							<td>{param.soldAbonnement.basePrice}</td>
						</tr>
						<tr>
							<td colSpan={2}>
								{param.soldAbonnement.lessons.map(lesson => (
									<h5 className='d-inline'>
										<span key={lesson.id} className='badge bg-secondary me-1'>
											{lesson.name}
										</span>
									</h5>
								))}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}

	const soldAbonnementData = () => {
		return (
			<div>
				<h4>{'Sold abonnement info'}</h4>
				<table className='table table-bordered table-striped'>
					<colgroup>
						<col className='col-md-4' />
						<col className='col-md-8' />
					</colgroup>
					<tbody>
						<tr>
							<td>
								<b>{'Active'}</b>
							</td>
							<td>{param.soldAbonnement.active ? 'Yes' : 'No'}</td>
						</tr>
						<tr>
							<td>
								<b>{'Date sale'}</b>
							</td>
							<td>{formatDate(param.soldAbonnement.dateSale)}</td>
						</tr>
						<tr>
							<td>
								<b>{'Date expiration'}</b>
							</td>
							<td>{formatDate(param.soldAbonnement.dateExpiration)}</td>
						</tr>
						<tr>
							<td>
								<b>{'Price sold'}</b>
							</td>
							<td>{param.soldAbonnement.priceSold}</td>
						</tr>
						<tr>
							<td>
								<b>{'Discount'}</b>
							</td>
							<td>{discountToString(param.soldAbonnement.discount)}</td>
						</tr>
						<tr>
							<td>
								<b>{'Number of visits'}</b>
							</td>
							<td>{param.soldAbonnement.visitCounter}</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}

	const form = () => {
		return (
			<form>
				{baseAbonnementData()}
				{soldAbonnementData()}
				<hr className='my-3' />
				<div className='d-flex justify-content-end gap-3'>
					<Button
						className={'dx-btn'}
						type='default'
						stylingMode='contained'
						onClick={onClose}
						//disabled={store.loading}
					>
						{'Ok'}
					</Button>
				</div>
			</form>
		)
	}

	const title = () => {
		return 'Abonnement ' + param.soldAbonnement.name
	}

	return (
		<>
			{/*Костыль нужны для перерисовки в Popup*/}
			{/*store.errors.length > 0 && <>Errors</>*/}
			{/*store.loading && <>Loading</>*/}
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

export default SoldAbonnementInfo
