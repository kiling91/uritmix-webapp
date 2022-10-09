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
import lessonsStore from './store/lessonsStore'
import { dto } from 'uritmix.api'

interface Param {
	initDataGrid: (dataGrid: DataGrid) => void
	onEdit: (value: dto.Lesson) => void
}

const LessonsTable = ({ initDataGrid, onEdit }: Param) => {
	const onEditClick = (e: any) => {
		e.event.preventDefault()
		onEdit(e.row.data)
	}

	return (
		<DataGrid
			ref={ref => {
				if (ref) initDataGrid(ref)
			}}
			dataSource={lessonsStore()}
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
				dataField='trainer'
				caption={'Trainer'}
				dataType='string'
				allowHeaderFiltering={false}
				cellRender={data => (
					<p>
						{data.value.firstName} {data.value.lastName}
					</p>
				)}
			/>

			<Column
				dataField='durationMinute'
				caption={'Duration (minute)'}
				dataType='number'
				allowHeaderFiltering={false}
			/>
			<Column
				dataField='basePrice'
				caption={'Trainer price'}
				dataType='number'
				allowHeaderFiltering={false}
			/>
			<Column
				dataField='description'
				caption={'Description'}
				dataType='string'
				allowHeaderFiltering={false}
			/>
			<Column type='buttons'>
				<Button hint={'Edit'} icon='edit' onClick={onEditClick} />
			</Column>
			{/**/}
		</DataGrid>
	)
}

export default LessonsTable
