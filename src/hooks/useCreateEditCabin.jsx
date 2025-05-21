import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useCabinMutation = (createCabin, reset, cabin) => {
  const queryClient = useQueryClient();

  const { mutate: createNewCabin } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success(`${cabin?.id ? "Cabin Updated" : "Cabin Created"}`);
      queryClient.invalidateQueries(["Cabins"]);
      reset();
    },
    onError: () => {
      toast.error(
        `${
          cabin?.id
            ? "Cabin could not be updated"
            : "Cabin could not be created"
        }`
      );
    },
  });

  return { createNewCabin };
};

export default useCabinMutation;
