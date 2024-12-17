import { useQuery } from "@tanstack/react-query";
import api from "../utils/api/api";

export const useStoreStatus = () => {
  return useQuery({
    queryKey: ["storeStatus"],
    queryFn: api.getStoreStatus,
  });
}