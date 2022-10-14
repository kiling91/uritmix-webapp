import React from 'react'
import DataGrid, {
	Button,
	Column,
	Editing,
	FilterRow,
	Lookup,
	Pager,
	Paging,
	Scrolling
} from 'devextreme-react/data-grid'
import abonnementsStore from './store/abonnementsStore'
import { dto } from 'uritmix.api'
import { discountLookup, validityLookup } from './lookup'

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
			rowAlternationEnabled={true}
			showBorders={false}
			showRowLines={true}
			columnAutoWidth={true}
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
				dataField='validity'
				caption={'Validity'}
				//allowSorting={false}
				allowHeaderFiltering={true}
				allowSearch={false}
			>
				<Lookup
					dataSource={validityLookup()}
					valueExpr='id'
					displayExpr='name'
				/>
			</Column>
			<Column
				dataField='basePrice'
				caption={'Price'}
				type={'number'}
				//allowSorting={false}
				allowHeaderFiltering={true}
				allowSearch={false}
			/>
			<Column
				dataField='discount'
				caption={'Discount'}
				//allowSorting={false}
				allowHeaderFiltering={true}
				allowSearch={false}
			>
				<Lookup
					dataSource={discountLookup()}
					valueExpr='id'
					displayExpr='name'
				/>
			</Column>
			<Column
				dataField='numberOfVisits'
				caption={'Number of visits'}
				type={'number'}
				allowHeaderFiltering={true}
				allowSearch={false}
			/>
			<Column
				dataField='lessons'
				caption={'Lessons'}
				allowHeaderFiltering={false}
				allowSearch={false}
				minWidth={'180'}
				cellRender={data =>
					data.value.map(lesson => (
						<span className='badge bg-secondary me-1'>{lesson.name}</span>
					))
				}
			/>
			{/**/}
			<Column type='buttons'>
				<Button hint={'Edit'} icon='edit' onClick={editClick} />
			</Column>
			{/**/}
		</DataGrid>
	)
}

export default AbonnementsTable
