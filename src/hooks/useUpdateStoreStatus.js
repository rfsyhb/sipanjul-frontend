import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/api/api';

export const useUpdateStoreStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (currentStatus) => api.oprToggleStoreStatus(currentStatus),
    onSuccess: (data) => {
      console.log(`Store status updated: ${data.storestatus}`);
      queryClient.invalidateQueries({ queryKey: ['storeStatus'] });
    },
    onError: (error) => {
      console.error(`Error updating store status: ${error}`);
    }
  });
};
