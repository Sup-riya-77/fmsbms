
import SystemAdminService from '../services/SystemAdminService';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
 
const UserEntityManagement = () => {
  const [users, setUsers] = useState([]);
 
  
  useEffect(() => {
    fetchUsers();
  }, []);
 
  const fetchUsers = () => {
    SystemAdminService.viewUsers()
      .then(response => {   
        console.log(response);
        setUsers(response);
        
      })
      .catch(error => {
        console.error('Error fetching users : ', error);
      });
  };
 
  return (
    <div className="container mt-5 pt-5">
      <h2 className="mb-5 pt-3">USER ENTITY MANAGEMENT</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Password Hash</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Role Id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.address}</td>
              <td>{user.role.id}</td>
              <td>
                <Link to={`/update-userrole/${user.id}`} className="btn btn-light">
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
 
export default UserEntityManagement;