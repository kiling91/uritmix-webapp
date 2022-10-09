import React from "react";

type Props = {
  visible: boolean;
};

const Visibility: React.FC<Props> = ({ visible, children }) => (
  <>{visible ? children : <></>}</>
);

export default Visibility;
