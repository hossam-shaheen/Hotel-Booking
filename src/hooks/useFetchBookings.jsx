import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings } from "../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/Constants";

const useFetchBookings = () => {
  const queryClient = useQueryClient();
  const [searchParams, _] = useSearchParams();
  const currentBookingStatus = searchParams.get("status") ?? "all";

  const currentBookingSorting = searchParams.get("sorting");
  const currentPage = searchParams.get("page") || 1;

  const {
    data: bookingData,
    isPending,
    error,
    status,
  } = useQuery({
    queryKey: [
      "Bookings",
      currentBookingStatus,
      currentBookingSorting,
      currentPage,
    ],
    queryFn: () =>
      getAllBookings(currentBookingStatus, currentBookingSorting, +currentPage),
  });

  const { data: bookings, count: bookingCounts } = bookingData || {};
  const pageCount = Math.ceil(bookingCounts / PAGE_SIZE);
  if (currentPage < pageCount) {
    const nextPage = +currentPage + 1;

    queryClient.prefetchQuery({
      queryKey: [
        "Bookings",
        currentBookingStatus,
        currentBookingSorting,
        `${nextPage}`,
      ],
      queryFn: () =>
        getAllBookings(currentBookingStatus, currentBookingSorting, `${nextPage}`),
    });
  }

  if (currentPage > 1) {
    const previousPage = +currentPage - 1;

    queryClient.prefetchQuery({
      queryKey: [
        "Bookings",
        currentBookingStatus,
        currentBookingSorting,
        `${previousPage}`,
      ],
      queryFn: () =>
        getAllBookings(
          currentBookingStatus,
          currentBookingSorting,
          `${previousPage}`
        ),
    });
  }

  return {
    bookings,
    bookingCounts,
    isPending,
    error,
    status,
  };
};

export default useFetchBookings;
