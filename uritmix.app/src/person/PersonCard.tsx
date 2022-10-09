import React, { ReactChild, ReactChildren } from "react";
import BackNavbar from "../ui/BackNavbar";
import { AppUrl } from "../config";
import { NavLink, useParams } from "react-router-dom";

type PersonCardProps = {
  body: ReactChild | ReactChildren;
  toolbar: ReactChild | ReactChildren | null
};

const PersonCard = ({ body, toolbar }: PersonCardProps) => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="card">
      <div className="card-header">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex justify-content-between">
            <BackNavbar path={AppUrl.Persons} />
            <ul className="nav nav-tabs card-header-tabs ms-3">
              <li className="nav-item">
                <NavLink className="nav-link" end to={`/persons/${id}`}>{"Person"}</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={`/persons/${id}/abonnements`}>{"Abonnements"}</NavLink>
              </li>
            </ul>
          </div>
          {toolbar}
        </div>
      </div>
      <div className="card-body">
        {body}
      </div>
    </div>
  );
};

export default PersonCard;