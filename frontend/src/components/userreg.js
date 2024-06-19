import React from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.css';

function Userreg() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // submit the form data to your backend or database
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="mobilenumber">Mobile Number</label>
        <input
          className="form-control"
          type="text"
          id="mobilenumber"
          placeholder="Enter mobile number"
          {...register('mobilenumber')}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default Userreg;