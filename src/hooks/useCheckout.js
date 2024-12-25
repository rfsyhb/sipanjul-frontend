import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api/api";

export const useCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartPayload) => api.oprCheckout(cartPayload),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["salesData"] });
      queryClient.invalidateQueries({ queryKey: ["bestSellingProducts"] });
      queryClient.invalidateQueries({ queryKey: ["recentTransactions"] });
    },
    onError: (error) => {
      console.error(`Error checking out: ${error}`);
    },
  });
}