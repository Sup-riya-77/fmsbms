import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SystemAdminService from '../services/SystemAdminService';
 
function UpdateUserEntity() {
  const navigate = useNavigate();
  const { id } = useParams();
 
  const [userData, setUserData] = useState({
    id: '',
    role: ''
  });
 
  useEffect(() => {
    fetchUserDataById(id);
  }, [id]);
 
  const fetchUserDataById = async (id) => {
    try {
      const response = await SystemAdminService.getUser(id);
      if (response) {
        setUserData(response);
      } else {
        console.error('Error: User data is undefined.');
      }
    } catch (error) {
      console.error('Error fetching user data : ', error);
    }
  };
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await SystemAdminService.updateUserRole(userData);
      navigate("/userentitymanagement");
    } catch (error) {
      console.error('Error updating user : ', error);
      alert(error.message || 'An error occurred while updating user.');
    }
  };
 
  return (
    <div className="auth-container mt-5 pt-5">
      <h2>UPDATE ROLE</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Id :</label>
          <input
            type="number"
            name="id"
            value={userData.id || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Role :</label>
          <select
            name="role"
            value={userData.role}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Role</option>
            <option value="ROLE_ADMIN">ROLE_ADMIN</option>
            <option value="ROLE_ACCOUNT_HOLDER">ROLE_ACCOUNT_HOLDER</option>
            <option value="ROLE_CUSTOMER_SUPPORT">ROLE_CUSTOMER_SUPPORT</option>
            <option value="ROLE_USER">ROLE_USER</option>
            <option value="ROLE_DEFAULT">ROLE_DEFAULT</option>
          </select>
        </div>
        <button type="submit" className="btn btn-default w-100">UPDATE</button>
        <div className="card-footer text-center">
          <button className="btn btn-default" onClick={() => navigate("/userentitymanagement")}>Back to User Entity Management</button>
        </div>
      </form>
    </div>
  );
}
 
export default UpdateUserEntity;