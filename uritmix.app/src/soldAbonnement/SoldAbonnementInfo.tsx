import React from 'react'
import { observer } from 'mobx-react-lite'
import { Popup } from 'devextreme-react/popup'
import { Button } from 'devextreme-react'
import { dto } from 'uritmix.api'
import { POPUP_FORM_WIDTH, POPUP_POSITION } from '../config'

interface Param {
	soldAbonnement: dto.SoldAbonnement
	onClose: (id: number, needReload: boolean) => void
}

const SoldAbonnementInfo = observer((param: Param) => {
	const onClose = () => {
		param.onClose(-1, false)
	}

	const form = () => {
		return (
			<form>
				<h1>{param.soldAbonnement.name}</h1>
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
		return 'Abonnement info'
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
