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
import roomsStore from './store/roomsStore'
import { dto } from 'uritmix.api'

interface Param {
	initDataGrid: (dataGrid: DataGrid) => void
	onEdit: (value: dto.Person) => void
}

const RoomsTable = ({ initDataGrid, onEdit }: Param) => {
	const editClick = (e: any) => {
		e.event.preventDefault()
		onEdit(e.row.data)
	}

	return (
		<DataGrid
			ref={ref => {
				if (ref) initDataGrid(ref)
			}}
			dataSource={roomsStore()}
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

			<Column
				dataField='description'
				caption={'Description'}
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

export default RoomsTable
