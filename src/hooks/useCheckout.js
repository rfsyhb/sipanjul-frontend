import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api/api";

export const useCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartPayload) => api.checkout(cartPayload),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: (error) => {
      console.error(`Error checking out: ${error}`);
    },
  });
}