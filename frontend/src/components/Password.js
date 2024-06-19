import React, { useState } from 'react';

const Password = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform forgot password logic here
    console.log('Email:', email);
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <h4>Reset Password</h4>
          </div>
          <div className="card-body">
          <form className='form'>
                <div className='box'>
                    <input type='email' placeholder='E-mail'></input><br/><br/>
                    <input type='text' placeholder='Enter new password'></input><br/><br/>
                    <input type='text' placeholder='Confirm password'></input> <br/><br/>
                    <button type='submit' className='button'><a href='./change'>Reset</a></button>
                </div>      
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Password;