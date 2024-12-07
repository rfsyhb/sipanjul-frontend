import axios from 'axios';

const api = (() => {
  const BASE_URL = 'https://backend-sipanjul.vercel.app';

  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    (response) => response,
    (error) => {
      if (error.response) {
        const { status, data } = error.response;
        if (
          status === 401 &&
          (data.message === 'Token has expired' ||
            data.message === 'Token is no longer valid' ||
            data.message === 'Invalid token')
        ) {
          clearAccessToken();
          navigate('/login');
        }
      }
      return Promise.reject(error);
    }
  )

  const apiRequest = async (method, endpoint, data) => {
    try {
      const response = await instance({
        method,
        url: endpoint,
        data,
      });

      const responseData = response.data;

      if (response.status === 202) {
        return responseData;
      }
      
      if (responseData.status !== 'success') {
        throw new Error(responseData.message);
      }
      return responseData;
    } catch (error) {
      throw new Error(error.message || "Something went wrong (throwed from apiRequest)");
    }
  }

  const getAccessToken = () => {
    return localStorage.getItem('accessToken');
  }

  const putAccessToken = (accessToken) => {
    localStorage.setItem('accessToken', accessToken);
  }

  const clearAccessToken = () => {
    localStorage.removeItem('accessToken');
  }

  const login = async ({ name, password }) => {
    const response = await apiRequest('POST', '/login', { name, password });
    console.log(response);
    
    return response.data.token;
  }

  return {
    getAccessToken,
    putAccessToken,
    clearAccessToken,
    login,
  }
})();

export default api;