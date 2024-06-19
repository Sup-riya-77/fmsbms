import axios from "axios";
import authHeader from "./auth-header";

const BASE_URL = "http://localhost:8080/api/payments";


const addPayment = async (billData) => {
    try {
      const response = await axios.post(`${BASE_URL}/addpayment`, billData, {
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

  const getPayment = async (paymentId) => {
    try {
      const response = await axios.post(`${BASE_URL}/getpayment`, paymentId, {
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

  const viewPayments = async (familyId) => {
    try {
      const response = await axios.post(`${BASE_URL}/getpaymentbyfamilyid`, familyId,{
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


const PaymentService = {
 addPayment,
 getPayment,
 viewPayments,
 getId
};

export default PaymentService;  