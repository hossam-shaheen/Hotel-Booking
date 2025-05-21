import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/apiAuthenticated";

export const useGetUser = () => {
  const {
    data: user,
    isPending,
    error,
    status,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return {
    user,
    isPending,
    error,
  };
};
