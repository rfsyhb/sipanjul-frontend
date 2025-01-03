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
import axiosRetry from 'axios-retry';

const api = (() => {
  const BASE_URL = 'https://backend-sipanjul.vercel.app';

  // Retry request jika gagal
  axiosRetry(axios, {
    retries: 10,
    retryCondition: (error) => {
      return (
        axiosRetry.isNetworkOrIdempotentRequestError(error) || // Network errors
        error.code === 'ECONNABORTED' || // Request aborted (timeout)
        error.response?.status === 504 || // Explicitly handle 504 Gateway Timeout
        error.response?.data?.message === 'FUNCTION_INVOCATION_TIMEOUT' // Custom error message
      );
    },
    retryDelay: (retryCount) => retryCount * 1000, // Exponential backoff delay
  });

  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Retry request jika gagal
  axiosRetry(instance, {
    retries: 10,
    retryCondition: (error) => {
      return (
        axiosRetry.isNetworkOrIdempotentRequestError(error) || // Network errors
        error.code === 'ECONNABORTED' || // Request aborted (timeout)
        error.response?.status === 504 || // Explicitly handle 504 Gateway Timeout
        error.response?.data?.message === 'FUNCTION_INVOCATION_TIMEOUT' // Custom error message
      );
    },
    retryDelay: (retryCount) => retryCount * 1000, // Exponential backoff delay
  });

  // Global interceptor untuk handle error
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        const { status, data } = error.response;

        if (
          status === 401 &&
          ['unauthorized'].includes(data.error) // Menyesuaikan dengan struktur JSON
        ) {
          alert('Unauthorized, silahkan login ulang...');
          clearAccessToken();
          window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    }
  );

  // Fungsi untuk melakukan request ke API
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
      if (error.response) {
        throw new Error(
          error.response.data.message || 'An error occurred on the server'
        );
      } else if (error.request) {
        throw new Error('No response received from the server');
      } else {
        throw new Error(error.message || 'Unexpected error');
      }
    }
  };

  // Fungsi untuk mengelola access token di local storage
  const getAccessToken = () => localStorage.getItem('accessToken');
  const putAccessToken = (accessToken) =>
    localStorage.setItem('accessToken', accessToken);
  const clearAccessToken = () => localStorage.removeItem('accessToken');
  const getUserId = () => localStorage.getItem('userId');
  const putUserId = (userId) => localStorage.setItem('userId', userId);
  const clearUserId = () => localStorage.removeItem('userId');

  // API Endpoints
  const login = async ({ name, password }) => {
    const response = await apiRequest('POST', '/login', { name, password });
    return response.data;
  };

  const getGuestItems = async () => {
    const response = await apiRequest('GET', '/product');
    return response.data;
  };

  const getStoreStatus = async (id) => {
    const response = await apiRequest('GET', `/store-status/${id}`);
    return response.storestatus;
  };

  // OPERATORS
  const oprVerifyToken = async () => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('GET', '/opr/verify-token');
    return response;
  };

  const oprToggleStoreStatus = async (currentStatus) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('POST', '/opr/store-status', {
      storestatus: !currentStatus,
    });

    return response.status;
  };

  /**
   * Page: Homepage
   */
  const oprGetSalesReport = async () => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('GET', '/opr/sales-report');

    const payload = response.message?.bulanan
      ? response.message
      : response.data;
    return payload;
  };

  const oprGetBestSellingItem = async () => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('GET', '/opr/bestselling-product');

    const payload = response.message[0].id ? response.message : response.data;
    console.log('payload api.js', payload);
    return payload;
  };

  const oprGetRecentTransaction = async () => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('GET', '/opr/recent-transaction');

    const payload = response.message[0]?.name
      ? response.message
      : response.data;
    return payload;
  };

  /**
   * Page: Cashier
   */
  const oprCheckout = async (cartPayload) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('POST', '/opr/checkout', cartPayload);

    return response.status;
  };

  /**
   * Page: Inventory
   */
  const oprGetProduct = async () => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('GET', '/opr/product');

    const payload = response.message[0]?.id ? response.message : response.data;
    return payload;
  };

  const oprAddProduct = async (productData) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('POST', '/opr/product', productData);

    return response.status;
  };

  const oprEditProduct = async (productData) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest(
      'PUT',
      `opr/product/${productData.id}`,
      productData
    );

    return response.status;
  };

  const oprEditProductStock = async (productData) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const requestPayload = {
      stock: productData.stock,
      desc: productData.description,
      isNegative: productData.isNegative,
    };
    const response = await apiRequest(
      'PUT',
      `opr/product/update-stock/${productData.id}`,
      requestPayload
    );

    return response.status;
  };

  const oprDeleteProduct = async (productId) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('DELETE', `opr/product/${productId}`);

    return response.status;
  };

  /**
   * Page: Report
   */
  const oprGetReport = async (reportPayload) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const payload = {
      data: reportPayload.data, // 'perubahan' atau 'penjualan'
      startdate: reportPayload.startdate,
      enddate: reportPayload.enddate,
      divisi: reportPayload.divisi || '',
      detail: reportPayload.detail || '',
    };

    const response = await apiRequest('POST', '/opr/report', payload);
    const responsePayload = response.message[0]?.id
      ? response.message
      : response.data;
    return responsePayload;
  };

  const oprPrintReport = async (reportPayload) => {
    const payload = {
      startdate: reportPayload.startdate,
      enddate: reportPayload.enddate,
    };

    try {
      // Configure headers and make the request
      const response = await axios.post(
        `${BASE_URL}/opr/print-report`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            'Content-Type': 'application/json',
          },
          responseType: 'blob', // Expect a blob response
        }
      );

      // Extract filename from Content-Disposition header
      const contentDisposition = response.headers['content-disposition'];
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/"/g, '')
        : `${reportPayload.startdate} to ${reportPayload.enddate} report.xlsx`;

      // Save the file using FileSaver
      saveAs(response.data, filename);
    } catch (error) {
      console.error('Error while generating report:', error);
    }
  };

  /**
   * Page: Chart
   */
  const oprGetSalesStatistic = async () => {
    instance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;
    const response = await apiRequest('GET', '/opr/sales-statistic');
    console.log(response); // Debugging response data
    const responseData = response.data;

    return [
      { period: 'harian', data: responseData.harian },
      { period: 'mingguan', data: responseData.mingguan },
      { period: 'bulanan', data: responseData.bulanan },
      { period: 'tahunan', data: responseData.tahunan },
    ];
  };

  // Mock API
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
    };

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
    // Token management
    getAccessToken,
    putAccessToken,
    clearAccessToken,
    getUserId,
    putUserId,
    clearUserId,
    // Public API
    login,
    getGuestItems,
    getStoreStatus,
    // OPERATORS
    oprVerifyToken,
    oprToggleStoreStatus,
    oprGetSalesReport,
    oprGetBestSellingItem,
    oprGetRecentTransaction,
    oprCheckout,
    oprGetProduct,
    oprAddProduct,
    oprEditProduct,
    oprEditProductStock,
    oprDeleteProduct,
    oprGetReport,
    oprPrintReport,
    oprGetSalesStatistic,
    // Mock API
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
    customCetakExcel,
  };
})();

export default api;
