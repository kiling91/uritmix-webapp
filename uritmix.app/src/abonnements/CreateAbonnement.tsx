import React, { useState } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { Popup } from 'devextreme-react/popup';
import { Button, CheckBox, TextArea, TextBox, Validator } from 'devextreme-react';
import { Lookup, DropDownOptions } from 'devextreme-react/lookup';
import {  RequiredRule, StringLengthRule } from 'devextreme-react/validator';
import NumberBox from 'devextreme-react/number-box';
import { dto } from "uritmix.api";
import { RuleCaption } from '../base/ruleCaption';
import { PersonDomain } from '../domainConfig';
import { POPUP_FORM_WIDTH, POPUP_POSITION } from '../config';
import AbonnementStore from "./store/abonnementStore"
import ShowErrors from '../ui/ShowErrors';
import Visibility from "../ui/Visibility";

interface Param {
  isTrainer: boolean
  onClose: (id: number, needReload: boolean) => void;
}

const CreateAbonnement = observer((param: Param) => {
  const store = useLocalObservable(() => new AbonnementStore());
  const [name, setName] = useState<string>();
  const [validity, setValidity] = useState(dto.AbonnementValidityView.OneDay);
  const [numberOfVisits, setNumberOfVisits] = useState<number>(1);
  const [basePrice, setBasePrice] = useState<number>(0.0);
  const [discount, setDiscount] = useState(dto.DiscountView.D0);

  const validityLookup = () => {
    return [
      {
        Id: dto.AbonnementValidityView.OneDay,
        Name: "One day",
      },
      {
        Id: dto.AbonnementValidityView.OneMonth,
        Name: "One month",
      },
      {
        Id: dto.AbonnementValidityView.ThreeMonths,
        Name: "Three months",
      },
      {
        Id: dto.AbonnementValidityView.HalfYear,
        Name: "Half year",
      },
      {
        Id: dto.AbonnementValidityView.Year,
        Name: "Year",
      },
    ];
  };

  const discountLookup = () => {
    return [
      {
        Id: dto.DiscountView.D0,
        Name: "Discount 0%",
      },
      {
        Id: dto.DiscountView.D5,
        Name: "Discount 5%",
      },
      {
        Id: dto.DiscountView.D10,
        Name: "Discount 10%",
      },
      {
        Id: dto.DiscountView.D15,
        Name: "Discount 15%",
      },
      {
        Id: dto.DiscountView.D20,
        Name: "Discount 20%",
      },
      {
        Id: dto.DiscountView.D25,
        Name: "Discount 25%",
      },
      {
        Id: dto.DiscountView.D30,
        Name: "Discount 30%",
      },
      {
        Id: dto.DiscountView.D40,
        Name: "Discount 40%",
      },
      {
        Id: dto.DiscountView.D50,
        Name: "Discount 50%",
      },
      {
        Id: dto.DiscountView.D60,
        Name: "Discount 60%",
      },
      {
        Id: dto.DiscountView.D70,
        Name: "Discount 70%",
      },
      {
        Id: dto.DiscountView.D80,
        Name: "Discount 80%",
      },
      {
        Id: dto.DiscountView.D90,
        Name: "Discount 90%",
      },
    ];
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name) {
      const res = await store.create({
        // ***
      });
      if (res && store.value?.id) 
        param.onClose(store.value.id, true);
      return;
    }
    store.addError(RuleCaption.requiredFieldsNotAssigned());
  };

  const onClose = () => {
    if (!store.loading) param.onClose(-1, false);
  };

  const form = () => {
    return (
      <form onSubmit={onSubmit}>
        <ShowErrors errors={store.errors} />
        <fieldset disabled={store.loading}>
          {/*Firstname*/}
          <div className="required">
            <label className="small mb-1">
              {'Firstname'}
            </label>
            <TextBox
              mode="text"
              className="mb-3"
              placeholder={'Enter name'}
              value={name}
              onValueChanged={(e) => setName(e.value)}
            >
              <Validator>
                <RequiredRule message={RuleCaption.required('Name')} />
                <StringLengthRule
                  trim
                  min={PersonDomain.PersonNameAndEmailMinLength}
                  max={PersonDomain.PersonNameAndEmailMaxLength}
                  message={RuleCaption.length(PersonDomain.PersonNameAndEmailMinLength, PersonDomain.PersonNameAndEmailMaxLength)}
                />
              </Validator>
            </TextBox>
          </div>
          {/*Validity*/}
          <div className="required">
            <label className="small mb-1" htmlFor="inputName">
              {"Validity"}
            </label>
            <Lookup
              className="mb-3"
              placeholder={'Select validity'}
              showCancelButton={false}
              showDropDownButton={false}
              dataSource={validityLookup()}
              displayExpr="Name"
              valueExpr="Id"
              searchEnabled={false}
              value={validity}
              onValueChanged={(e) => setValidity(e.value)}
            >
              <DropDownOptions showTitle={false} />
              <Validator>
                <RequiredRule message={RuleCaption.required('Validity')} />
              </Validator>
            </Lookup>
          </div>
          {/*Max number of visits*/}
          <div className="required">
            <label className="small mb-1" htmlFor="inputName">
              {"Max number of visits"}
            </label>

            <NumberBox
              disabled={store.loading}
              defaultValue={numberOfVisits}
              onValueChanged={(e) => setNumberOfVisits(e.value)}
              showSpinButtons={true}
              min={1}
              format="#0"
            />
          </div>

          {/*Price*/}
          <div className="required">
            <label className="small mb-1" htmlFor="inputName">
              {'Price'}
            </label>
            <NumberBox
              disabled={store.loading}
              defaultValue={basePrice}
              onValueChanged={(e) => setBasePrice(e.value)}
              min={0.0}
              format="#0.##"
            />
          </div>
          {/*Discount*/}
          <div className="required">
            <label className="small mb-1" htmlFor="inputName">
              {"Max discount"}
            </label>
            <Lookup
              className="mb-3"
              placeholder={'Select max discount'}
              showCancelButton={false}
              showDropDownButton={false}
              dataSource={discountLookup()}
              displayExpr="Name"
              valueExpr="Id"
              searchEnabled={false}
              value={discount}
              onValueChanged={(e) => setDiscount(e.value)}
            >
              <DropDownOptions showTitle={false} />
              <Validator>
                <RequiredRule message={RuleCaption.required( "Max discount")} />
              </Validator>
            </Lookup>
          </div>
          {/*Discount*/}
        </fieldset>
        <hr className="my-3" />
        <div className="d-flex justify-content-end gap-3">
          <Button className={'dx-btn'} type="default" stylingMode="outlined" onClick={onClose} disabled={store.loading}>
            {'Cancel'}
          </Button>
          <Button
            className={'dx-btn'}
            type="default"
            useSubmitBehavior={true}
            stylingMode="contained"
            disabled={store.loading}
          >
            {store.loading ? '...' : 'Create'}
          </Button>
        </div>
      </form>
    );
  };

  const title = () => {
    return 'Create abonnement'
  }

  return (
    <>
      {/*Костыль нужны для перерисовки в Popup*/}
      <Visibility visible={store.errors.length > 0 || store.loading}>
        <div />
      </Visibility>
      <Popup
        width={POPUP_FORM_WIDTH}
        height={'auto'}
        position={POPUP_POSITION}
        showTitle={true}
        visible={true}
        title={title()}
        dragEnabled={false}
        closeOnOutsideClick={false}
        onHiding={onClose}
        contentRender={form}
      />
    </>
  );
});

export default CreateAbonnement;
