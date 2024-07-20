import axios from "axios";


export const apiRequest = async (method, url, payload) => {
  try {
    const response = await axios({
      method,
      url,
      baseURL: 'http://localhost:5000',
      data: payload,
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      
    });
    return response.data;
  } catch (error) {
    return error;
  }
};