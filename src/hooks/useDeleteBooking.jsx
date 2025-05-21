import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../services/apiBookings";

const useDeleteBooking = () => {

  const queryClient = useQueryClient();

  const {
    error,
    isError,
    isIdle,
    mutate: handelBookingDelete,
    status:bookingStatus,
  } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success("Booking deleted successfully");
      queryClient.invalidateQueries(["Bookings"]);
    },
    onError: (error) => {
      toast.success("Booking can't be deleted successfully");
      console.error("Booking can't be deleted successfully", error);
    },
  });

  return {
    handelBookingDelete,
    error,
    isError,
    bookingStatus,
    isIdle,
  };
};

export default useDeleteBooking;