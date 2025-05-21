import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabins } from "../services/apiCabins";
import toast from "react-hot-toast";

const useDeleteCabin = () => {
  const queryClient = useQueryClient();
  const {
    mutate: handelDelete,
    error,
    isError,
  } = useMutation({
    mutationFn: deleteCabins,
    onSuccess: () => {
      toast.success("Cabin deleted successfully");
      queryClient.invalidateQueries(["Cabins"]);
    },
    onError: (error) => {
      toast.error("Cabin could not be deleted");
    },
  });

  return {
    handelDelete,
    error,
    isError,
  };
};

export default useDeleteCabin;
