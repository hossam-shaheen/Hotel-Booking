import { useMutation, useQueryClient } from "@tanstack/react-query";
import { duplicateCabin } from "../services/apiCabins";
import toast from "react-hot-toast";

const useDuplicateCabin = () => {
  const queryClient = useQueryClient();
  const { mutate: duplicateCabinData } = useMutation({
    mutationFn: duplicateCabin,
    onSuccess: () => {
      toast.success("Cabin duplicated");
      queryClient.invalidateQueries(["Cabins"]);
    },
    onError: (error) => {
      toast.error("Cabin could not be duplicated");
    },
  });

  return {
    duplicateCabinData,
  };
};

export default useDuplicateCabin;
