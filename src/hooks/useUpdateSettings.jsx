import { useMutation } from "@tanstack/react-query";
import { updateSetting } from "../services/apiSettings";
import toast from "react-hot-toast";

const useUpdateSettings = () => {
  const { mutate: updatedSettingsData } = useMutation({
    mutationFn: updateSetting,
    onSuccess() {
      toast.success(`Settings is updated successfully`);
    },
    onError: () => {
      toast.error(`Settings is failed to be updated`);
    },
  });

  return {
    updatedSettingsData,
  };
};

export default useUpdateSettings;
