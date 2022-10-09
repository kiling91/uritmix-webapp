import React, { useMemo } from 'react'
import { Button, DataGrid, TextBox } from 'devextreme-react'
import { useState } from 'react'
import { dto } from 'uritmix.api'
import Tooltip from '../ui/Tooltip'
import Visibility from '../ui/Visibility'
import RoomsTable from './RoomsTable'
import CreateEditRoom from './CreateEditRoom'

enum ModalMode {
	Create,
	Edit,
	None
}

const Rooms = () => {
	const [dataGrid, setDataGrid] = useState<DataGrid | null>(null)
	const [modalMode, setModalMode] = useState(ModalMode.None)
	const [current, setCurrent] = useState<dto.Room | null>(null)

	const initDataGrid = (grid: DataGrid) => {
		setDataGrid(grid)
	}

	const search = (text: string) => {
		dataGrid?.instance.searchByText(text)
	}

	const onCreate = () => {
		setModalMode(ModalMode.Create)
	}

	const onEdit = (value: dto.Room) => {
		setCurrent(value)
		setModalMode(ModalMode.Edit)
	}

	const onCloseModal = (_: number, needReload: boolean) => {
		if (needReload) dataGrid?.instance.refresh()
		setModalMode(ModalMode.None)
	}

	const abonnementsTable = useMemo(
		() => <RoomsTable initDataGrid={initDataGrid} onEdit={onEdit} />,
		[]
	)

	return (
		<div className='card'>
			<div className='card-header'>
				<div className='d-flex align-items-center justify-content-between'>
					<div>{'Rooms'}</div>
					<div className='d-flex justify-content-between'>
						<Tooltip tooltip={'Create room'}>
							<Button
								icon='plus'
								type='default'
								text='Create room'
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
					<CreateEditRoom onClose={onCloseModal} />
				</Visibility>

				<Visibility visible={modalMode == ModalMode.Edit}>
					<CreateEditRoom room={current} onClose={onCloseModal} />
				</Visibility>
				{/*Modal*/}
			</div>
		</div>
	)
}

export default Rooms
