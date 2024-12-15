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
          [
            'Token has expired',
            'Token is no longer valid',
            'Invalid token',
          ].includes(data.message)
        ) {
          clearAccessToken();
          navigate('/login'); // Sesuaikan `navigate` agar sesuai dengan context.
        }
      }
      return Promise.reject(error);
    }
  );

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
      throw new Error(
        error.message || 'Something went wrong (throwed from apiRequest)'
      );
    }
  };

  // Authorization
  const getAccessToken = () => localStorage.getItem('accessToken');
  const putAccessToken = (accessToken) =>
    localStorage.setItem('accessToken', accessToken);
  const clearAccessToken = () => localStorage.removeItem('accessToken');

  // API Endpoints
  const login = async ({ name, password }) => {
    const response = await apiRequest('POST', '/login', { name, password });
    return response.data.token;
  };

  const getGuestItems = async () => {
    const response = await apiRequest('GET', '/inventory');
    return response.data;
}

  const getItems = async () => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('GET', '/opr/inventory');

    // Return hanya data penting agar Tanstack Query langsung mendapatkan hasil yang dibutuhkan
    return response.data;
  };

  return {
    getAccessToken,
    putAccessToken,
    clearAccessToken,
    login,
    getGuestItems,
    getItems,
  };
})();

export default api;
