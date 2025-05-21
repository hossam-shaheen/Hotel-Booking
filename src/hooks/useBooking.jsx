import { useQuery } from "@tanstack/react-query";

import { useParams } from "react-router-dom";
import { getBooking } from "../services/apiBookings";

export default function useBooking() {
  const { bookingId } = useParams();

  const {
    status,
    isPending,
    data: booking,
    error,
  } = useQuery({ queryKey: ["Bookings", bookingId], queryFn: () => getBooking(bookingId) });

  return {
    booking,
    isPending,
    error,
    status,
  };
}
