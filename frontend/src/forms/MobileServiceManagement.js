import AccountHolderService from '../services/AccountHolderService';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useRef, useEffect } from 'react';
import AuthService from '../services/auth.service';
 
import 'bootstrap/dist/css/bootstrap.min.css';
 
const MobileServiceManagement = () => {
  const [newService, setNewService] = useState({
    username:'',
    planType:''
  });
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
 
  const form = useRef();
  const navigate = useNavigate();
 
  useEffect(() => {
    fetchServices();
  }, []);
 
  const fetchServices = () => {
    const username = AuthService.getCurrentUser().username;
        console.log(username);
        //const id= AccountHolderService.getId(username);
        AccountHolderService.getId(username)
    .then(id => {
        console.log(typeof id); // This should log "number" if id is now resolved to a number
        console.log(id);        // This should log the resolved id value
        return AccountHolderService.viewServices(id);
    })
      .then(response => {
        setServices(response);
        console.log(response);
      })
      .catch(error => {
        console.error('Error fetching Services:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
 
    AccountHolderService.addService(newService)
      .then(() => {
        alert('Service added successfully');
        setNewService({
            username:'',
            planType:''    
        });
        fetchServices();
      })
      .catch(error => {
        console.error('Error adding Service:', error);
        alert('An error occurred while adding Service');
      })
      .finally(() => {
        setLoading(false);
      });
  };
 
  const fetchService = async (serviceId) => {
    try {
      const service = await AccountHolderService.getService(serviceId);
      setSelectedService(service); // Set the selected device
    } catch (error) {
      console.error('Error fetching service by ID : ', error);
    }
  };


 
  return (
    <div className="container">
      <h2>ADD MOBIILE SERVICE</h2>
      <div className="card card-container">
        <form onSubmit={handleSubmit} ref={form}>
        <div className="mb-3">
            <label htmlFor="username" className="form-label">Username : </label>
            <input type="text" className="form-control" id="username" name="username" value={newService.username} onChange={handleInputChange} required />
          </div>
          {/* <div className="mb-3">
            <label htmlFor="planType" className="form-label">Plan Type : </label>
            <input  className="form-control" id="planType" name="planType" value={newService.planType} onChange={handleInputChange} required />
          </div> */}
          <div className="form-group">
          <label>Plan Type :</label>
          <select
            name="planType"
            value={newService.planType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Plan</option>
            <option value="BASIC">BASIC</option>
            <option value="PREMIUM">PREMIUM</option>
            <option value="UNLIMITED">UNLIMITED</option>
            
          </select>
        </div>
          
          <button type="submit" className="btn btn-primary" disabled={loading}>SUBMIT</button>
        </form>
      </div>
 
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Service ID</th>
            <th>Member Id</th>
            <th>Plan Type</th>
            <th>Data Limit</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service.serviceId}>
              <td>{service.serviceId}</td>
              <td>{service.familyMember.memeberId}</td>
              <td>{service.planType}</td>
              <td>{service.dataLimit}</td>
              <td>{service.startDate}</td>
              <td>{service.endDate}</td>
              <td>{service.monthlyFee}</td>
              <td>
              <button className="btn btn-default" onClick={() => fetchService(service.serviceId)}>View</button>
              <Link to={`/update-mobile-service/${service.serviceId}`} className="btn btn-default btn-sm mx-1">Update</Link>
             </td>
            </tr>
          ))}
        </tbody>
      </table> 
      {selectedService && (
        <div>
          <h3>Service details :</h3>
          <p>Mobile Service ID : {selectedService.serviceId}</p>
          <p>FamilyMember ID : {selectedService.familyMember.memeberId}</p> 
          <p>Plan Type : {selectedService.planType}</p>
          <p>Data Limit : {selectedService.dataLimit}</p>
          <p>Start Date:{selectedService.startDate}</p>
          <p>End Date : {selectedService.endDate}</p>
          <p>Amount : {selectedService.monthlyFee}</p>
        </div>
     )}
    </div>
  );
};
 
export default MobileServiceManagement;