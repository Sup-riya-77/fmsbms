import axios from "axios";
import authHeader from "./auth-header";

const BASE_URL = "http://localhost:8080/api/systemadmin";

const updateUserRole = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/updateuserrole`, userData, {
      headers: {
        'Content-Type': 'application/json',
       ...authHeader(),
       
      }
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const viewUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getalluserentities`, {
      headers: {
        'Content-Type': 'application/json',
       ...authHeader()
      }
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

const SystemAdminService = {
  updateUserRole,
  viewUsers
};

export default SystemAdminService;  