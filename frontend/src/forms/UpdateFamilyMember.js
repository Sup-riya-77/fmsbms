import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
 import AccountHolderService from '../services/AccountHolderService';
function UpdateFamilyMember() {
  const navigate = useNavigate();
  const { memeberId } = useParams();
 
  const [memberData, setMemberData] = useState({
    name: '',
    email:'',
    username:'',
    phoneNumber:'',
    familyId: ''
  });
 
  useEffect(() => {
    fetchMemberDataById(memeberId);
  }, [memeberId]);
 
  const fetchMemberDataById = async (memeberId) => {
    try {
      const response = await AccountHolderService.getMember(memeberId);
      if (response) {
        setMemberData(response);
      } else {
        console.error('Error: User data is undefined.');
      }
    } catch (error) {
      console.error('Error fetching user data : ', error);
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
      await AccountHolderService.updateMember(memberData);
      alert('Updated Successfully!');
      navigate("/accountholdermanagement");
    } catch (error) {
      console.error('Error updating member : ', error);
      alert(error.message || 'An error occurred while updating member.');
    }
  };
 
  return (
    <div className="auth-container mt-5 pt-5">
      <h2>UPDATE MEMBER</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name :</label>
          <input
            type="text"
            name="name"
            value={memberData.name || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email :</label>
          <input
            type="email"
            name="email"
            value={memberData.email || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Username :</label>
          <input
            type="text"
            name="username"
            value={memberData.username || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>PhoneNumber :</label>
          <input
            type="number"
            name="phoneNumber"
            value={memberData.phoneNumber || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Family Id :</label>
          <input
            type="number"
            name="familyId"
            value={memberData.familyId || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-default w-100">UPDATE</button>
        <div className="card-footer text-center">
          <button className="btn btn-default" onClick={() => navigate("/accountholdermanagement")}>Back to Account Holder Management</button>
        </div>
      </form>
    </div>
  );
}
 
export default UpdateFamilyMember;