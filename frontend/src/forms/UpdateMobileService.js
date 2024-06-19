import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
 import AccountHolderService from '../services/AccountHolderService';
function UpdateMobileService() {
  const navigate = useNavigate();
  const { serviceId } = useParams();
 
  const [memberData, setMemberData] = useState({
   plan:''
  });
 
  useEffect(() => {
    fetchMemberDataById(serviceId);
  }, [serviceId]);
 
  const fetchMemberDataById = async (serviceId) => {
    try {
      const response = await AccountHolderService.getService(serviceId);
      if (response) {
        setMemberData(response);
      } else {
        console.error('Error: Service data is undefined.');
      }
    } catch (error) {
      console.error('Error fetching service data : ', error);
    }
  };
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMemberData((prevMemberData) => ({
      ...prevMemberData,
      [name]: value
    }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AccountHolderService.updateService(memberData);
      alert('Updated Successfully!');
      navigate("/mobileservicemanagement");
    } catch (error) {
      console.error('Error updating mobile service : ', error);
      alert(error.message || 'An error occurred while updating mobile service.');
    }
  };
 
  return (
    <div className="auth-container mt-5 pt-5">
      <h2>UPDATE SERVICE</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label>Plan Type :</label>
          <select
            name="planType"
            value={memberData.planType || ''}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Plan</option>
            <option value="BASIC">BASIC</option>
            <option value="PREMIUM">PREMIUM</option>
            <option value="UNLIMITED">UNLIMITED</option>
            
          </select>


          </div>
        <button type="submit" className="btn btn-default w-100">UPDATE</button>
        <div className="card-footer text-center">
          <button className="btn btn-default" onClick={() => navigate("/mobileservicemanagement")}>Back to Account Holder Management</button>
        </div>
      </form>
    </div>
  );
}
 
export default UpdateMobileService;