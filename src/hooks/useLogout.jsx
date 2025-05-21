import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../services/apiAuthenticated";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: handelLogout,
    error,
    isError,
  } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login");
    },
    onError: () => {
      toast.error("User can't logged out successfully");
    },
  });

  return {
    handelLogout,
    error,
    isError,
  };
};
