import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/api/api';

export const useAddNewProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProduct) => api.addNewProduct(newProduct),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['adminInventory']);
      console.log(data.message);
    },
    onError: (error) => {
      console.error('Error adding product:', error.message);
    },
  });
}