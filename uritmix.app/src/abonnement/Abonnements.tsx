import React, { useMemo } from 'react'
import { Button, DataGrid, TextBox } from 'devextreme-react'
import { useState } from 'react'
import { dto } from 'uritmix.api'
import Tooltip from '../ui/Tooltip'
import Visibility from '../ui/Visibility'
import AbonnementsTable from './AbonnementsTable'
import CreateAbonnement from './CreateEditAbonnement'

enum ModalMode {
	Create,
	Edit,
	None
}

const Abonnements = () => {
	const [dataGrid, setDataGrid] = useState<DataGrid | null>(null)
	const [modalMode, setModalMode] = useState(ModalMode.None)
	const [current, setCurrent] = useState<dto.Abonnement | null>(null)

	const initDataGrid = (grid: DataGrid) => {
		setDataGrid(grid)
	}

	const search = (text: string) => {
		dataGrid?.instance.searchByText(text)
	}

	const onCreate = () => {
		setModalMode(ModalMode.Create)
	}

	const onEditClick = (value: dto.Abonnement) => {
		setCurrent(value)
		setModalMode(ModalMode.Edit)
	}

	const onCloseModal = (_: number, needReload: boolean) => {
		if (needReload) dataGrid?.instance.refresh()
		setCurrent(null)
		setModalMode(ModalMode.None)
	}

	const abonnementsTable = useMemo(
		() => (
			<AbonnementsTable initDataGrid={initDataGrid} onEditClick={onEditClick} />
		),
		[]
	)

	return (
		<div className='card'>
			<div className='card-header'>
				<div className='d-flex align-items-center justify-content-between'>
					<div>{'Abonnements'}</div>
					<div className='d-flex justify-content-between'>
						<Tooltip tooltip={'Create abonnement'}>
							<Button
								icon='plus'
								type='default'
								text='Create abonnement'
								className={'mx-1'}
								onClick={onCreate}
							/>
						</Tooltip>
						<TextBox
							mode='text'
							valueChangeEvent='keyup'
							placeholder={'Search' + '...'}
							showClearButton={true}
							onValueChanged={e => search(e.value)}
						/>
					</div>
				</div>
			</div>
			<div className='card-body'>
				{abonnementsTable}
				{/*Modal*/}
				<Visibility visible={modalMode == ModalMode.Create}>
					<CreateAbonnement onClose={onCloseModal} />
				</Visibility>
				<Visibility visible={modalMode == ModalMode.Edit}>
					<CreateAbonnement onClose={onCloseModal} abonnement={current} />
				</Visibility>
				{/*Modal*/}
			</div>
		</div>
	)
}

export default Abonnements
