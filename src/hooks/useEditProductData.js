import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/api/api';

export const useEditProductData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.editProductData(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['adminInventory']);
      console.log(data.message);
    },
    onError: (error) => {
      console.error('Error editing product data:', error.message);
    },
  });
}