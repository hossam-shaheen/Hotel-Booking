import BookingTable from "../features/bookings/BookingTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";
import useFetchBookings from "../hooks/useFetchBookings";

function Bookings() {
  const { bookings, bookingCounts, isPending, error, status } =
    useFetchBookings();

  if (isPending === "fetching") return <Spinner />;
  if (error?.message) return <div>Error: {error?.message}</div>;

  return (
    <Row type="vertical">
      <Heading as="h1">All bookings</Heading>
      {status === "success" && (
        <BookingTable
          bookings={bookings}
          bookingCounts={bookingCounts}
          error={error}
        />
      )}
    </Row>
  );
}

export default Bookings;
