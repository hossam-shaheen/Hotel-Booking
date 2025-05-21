import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../services/apiBookings";
import toast from "react-hot-toast";

const useUpdateBooking = (id, obj) => {
  const queryClient = useQueryClient();
  const {
    mutate: updateCurrentBooking,
    status: bookingStatus,
    error,
    isError,
    isIdle,
  } = useMutation({
    mutationFn: () => updateBooking(id, obj),
    onSuccess: () => {
      toast.success("Booking updated successfully");
      queryClient.invalidateQueries(["Bookings"]);
    },
    onError: (error) => {
      toast.success("Booking can't updated successfully");
      console.error("Booking can't updated successfully", error);
    },
  });
  return {
    updateCurrentBooking,
    bookingStatus,
    error,
    isError,
    isIdle,
  };
};

export default useUpdateBooking;
