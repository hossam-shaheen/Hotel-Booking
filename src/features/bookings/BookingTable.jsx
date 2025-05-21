import Pagination from "../../ui/Pagination";
import { Table } from "../../ui/Table";
import BookingRow from "./BookingRow";
import BookingTableOperations from "./BookingTableOperations";

function BookingTable({ bookings, bookingCounts, error }) {
  return (
    <>
    {error?.message && error.message}
      <BookingTableOperations />
      <Table $columns={"0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem"}>
        <Table.TableHeader>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.TableHeader>

        <Table.TableBody
          data={bookings}
          render={(booking) => (
            <BookingRow booking={booking} key={booking.id} />
          )}
        />
        {(bookings.length === 0 || !bookings || error?.message) && (
          <Table.TableEmpty>
            {error?.message || "there are no Booking loaded."}
          </Table.TableEmpty>
        )}

        <Table.TableFooter>
          <Pagination count={bookingCounts} />
        </Table.TableFooter>
      </Table>
    </>
  );
}

export default BookingTable;
