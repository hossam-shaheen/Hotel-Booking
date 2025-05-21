import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../services/apiAuthenticated";
import toast from "react-hot-toast";

export const useSignUp = () => {
 
  const queryClient = useQueryClient();
  const {
    mutate: handelLogout,
    error,
    isError,
    isPending,
  } = useMutation({
    mutationFn: (account) => signup(account),
    onSuccess: () => {
      toast.success("user signed up successfully");
    },
    onError: () => {
      toast.error("user can't signed up successfully");
    },
  });

  return {
    handelLogout,
    error,
    isError,
    isPending,
  };

};
