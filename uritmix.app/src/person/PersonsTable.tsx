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

interface Param {
	initDataGrid: (dataGrid: DataGrid) => void
	onSelect: (value: dto.Person) => void
}

const PersonsTable = ({ initDataGrid, onSelect }: Param) => {
	const userInfoClick = (e: any) => {
		e.event.preventDefault()
		onSelect(e.row.data)
	}

	/*const authRole = () => {
    return [
      {
        id: dto.AuthRoleView.Admin,
        name: "Administrator",
      },
      {
        id: dto.AuthRoleView.Manager,
        name: "Manager",
      },
    ];
  };

  const authStatus = () => {
    return [
      {
        id: dto.AuthStatusView.NotActivated,
        name: "Not Activated",
      },
      {
        id: dto.AuthStatusView.Activated,
        name: "Activated",
      },
      {
        id: dto.AuthStatusView.Blocked,
        name: "Blocked",
      },
    ];
  };*/

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
				dataField='id'
				caption={'ID'}
				dataType='number'
				allowHeaderFiltering={false}
				allowEditing={false}
			/>
			<Column
				dataField='firstName'
				caption={'Firstname'}
				dataType='string'
				allowHeaderFiltering={false}
			/>
			<Column
				dataField='lastName'
				caption={'Lastname'}
				dataType='string'
				allowHeaderFiltering={false}
			/>
			<Column
				dataField='isTrainer'
				caption={'Trainer'}
				dataType='boolean'
				allowHeaderFiltering={false}
			/>
			<Column
				dataField='haveAuth'
				caption={'Auth'}
				dataType='boolean'
				allowHeaderFiltering={false}
			/>
			{/*<Column dataField="auth.email" caption={'Email'} dataType="string" allowHeaderFiltering={false} />

      <Column dataField="auth.role"
        caption={'Role'}
        dataType="string"
        allowSorting={false}
        allowHeaderFiltering={true}
        allowSearch={false}>
        <Lookup dataSource={authRole()} valueExpr="id" displayExpr="name" />
      </Column>

      <Column dataField="auth.status"
        caption={'Status'}
        dataType="string"
        allowSorting={false}
        allowHeaderFiltering={true}
        allowSearch={false}>
        <Lookup dataSource={authStatus()} valueExpr="id" displayExpr="name" />
      </Column>*/}

			<Column type='buttons'>
				<Button hint={'Info'} icon='info' onClick={userInfoClick} />
			</Column>
			{/**/}
		</DataGrid>
	)
}

export default PersonsTable
