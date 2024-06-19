import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.css';

function RegistrationForm() {
  const { register, handleSubmit } = useForm();
  const [familyMembers, setFamilyMembers] = useState(1);

  const handleAddMember = () => {
    setFamilyMembers(familyMembers + 1);
  };

  const handleRemoveMember = () => {
    if (familyMembers > 1) {
      setFamilyMembers(familyMembers - 1);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h2>Family Account Registration</h2>
            </div>
            <div className="card-body">
              <p>
                Number of family members: {familyMembers}
                <button className="btn btn-primary btn-sm ml-2" onClick={handleAddMember}>
                  +
                </button>
                <button className="btn btn-secondary btn-sm ml-1" onClick={handleRemoveMember}>
                  -
                </button>
              </p>
              {Array(familyMembers)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="mb-4">
                    <h3>Member {index + 1}</h3>
                    <div className="form-group">
                      <label htmlFor={`firstName-${index}`}>First Name</label>
                      <input
                        className="form-control"
                        type="text"
                        id={`firstName-${index}`}
                        placeholder="Enter First Name"
                        {...register(`firstName-${index}`)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`lastName-${index}`}>Last Name</label>
                      <input
                        className="form-control"
                        type="text"
                        id={`lastName-${index}`}
                        placeholder="Enter Last Name"
                        {...register(`lastName-${index}`)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`email-${index}`}>Email</label>
                      <input
                        className="form-control"
                        type="email"
                        id={`email-${index}`}
                        placeholder="Enter Email"
                        {...register(`email-${index}`)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`password-${index}`}>Password</label>
                      <input
                        className="form-control"
                        type="password"
                        id={`password-${index}`}
                        placeholder="Enter Password"
                        {...register(`password-${index}`)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`confirmPassword-${index}`}>Confirm Password</label>
                      <input
                        className="form-control"
                        type="password"
                        id={`confirmPassword-${index}`}
                        placeholder="Enter Confirm Password"
                        {...register(`confirmPassword-${index}`)}
                      />
                    </div>
                  </div>
                ))}
              <button className="btn btn-primary" onClick={handleSubmit(onSubmit)}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;