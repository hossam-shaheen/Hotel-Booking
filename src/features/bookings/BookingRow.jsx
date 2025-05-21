import styled from "styled-components";
import { format, isToday } from "date-fns";
import Tag from "../../ui/Tag";
import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menu from "../../ui/Menus";
import { FaEye } from "react-icons/fa";
import { RxBorderDotted } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../ui/Modal";
import DeleteModal from "../../ui/DeleteModal";
import useDeleteBooking from "../../hooks/useDeleteBooking";
import { IoCloseSharp } from "react-icons/io5";
import { CiLogin, CiLogout } from "react-icons/ci";
import useUpdateBooking from "../../hooks/useUpateBooking";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;
const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    Guests: { fullName: guestName, email },
    Cabins: { name: cabinName },
  },
}) {
  const navigate = useNavigate();
  const { handelBookingDelete } = useDeleteBooking();
  const { updateCurrentBooking } = useUpdateBooking(id, {
    status: "checked-out",
  });

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <TableRow>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <div>
        <Menu>
          <Menu.Toggle openList={id}>
            <RxBorderDotted />
          </Menu.Toggle>
          <Menu.List
            openList={id}
            $position={{
              $x: "-15px",
              $y: "25px",
            }}
          >
            <li>
              <Menu.Button>
                <span
                  onClick={() => navigate(`/booking/${id}`, { replace: true })}
                >
                  <FaEye />
                  Details
                </span>
              </Menu.Button>
            </li>

            {status === "unconfirmed" && (
              <li>
                <Menu.Button>
                  <span
                    onClick={() =>
                      navigate(`/checkIn/${id}`, { replace: true })
                    }
                  >
                    <CiLogin />
                    Check-In
                  </span>
                </Menu.Button>
              </li>
            )}

            {status === "checked-in" && (
              <li>
                <Menu.Button>
                  <span onClick={() => updateCurrentBooking()}>
                    <CiLogout />
                    Check-out
                  </span>
                </Menu.Button>
              </li>
            )}
            <li>
              <Menu.Button>
                <Modal>
                  <Modal.ModalButton open="Delete-booking">
                    <span>
                      <IoCloseSharp /> Delete
                    </span>
                  </Modal.ModalButton>

                  <Modal.ModalWindow open="Delete-booking">
                    <>
                      <Modal.ModalHeader>
                        <span>
                          <IoCloseSharp />
                        </span>
                      </Modal.ModalHeader>
                      <Modal.ModalContent>
                        <DeleteModal
                          message={
                            "Are you sure you want to delete the Booking ?"
                          }
                          handelDelete={(_) => handelBookingDelete(id)}
                        />
                      </Modal.ModalContent>
                    </>
                  </Modal.ModalWindow>
                </Modal>
              </Menu.Button>
            </li>
          </Menu.List>
        </Menu>
      </div>
    </TableRow>
  );
}

export default BookingRow;
