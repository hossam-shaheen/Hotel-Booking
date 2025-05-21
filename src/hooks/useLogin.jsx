import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../services/apiAuthenticated";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: handelLogin,
    error,
    isError,
    isPending,
  } = useMutation({
    mutationFn: (account) => login(account),
    onSuccess: (user) => {
      navigate("/");
      queryClient.setQueryData(["user"], user.user);
    },
    onError: () => {
      toast.error("User can't logged in successfully");
    },
  });

  return {
    handelLogin,
    error,
    isError,
    isPending,
  };
};
