import axios from 'axios';
import {
  bestSellingList,
  chartData,
  dailySales,
  guestItemList,
  itemList,
  monthlySales,
  recentTransactionList,
  weeklySales,
} from '../dummyData';
import { saveAs } from 'file-saver';

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
  };

  const getItems = async () => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('GET', '/opr/inventory');

    // Return hanya data penting agar Tanstack Query langsung mendapatkan hasil yang dibutuhkan
    return response.data;
  };

  // Mock API
  const getStoreStatus = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storeStatus = true; // Placeholder status toko
        console.log('Fetched store status:', storeStatus);
        resolve(storeStatus);
      }, 2000); // Simulasi delay 500ms
    });
  };

  const getPublicItems = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const items = guestItemList;
        resolve(items);
      }, 2000);
    });
  };

  const toggleStoreStatus = async (currentStatus) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedStatus = !currentStatus; // Toggle status
        console.log('Toggled store status:', updatedStatus);
        resolve({
          status: updatedStatus,
          message: 'Store status updated successfully',
        });
      }, 500); // Simulasi delay 500ms
    });
  };

  // Homepage
  const getSalesReport = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const salesData = {
          daily: dailySales,
          weekly: weeklySales,
          monthly: monthlySales,
        };
        resolve(salesData);
      }, 2000);
    });
  };

  const getBestSellingItems = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const items = bestSellingList;
        resolve(items);
      }, 2000);
    });
  };

  const getRecentTransactions = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const recentTransactions = recentTransactionList;
        resolve(recentTransactions);
      }, 2000);
    });
  };

  // Cashier
  const getProducts = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = itemList;
        resolve(products);
      }, 2000);
    });
  };

  const checkout = async (cartPayload) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Checkout:', cartPayload);
        resolve({ message: 'Checkout success' });
      }, 2000);
    });
  };

  // Inventory
  const getInventories = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const inventories = itemList;
        resolve(inventories);
      }, 2000);
    });
  };

  const addNewProduct = async (newProduct) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Add product:', newProduct);
        resolve({ message: 'Product added' });
      }, 2000);
    });
  };

  const editProductData = async (payload) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Edit product:', payload);
        resolve({ message: 'Product updated' });
      }, 2000);
    });
  };

  const editProductStock = async (payload) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Edit product stock:', payload);
        resolve({ message: 'Product stock updated' });
      }, 2000);
    });
  };

  const deleteProduct = async (productId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Delete product:', productId);
        resolve({ message: 'Product deleted' });
      }, 2000);
    });
  };

  // Chart
  const getSalesStatistic = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const salesStatistic = chartData;
        resolve(salesStatistic);
      }, 2000);
    });
  };

  // Report
  const getReportData = async (payload) => {
    if (payload.data === 'perubahan') {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Get perubahan report:', payload);
          resolve({ message: 'Report fetched for perubahan' });
        }, 2000);
      });
    }

    if (payload.data === 'penjualan') {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Get penjualan report:', payload);
          resolve({ message: 'Report fetched for penjualan' });
        }, 2000);
      });
    }

    return new Promise((resolve, reject) => {
      reject(new Error('Invalid data type'));
    });
  };

  const addProduct = async (product) => {
    console.log(product);
  };

  // test
  const customCetakExcel = async () => {
    const payload = {
      startdate: '2024-12-18',
      enddate: '2024-12-19',
      divisi: 'Komersil',
    }
    
    try {
      const response = await axios.post(
        `${BASE_URL}/opr/print-report`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            'Content-Type': 'application/json',
          },
          responseType: 'blob',
        }
      );

      // extract
      const contentDisposition = response.headers['content-disposition'];
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/"/g, '')
        : `${payload.startdate} to ${payload.enddate} report.xlsx`;
      
      // save file
      saveAs(response.data, filename);
    } catch (error) {
      console.log('error', error);
    }
  };

  return {
    getAccessToken,
    putAccessToken,
    clearAccessToken,
    login,
    getGuestItems,
    getItems,
    getStoreStatus,
    getPublicItems,
    toggleStoreStatus,
    getSalesReport,
    getBestSellingItems,
    getRecentTransactions,
    getProducts,
    checkout,
    getInventories,
    addNewProduct,
    editProductData,
    editProductStock,
    deleteProduct,
    getSalesStatistic,
    getReportData,
    addProduct,
    customCetakExcel
  };
})();

export default api;
