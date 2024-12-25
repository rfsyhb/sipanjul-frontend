import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/api/api';

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => api.oprDeleteProduct(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['adminInventory']);
      console.log(data.message);
    },
    onError: (error) => {
      console.error('Error deleting product:', error.message);
    },
  });
}