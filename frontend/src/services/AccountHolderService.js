import axios from "axios";
import authHeader from "./auth-header";

const BASE_URL = "http://localhost:8080/api/familycontroller";

const addMember = async (memberData) => {
  try {
    const response = await axios.post(`${BASE_URL}/addmember`, memberData, {
      headers: {
        'Content-Type': 'application/json',
        ...authHeader()
      }
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const viewMembers = async (familyId) => {
  try {
    const response = await axios.post(`${BASE_URL}/getallmembersbyfamilyid`, familyId , {
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(),
        'Access-Control-Allow-Origin': '*'
      }
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const getMember = async (memberId) => {
  try {
    const response = await axios.post(`${BASE_URL}/getmember`, memberId , {
      headers: {
        'Content-Type': 'application/json',
        ...authHeader()
      }
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const updateMember = async (memberData) => {
  try {
    const response = await axios.post(`${BASE_URL}/updatemember`, memberData , {
      headers: {
        'Content-Type': 'application/json',
        ...authHeader()
      }
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const addService = async (serviceData) => {
  try {
    const response = await axios.post(`${BASE_URL}/addservice`, serviceData, {
      headers: {
        'Content-Type': 'application/json',
        ...authHeader()
      }
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const viewServices = async (familyId) => {
  try {
    const response = await axios.post(`${BASE_URL}/getallservices`, familyId , {
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(),
        'Access-Control-Allow-Origin': '*'
      }
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const getService = async (serviceId) => {
  try {
    const response = await axios.post(`${BASE_URL}/getservicebyid`, serviceId , {
      headers: {
        'Content-Type': 'application/json',
        ...authHeader()
      }
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const updateService = async (memberData) => {
  try {
    const response = await axios.post(`${BASE_URL}/updateservice`, memberData , {
      headers: {
        'Content-Type': 'application/json',
        ...authHeader()
      }
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const getId = async (username) => {
  try {
    const response = await axios.post(`${BASE_URL}/getid`, username, {
      headers: {
        'Content-Type': 'application/json',
        ...authHeader()
      }
    });
    return response.data;
    
  } catch (err) {
    throw err;
  }
};



const AccountHolderService = {
  addMember,
  viewMembers,
  getMember,
  updateMember,
  addService,
  viewServices,
  getService,
  updateService,
  getId
};

export default AccountHolderService;
