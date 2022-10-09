import React from "react";

type Props = {
  marginTop?: true;
};

const Container: React.FC<Props> = ({ marginTop = false, children }) => {
  const top = marginTop ? "mt-4" : "";
  return <div className={`container-xl ${top}`}>{children}</div>;
};

export default Container;
