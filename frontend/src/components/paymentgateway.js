import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

const PaymentGateway = () => {
  const handlePayment = (paymentMethod) => {
    // Handle the payment process based on the selected payment method
    console.log(`Processing payment using ${paymentMethod}`);
    // Add your payment processing logic here
  };

  return (
    <div className="container">
      <h1 className="text-center">Payment Gateway</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">PhonePay</h5>
              <p className="card-text">Pay using PhonePay</p>
              <Link to='/paymentsuccess'><button
                className="btn btn-primary"
                onClick={() => handlePayment('PhonePay')}
              >
                Pay with PhonePay
              </button></Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">GPay</h5>
              <p className="card-text">Pay using GPay</p>
              <Link to='/paymentsuccess'><button
                className="btn btn-primary"
                onClick={() => handlePayment('GPay')}
              >
                Pay with GPay
              </button></Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">NetBanking</h5>
              <p className="card-text">Pay using NetBanking</p>
              <Link to='/paymentsuccess'><button
                className="btn btn-primary"
                onClick={() => handlePayment('NetBanking')}
              >
                Pay with NetBanking
              </button></Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Credit/Debit Card</h5>
              <p className="card-text">Pay using Credit/Debit Card</p>
              <Link to='/paymentsuccess'><button
                className="btn btn-primary"
                onClick={() => handlePayment('NetBanking')}
              >
                Pay with Credit/Debit Card
              </button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;