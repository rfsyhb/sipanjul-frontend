import { useMutation } from '@tanstack/react-query';
import api from '../utils/api/api';

export const useUpdateStoreStatus = () => {

  return useMutation({
    mutationFn: (currentStatus) => api.oprToggleStoreStatus(currentStatus)
  });
};
