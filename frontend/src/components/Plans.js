import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

function Plans() {
  return (
    <div className="container">
      {/* <h1 className="text-center">Find India's most-loved plans here</h1> */}
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <p className="card-text">Monthly Rental of</p>
              <h4 className="card-title">₹599</h4>
              <small className="text-muted">No. of connections 2</small>
              {/* <button className="btn btn-primary btn-block mt-3">View details</button> */}
              <hr />
              <p className="card-text">Price per connection<br />Rs. 300</p>
              <p className="card-text">Calling<br />UNLIMITED</p>
              <p className="card-text">SMS<br />100/day</p>
              <p className="card-text">Data<br />105 GB</p>
              
              
              <Link to="/paymentgateway"><button className="btn btn-primary btn-block" >Recharge</button></Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
        <div className="card">
            <div className="card-body">
              <p className="card-text">Monthly Rental of</p>
              <h4 className="card-title">₹999</h4>
              <small className="text-muted">No. of connections 4</small>
              {/* <button className="btn btn-primary btn-block mt-3">View details</button> */}
              <hr />
              <p className="card-text">Price per connection<br />Rs. 250</p>
              <p className="card-text">Calling<br />UNLIMITED</p>
              <p className="card-text">SMS<br />100/day</p>
              <p className="card-text">Data<br />190 GB</p>
              <Link to="/paymentgateway"><button className="btn btn-primary btn-block" >Recharge</button></Link>
            </div>
        </div>
        </div>
        <div className="col-md-3">
        <div className="card">
            <div className="card-body">
              <p className="card-text">Monthly Rental of</p>
              <h4 className="card-title">₹1199</h4>
              <small className="text-muted">No. of connections 4</small>
              {/* <button className="btn btn-primary btn-block mt-3">View details</button> */}
              <hr />
              <p className="card-text">Price per connection<br />Rs. 300</p>
              <p className="card-text">Calling<br />UNLIMITED</p>
              <p className="card-text">SMS<br />100/day</p>
              <p className="card-text">Data<br />240 GB</p>
              <Link to="/paymentgateway"><button className="btn btn-primary btn-block" >Recharge</button></Link>
            </div>
        </div>
        </div>
        <div className="col-md-3">
        <div className="card">
            <div className="card-body">
              <p className="card-text">Monthly Rental of</p>
              <h4 className="card-title">₹1499</h4>
              <small className="text-muted">No. of connections 5</small>
              {/* <button className="btn btn-primary btn-block mt-3">View details</button> */}
              <hr />
              <p className="card-text">Price per connection<br />Rs. 300</p>
              <p className="card-text">Calling<br />UNLIMITED</p>
              <p className="card-text">SMS<br />100/day</p>
              <p className="card-text">Data<br />320 GB</p>
              <Link to="/paymentgateway"><button className="btn btn-primary btn-block" >Recharge</button></Link>
            </div>
        </div>
        </div>
      </div>
      {/* <div className="text-center mt-3">
        <button className="btn btn-link">View all plans</button>
      </div> */}
    </div>
  );
};

export default Plans;