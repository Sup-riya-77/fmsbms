import PaymentService from '../services/PaymentService';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRef, useEffect } from 'react';
import AuthService from '../services/auth.service';
import 'bootstrap/dist/css/bootstrap.min.css';
 
const PaymentManagement = () => {
  const [newPayment, setNewPayment] = useState({
    billId:'',
    familyId: '',
    paymentMethod:''
  });
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
 
  const form = useRef();
  const navigate = useNavigate();
 
  useEffect(() => {
    fetchPayments();
  }, []);
 
  const fetchPayments = () => {
    const username = AuthService.getCurrentUser().username;
    console.log(username);
    //const id= AccountHolderService.getId(username);
    PaymentService.getId(username)
    .then(id => {
    console.log(typeof id); // This should log "number" if id is now resolved to a number
    console.log(id);        // This should log the resolved id value
    return PaymentService.viewPayments(id);
})
      .then(response => {
        setPayments(response);
        console.log(response);
      })
      .catch(error => {
        console.error('Error fetching Payments:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPayment({ ...newPayment, [name]: value });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
 
    PaymentService.addPayment(newPayment)
      .then(() => {
        alert('Payment added successfully');
        setNewPayment({
            billId:'',
            familyId: '',
            paymentMethod:''
        });
        fetchPayments();
      })
      .catch(error => {
        console.error('Error adding Payment:', error);
        alert('An error occurred while adding Payment');
      })
      .finally(() => {
        setLoading(false);
      });
  };
 
  const fetchPayment = async (paymentId) => {
    try {
      const payment = await PaymentService.getPayment(paymentId);
      setSelectedPayment(payment); // Set the selected device
    } catch (error) {
      console.error('Error fetching Payemnt by ID : ', error);
    }
  };


 
  return (
    <div className="container">
      <h2>ADD PAYMENT</h2>
      <div className="card card-container">
        <form onSubmit={handleSubmit} ref={form}>
        <div className="mb-3">
            <label htmlFor="billId" className="form-label">Bill ID : </label>
            <input type="number" className="form-control" id="billId" name="billId" value={newPayment.billId} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="familyId" className="form-label">Family ID : </label>
            <input type="number" className="form-control" id="familyId" name="familyId" value={newPayment.familyId} onChange={handleInputChange} required />
          </div>
          {/* <div className="mb-3">
            <label htmlFor="paymentMethod" className="form-label">Payment Method : </label>
            <input  className="form-control" id="paymentMethod" name="paymentMethod" value={newBill.paymentMethod} onChange={handleInputChange} required />
          </div> */}
          <div className="form-group">
          <label>Payment Method : </label>
          <select
            name="paymentMethod"
            value={newPayment.paymentMethod}
            onChange={handleInputChange}
            required
          >
  
            <option value="">Select Payment Method</option>
            <option value="DEBITCARD">DEBITCARD</option>
            <option value="CREDITCARD">CREDITCARD</option>
            <option value="UPI">UPI</option>
            <option value="NETBANKING">NETBANKING</option>

            
          </select>
        </div>
          
          <button type="submit" className="btn btn-primary" disabled={loading}>SUBMIT</button>
        </form>
      </div>
 
      <table className="table mt-4">
        <thead>
          <tr>
          <th>Payment ID</th>
            <th>Bill ID</th>
            <th>Amount</th>
            <th>Payment Date</th>
            <th>Payment Method</th>
            <th>Family Id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.paymentId}>
              <td>{payment.paymentId}</td>
              <td>{payment.bill.billId}</td>
              <td>{payment.amout}</td>
              <td>{payment.paymentDate}</td>
              <td>{payment.paymentMethod}</td>
              <td>{payment.family.familyId}</td>
              <td>
              <button className="btn btn-default" onClick={() => fetchPayment(payment.paymentId)}>View</button>
             </td>
            </tr>
          ))}
        </tbody>
      </table> 
       {selectedPayment && (
        <div>
          <h3>Payment details :</h3>
          <p>Payment ID : {selectedPayment.paymentId}</p>
          <p>Bill ID : {selectedPayment.bill.billId}</p>
          <p>Family ID : {selectedPayment.family.familyId}</p>
          <p>payment Date : {selectedPayment.paymentDate}</p>
          <p>Amount:{selectedPayment.amout}</p>
          <p>payment Method : {selectedPayment.paymentMethod}</p>
         
        </div>
     )}
    </div>
  );
};
 
export default PaymentManagement;