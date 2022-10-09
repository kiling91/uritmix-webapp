import React from "react";

const BtnLoading = () => {
  return (
    <div className="text-center">
      <span
        className="spinner-grow spinner-grow-sm"
        role="status"
        aria-hidden="true"
      />
      {"Loading"}...
    </div>
  );
};

export default BtnLoading;
