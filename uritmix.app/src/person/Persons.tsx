import React, { useMemo } from "react";
import { Button, DataGrid, TextBox } from "devextreme-react";
import { useState } from "react";
import PersonsTable from "./PersonsTable";
import { dto } from "uritmix.api";
import Tooltip from "../ui/Tooltip";
import Visibility from "../ui/Visibility";
import CreatePerson from "./CreatePerson";
import { useNavigate } from "react-router-dom";

enum ModalMode {
  CreateTrainer,
  CreateCustomer,
  None,
}

const Persons = () => {
  const [dataGrid, setDataGrid] = useState<DataGrid | null>(null);
  const [modalMode, setModalMode] = useState(ModalMode.None);
  const navigate = useNavigate();

  const initDataGrid = (grid: DataGrid) => {
    setDataGrid(grid);
  };

  const search = (text: string) => {
    dataGrid?.instance.searchByText(text);
  };

  const onCreateTrainer = () => {
    setModalMode(ModalMode.CreateTrainer);
  };

  const onCreateCustomer = () => {
    setModalMode(ModalMode.CreateCustomer);
  };

  const onSelect = (value: dto.Person) => {
    navigate(`${value.id}`);
  };

  const onCloseModal = (_: number, needReload: boolean) => {
    if (needReload) dataGrid?.instance.refresh();
    setModalMode(ModalMode.None);
  };

  const personsTable = useMemo(
    () => <PersonsTable initDataGrid={initDataGrid} onSelect={onSelect} />,
    []
  );

  return (
    <div className="card">
      <div className="card-header">
        <div className="d-flex align-items-center justify-content-between">
          <div>{"Persons"}</div>
          <div className="d-flex justify-content-between">
            <Tooltip tooltip={"Create customer"}>
              <Button
                icon="plus"
                type="default"
                text="Create customer"
                className={"mx-1"}
                onClick={onCreateCustomer}
              />
            </Tooltip>
            <Tooltip tooltip={"Create trainer"}>
              <Button
                icon="plus"
                type="success"
                text="Create trainer"
                className={"mx-1"}
                onClick={onCreateTrainer}
              />
            </Tooltip>
            <TextBox
              mode="text"
              valueChangeEvent="keyup"
              placeholder={"Search" + "..."}
              showClearButton={true}
              onValueChanged={(e) => search(e.value)}
            />
          </div>
        </div>
      </div>
      <div className="card-body">
        {personsTable}
        {/*Modal*/}
        <Visibility
          visible={
            modalMode == ModalMode.CreateTrainer ||
            modalMode == ModalMode.CreateCustomer
          }
        >
          <CreatePerson
            onClose={onCloseModal}
            isTrainer={modalMode == ModalMode.CreateTrainer}
          />
        </Visibility>
        {/*Modal*/}
      </div>
    </div>
  );
};

export default Persons;
