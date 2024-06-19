import BillingService from '../services/BillingService';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useRef, useEffect } from 'react';
import AccountHolderService from '../services/AccountHolderService';
import AuthService from '../services/auth.service';
 
import 'bootstrap/dist/css/bootstrap.min.css';
 
const BillManagement = () => {
  const [newBill, setNewBill] = useState({
    familyId: ''
  });
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
 
  const form = useRef();
  const navigate = useNavigate();
 
  useEffect(() => {
    fetchBills();
  }, []);
 
  const fetchBills = () => {
     BillingService.viewBills()
      .then(response => {
        setBills(response);
        console.log(response);
      })
      .catch(error => {
        console.error('Error fetching Bills:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBill({ ...newBill, [name]: value });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
 
    BillingService.addBill(newBill)
      .then(() => {
        alert('Bill added successfully');
        setNewBill({
          familyId: ''
        });
        fetchBills();
      })
      .catch(error => {
        console.error('Error adding Bill:', error);
        alert('An error occurred while adding Bill');
      })
      .finally(() => {
        setLoading(false);
      });
  };
 
  const fetchBill = async (billId) => {
    try {
      const bill = await BillingService.getBill(billId);
      setSelectedBill(bill); // Set the selected device
    } catch (error) {
      console.error('Error fetching bill by ID : ', error);
    }
  };


 
  return (
    <div className="container">
      <h2>ADD BILL</h2>
      <div className="card card-container">
        <form onSubmit={handleSubmit} ref={form}>
          <div className="mb-3">
            <label htmlFor="familyId" className="form-label">Family ID : </label>
            <input type="number" className="form-control" id="familyId" name="familyId" value={newBill.familyId} onChange={handleInputChange} required />
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={loading}>SUBMIT</button>
        </form>
      </div>
 
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Bill ID</th>
            <th>BillingPeriodStart</th>
            <th>BillingPeriodEnd</th>
            <th>Amount</th>
            <th>Paid</th>
            <th>Due Date</th>
            <th>Family Id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bills.map(bill => (
            <tr key={bill.billId}>
              <td>{bill.billId}</td>
              <td>{bill.billingPeriodStart}</td>
              <td>{bill.billingPeriodEnd}</td>
              <td>{bill.amount}</td>
              <td>{bill.paid.toString()}</td>
              <td>{bill.dueDate}</td>
              <td>{bill.family.familyId}</td>
              <td>
              <button className="btn btn-default" onClick={() => fetchBill(bill.billId)}>View</button>
             </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedBill && (
        <div>
          <h3>Bill details :</h3>
          <p>Bill ID : {selectedBill.billId}</p>
          <p>Family ID : {selectedBill.family.familyId}</p>
          <p>Billing Period Start : {selectedBill.billingPeriodStart}</p>
          <p>BillingPeriodEnd : {selectedBill.billingPeriodEnd}</p>
          <p>Amount:{selectedBill.amount}</p>
          <p>Paid : {selectedBill.paid.toString()}</p>
          <p>Due Date : {selectedBill.dueDate}</p>
        </div>
     )}
    </div>
  );
};
 
export default BillManagement;