import { useState, useEffect } from "react";
import styled from "styled-components";
import BookingDataBox, {
  Section,
  StyledBookingDataBox,
} from "../../features/bookings/BookingDataBox";
import { CiLogin } from "react-icons/ci";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../../hooks/useBooking";
import Checkbox from "../../ui/Checkbox";
import { Button } from "../../ui/Button";
import useUpdateBooking from "../../hooks/useUpateBooking";
import useFetchSettings from "../../hooks/useFetchSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
  margin-bottom: 2.5rem;
`;

function CheckinBooking() {
  const [paid, setPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const moveBack = useMoveBack();
  const { booking } = useBooking();
  const {
    id: bookingId,
    numNights,
    numGuests,
    hasBreakfast,
    status,
    isPaid,
    Cabins: { regularPrice, discount } = {},
  } = booking || {};

  const { settings } = useFetchSettings();

  const { breakFastPrice } = settings ?? {};

  const cabinPrice = (regularPrice - discount) * numGuests * numNights;
  const breakfastPrice = breakFastPrice * numGuests * numNights || 0;
  const total = cabinPrice + breakfastPrice;

  const { updateCurrentBooking } = useUpdateBooking(bookingId, {
    status: "checked-in",
    isPaid: paid,
    hasBreakfast: addBreakfast,
    totalPrice: total,
  });

  useEffect(() => {
    if (booking) {
      setPaid(booking.isPaid);
    }
  }, [booking]);

  const handelPaidChange = (e) => {
    setPaid(e.target.checked);
  };

  const handelBreakFastChange = (e) => {
    setAddBreakfast(e.target.checked);
    setPaid(false);
  };

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      {booking && <BookingDataBox booking={booking} />}
      {hasBreakfast && status === "unconfirmed" && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={handelBreakFastChange}
            id={`breakfast-${bookingId}`}
            children={"Add breakfast for the guest."}
          />
        </Box>
      )}

      {status === "unconfirmed" && (
        <Box>
          <Checkbox
            checked={paid}
            onChange={handelPaidChange}
            disabled={paid}
            id={`paid-${bookingId}`}
            children={"Mark as paid."}
          />
        </Box>
      )}

      <ButtonGroup>
        {status === "unconfirmed" && !isPaid && (
          <Button
            onClick={updateCurrentBooking}
            $disabled={!paid}
            disabled={!paid}
          >
            Check in booking #{bookingId}
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
