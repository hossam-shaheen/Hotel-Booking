import { useQuery } from "@tanstack/react-query";
import { getAllCabins } from "../services/apiCabins";

const useFetchCabin = () => {
  const {
    status,
    isPending,
    data: cabins,
    error,
  } = useQuery({ queryKey: ["cabins"], queryFn: getAllCabins });
  return {
    cabins,
    isPending,
    error,
    status,
  };
};

export default useFetchCabin;
