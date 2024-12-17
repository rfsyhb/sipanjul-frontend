import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/api/api';

export const useUpdateStoreStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (currentStatus) => api.toggleStoreStatus(currentStatus),
    onSuccess: (data) => {
      console.log(`Store status updated: ${data.status}`);
      queryClient.invalidateQueries({ queryKey: ['storeStatus'] });
    },
    onError: (error) => {
      console.error(`Error updating store status: ${error}`);
    }
  });
};
