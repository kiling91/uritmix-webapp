import React from 'react';

const ShowErrors = ({ errors }: { errors: string[] }) => {
  return (
    <div>
      {errors.map((error, index) => (
        <div className="alert alert-danger" role="alert" key={index}>
          {error}
        </div>
      ))}
    </div>
  );
};

export default ShowErrors;
