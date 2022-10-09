import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icon from 'react-feather';


type BackNavbarProps = {
  path: string;
};

const BackNavbar = ({ path }: BackNavbarProps) => {
  const navigate = useNavigate();

  const back = () => {
    navigate(path);
  };

  return (
    <a role="button" className="nav-link" onClick={back}>
      <Icon.ChevronLeft width={24} height={24}/>
    </a>
  );
};

export default BackNavbar;
