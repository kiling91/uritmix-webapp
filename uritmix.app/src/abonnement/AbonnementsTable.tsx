import React from 'react'
import DataGrid, {
	Button,
	Column,
	Editing,
	FilterRow,
	Pager,
	Paging,
	Scrolling
} from 'devextreme-react/data-grid'
import abonnementsStore from './store/abonnementsStore'
import { dto } from 'uritmix.api'

interface Param {
	initDataGrid: (dataGrid: DataGrid) => void
	onEditClick: (value: dto.Abonnement) => void
}

const AbonnementsTable = ({ initDataGrid, onEditClick }: Param) => {
	const editClick = (e: any) => {
		e.event.preventDefault()
		onEditClick(e.row.data)
	}

	return (
		<DataGrid
			ref={ref => {
				if (ref) initDataGrid(ref)
			}}
			dataSource={abonnementsStore()}
			remoteOperations={true}
			columnAutoWidth={true}
			rowAlternationEnabled={true}
			showBorders={false}
			showRowLines={true}
		>
			{/**/}
			<Editing
				useIcons={true}
				allowUpdating={false}
				allowAdding={false}
				allowDeleting={false}
			/>
			{/**/}
			<Scrolling rowRenderingMode='virtual' />
			<Paging defaultPageSize={10} />
			<Pager
				visible={true}
				allowedPageSizes={true}
				displayMode='full'
				showPageSizeSelector={10}
				showInfo={true}
				showNavigationButtons={true}
			/>
			{/**/}
			<FilterRow visible={true} />
			{/**/}
			<Column
				dataField='id'
				caption={'ID'}
				dataType='number'
				allowHeaderFiltering={false}
				allowEditing={false}
			/>
			<Column
				dataField='name'
				caption={'Name'}
				dataType='string'
				allowHeaderFiltering={false}
			/>

			<Column type='buttons'>
				<Button hint={'Edit'} icon='edit' onClick={editClick} />
			</Column>
			{/**/}
		</DataGrid>
	)
}

export default AbonnementsTable
