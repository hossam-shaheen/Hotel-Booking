import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../services/apiSettings";

const useFetchSettings = () => {
  const {
    data: settings,
    isPending,
    error,
    status,
  } = useQuery({
    queryKey: ["Settings"],
    queryFn: getSettings,
  });

  return {
    settings,
    isPending,
    error,
    status,
  };
};

export default useFetchSettings;
