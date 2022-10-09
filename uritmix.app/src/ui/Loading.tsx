import React from 'react';

const Loading = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner">
        <div className="bounce1" />
        <div className="bounce2" />
        <div className="bounce3" />
      </div>
    </div>
  );
};

export default Loading;
