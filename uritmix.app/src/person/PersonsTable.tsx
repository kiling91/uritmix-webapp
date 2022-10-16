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
import personsDataStore from './store/personsStore'
import { dto } from 'uritmix.api'
import { nameof } from 'ts-simple-nameof'

interface Param {
	initDataGrid: (dataGrid: DataGrid) => void
	onSelect: (value: dto.Person) => void
}

const PersonsTable = ({ initDataGrid, onSelect }: Param) => {
	const userInfoClick = (e: any) => {
		e.event.preventDefault()
		onSelect(e.row.data)
	}

	return (
		<DataGrid
			ref={ref => {
				if (ref) initDataGrid(ref)
			}}
			dataSource={personsDataStore()}
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
				dataField={nameof<dto.Person>(o => o.id)}
				caption={'ID'}
				dataType='number'
				allowHeaderFiltering={false}
				allowEditing={false}
			/>
			<Column
				dataField={nameof<dto.Person>(o => o.firstName)}
				caption={'Firstname'}
				dataType='string'
				allowHeaderFiltering={false}
			/>
			<Column
				dataField={nameof<dto.Person>(o => o.lastName)}
				caption={'Lastname'}
				dataType='string'
				allowHeaderFiltering={false}
			/>
			<Column
				dataField={nameof<dto.Person>(o => o.isTrainer)}
				caption={'Trainer'}
				dataType='boolean'
				allowHeaderFiltering={false}
			/>
			<Column
				dataField={nameof<dto.Person>(o => o.haveAuth)}
				caption={'Auth'}
				dataType='boolean'
				allowHeaderFiltering={false}
			/>
			<Column
				dataField={nameof<dto.Person>(o => o.auth.email)}
				caption={'Email'}
				dataType='string'
				allowHeaderFiltering={false}
			/>

			{/*<Column
				dataField='auth.role'
				caption={'Role'}
				dataType='string'
				allowSorting={false}
				allowHeaderFiltering={true}
				allowSearch={false}
			>
				<Lookup dataSource={authRole()} valueExpr='Id' displayExpr='Name' />
			</Column>

			<Column
				dataField='auth.status'
				caption={'Status'}
				dataType='string'
				allowSorting={false}
				allowHeaderFiltering={true}
				allowSearch={false}
			>
				<Lookup dataSource={authStatus()} valueExpr='id' displayExpr='name' />
			</Column>*/}

			<Column type='buttons'>
				<Button hint={'Info'} icon='info' onClick={userInfoClick} />
			</Column>
			{/**/}
		</DataGrid>
	)
}

export default PersonsTable
