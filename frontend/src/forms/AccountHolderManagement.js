import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AccountHolderService from '../services/AccountHolderService';
import AuthService from '../services/auth.service';
import 'bootstrap/dist/css/bootstrap.min.css';
const AccountHolderManagement = () => {
    const [newMember, setNewMember] = useState({
        name: '',
        email: '',
        username: '',
        phoneNumber: '',
        familyId: ''
    });
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    const form = useRef();

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = () => {
        const username = AuthService.getCurrentUser().username;
        console.log(username);
        //const id= AccountHolderService.getId(username);
        AccountHolderService.getId(username)
    .then(id => {
        console.log(typeof id); // This should log "number" if id is now resolved to a number
        console.log(id);        // This should log the resolved id value
        return AccountHolderService.viewMembers(id);
    })
            .then(response => {
                setMembers(response);
                console.log(response);
            })
            .catch(error => {
                console.error('Error fetching customers:', error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMember({ ...newMember, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        AccountHolderService.addMember(newMember)
            .then(() => {
                alert('Member added successfully');
                setNewMember({
                    name: '',
                    email: '',
                    username: '',
                    phoneNumber: '',
                    familyId: ''
                });
                fetchMembers();

            })
            .catch(error => {
                console.error('Error adding ,member:', error);
                alert('An error occurred while adding member');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const fetchMember = async (memeberId) => {
        try {
            const member = await AccountHolderService.getMember(memeberId);
            setSelectedMember(member); // Set the selected ticket
        } catch (error) {
            console.error('Error fetching member by ID:', error);
        }
    };

    return (
        <div className="container mt-5 pt-3">
            <h2 className='pb-3'>FAMILY MEMBER MANAGEMENT</h2>
            <div className="card card-container">
                <h3>ADD MEMBER</h3>
                <form onSubmit={handleSubmit} ref={form}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name :</label>
                        <input type="text" className="form-control" id="name" name="name" value={newMember.name} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email :</label>
                        <input type="email" className="form-control" id="email" name="email" value={newMember.email} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username :</label>
                        <input type="text" className="form-control" id="username" name="username" value={newMember.username} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phoneNumber" className="form-label">Phone Number :</label>
                        <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" value={newMember.phoneNumber} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="familyId" className="form-label">Family Id :</label>
                        <input type="text" className="form-control" id="familyId" name="familyId" value={newMember.familyId} onChange={handleInputChange} required />
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading}>ADD MEMBER</button>
                </form>
            </div>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Member ID</th>
                        <th>Name</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Family Id</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map(member => (
                        <tr key={member.memeberId}>
                            <td>{member.memeberId}</td>
                            <td>{member.name}</td>
                            <td>{member.username}</td>
                            <td>{member.email}</td>
                            <td>{member.phoneNumber}</td>
                            <td>{member.family.familyId}</td>
                            <td>
                                <button className="btn btn-default btn-sm mx-1" onClick={() => fetchMember(member.memeberId)}>View</button>
                                <Link to={`/update-family-member/${member.memeberId}`} className="btn btn-default btn-sm mx-1">Update</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> 

            {selectedMember && (
                <div>
                    <h3>Selected Member Details</h3>
                    
                    <p>name : {selectedMember.name}</p>
                    <p>username : {selectedMember.username}</p>
                    <p>email : {selectedMember.email}</p>
                    <p>phone Number : {selectedMember.phoneNumber}</p>
                    <p>Family Id : {selectedMember.family.familyId}</p>
                </div>
            )} 
        </div>
    );
};

export default AccountHolderManagement;