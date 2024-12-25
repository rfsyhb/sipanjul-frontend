import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/api/api';

export const useEditProductStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.oprEditProductStock(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['adminInventory']);
      console.log(data.message);
    },
    onError: (error) => {
      console.error('Error editing product stock:', error.message);
    },
  })
}