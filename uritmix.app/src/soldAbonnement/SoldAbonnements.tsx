import React, { useMemo, useState } from 'react'
import ShowErrors from '../ui/ShowErrors'
import { RuleCaption } from '../base/ruleCaption'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import PersonCard from '../person/PersonCard'
import Tooltip from '../ui/Tooltip'
import { Button, DataGrid, TextBox } from 'devextreme-react'
import { dto } from 'uritmix.api'
import PersonAbonnementsTable from './SoldAbonnementsTable'
import Visibility from '../ui/Visibility'
import SaleAbonnement from './SaleAbonnement'
import SoldAbonnementInfo from './SoldAbonnementInfo'

enum ModalMode {
	Create,
	Info,
	None
}

const SoldAbonnements = observer(() => {
	const { id } = useParams<{ id: string }>()
	const personId = Number(id)
	if (!personId)
		return <ShowErrors errors={[RuleCaption.parameterError('id')]} />
	const [dataGrid, setDataGrid] = useState<DataGrid | null>(null)
	const [modalMode, setModalMode] = useState(ModalMode.None)
	const [current, setCurrent] = useState<dto.SoldAbonnement | null>(null)

	const initDataGrid = (grid: DataGrid) => {
		setDataGrid(grid)
	}

	const onSale = () => {
		setModalMode(ModalMode.Create)
	}

	const onCloseModal = (_: number, needReload: boolean) => {
		if (needReload) dataGrid?.instance.refresh()
		setModalMode(ModalMode.None)
	}

	const onSelect = (value: dto.SoldAbonnement) => {
		setCurrent(value)
		setModalMode(ModalMode.Info)
	}

	const search = (text: string) => {
		dataGrid?.instance.searchByText(text)
	}

	const abonnementsTable = useMemo(
		() => (
			<PersonAbonnementsTable
				personId={personId}
				initDataGrid={initDataGrid}
				onSelect={onSelect}
			/>
		),
		[]
	)

	const body = () => {
		return (
			<div>
				{abonnementsTable}
				{/*Modal*/}
				<Visibility visible={modalMode == ModalMode.Create}>
					<SaleAbonnement personId={personId} onClose={onCloseModal} />
				</Visibility>

				<Visibility visible={modalMode == ModalMode.Info}>
					<SoldAbonnementInfo soldAbonnement={current} onClose={onCloseModal} />
				</Visibility>
				{/*Modal*/}
			</div>
		)
	}

	const toolBar = () => {
		return (
			<div className='d-flex justify-content-between'>
				<Tooltip tooltip={'Sale abonnement'}>
					<Button
						icon={'money'}
						type='default'
						text={'Sale'}
						onClick={onSale}
						className={'mx-1'}
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
		)
	}

	return <PersonCard body={body()} toolbar={toolBar()} />
})

export default SoldAbonnements
