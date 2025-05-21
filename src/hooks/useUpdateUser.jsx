import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUserData } from "../services/apiAuthenticated";

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const {
    mutate: updateCurrentUserData,
    status: userStatus,
    error,
    isPending,
  } = useMutation({
    mutationFn: (user) => updateUserData(user),
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      toast.success("user can't updated successfully");
    },
  });
  return {
    updateCurrentUserData,
    userStatus,
    error,
    isPending,
  };
};

export default useUpdateUser;
