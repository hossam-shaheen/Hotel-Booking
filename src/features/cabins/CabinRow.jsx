import toast from "react-hot-toast";
import styled from "styled-components";
import { HiXCircle, HiDocumentDuplicate } from "react-icons/hi2";
import { FiEdit2 } from "react-icons/fi";
import { deleteCabins, duplicateCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CreateCabinForm from "./CreateCabinForm";
import { useState } from "react";
import useDeleteCabin from "../../hooks/useDeleteCabin";
import useDuplicateCabin from "../../hooks/useDuplicateCabin";
import { Modal } from "../../ui/Modal";
import { IoCloseSharp } from "react-icons/io5";
import { RxBorderDotted } from "react-icons/rx";
import DeleteModal from "../../ui/DeleteModal";
import Menu from "../../ui/Menus";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.5fr 2fr 1.5fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Poppins", sans-serif;
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinTableRow = ({ cabin }) => {
  const { handelDelete } = useDeleteCabin();

  const { duplicateCabinData } = useDuplicateCabin();

  const { id, ...restCabinData } = cabin;

  return (
    <>
      <TableRow>
        <Img src={cabin.image} alt={cabin.name} />
        <Cabin>{cabin.name}</Cabin>
        <div>{cabin.description}</div>
        <Price>{cabin.regularPrice}</Price>
        <div>{cabin.maxCapacity}</div>
        <Discount>{cabin.discount}</Discount>
        <div>
          <Menu>
            <Menu.Toggle openList={id}>
              <RxBorderDotted />
            </Menu.Toggle>
            <Menu.List
              openList={id}
              $position={{
                $x: "-20px",
                $y: "25px",
              }}
            >
              <li>
                <Menu.Button>
                  <Modal>
                    <Modal.ModalButton open="Delete-cabin">
                      <span>
                        <IoCloseSharp /> Delete 
                      </span>
                    </Modal.ModalButton>

                    <Modal.ModalWindow open="Delete-cabin">
                      <>
                        <Modal.ModalHeader>
                          <span>
                            <IoCloseSharp />
                          </span>
                        </Modal.ModalHeader>
                        <Modal.ModalContent>
                          <DeleteModal
                            message={
                              "Are you sure you want to delete the cabin ?"
                            }
                            handelDelete={(_) => handelDelete(cabin.id)}
                          />
                        </Modal.ModalContent>
                      </>
                    </Modal.ModalWindow>
                  </Modal>
                </Menu.Button>
              </li>
              <li>
                <Menu.Button>
                  <span onClick={(_) => duplicateCabinData(restCabinData)}>
                    <HiDocumentDuplicate />
                    Duplicate
                  </span>
                </Menu.Button>
              </li>

              <li>
                <Menu.Button>
                  <Modal>
                    <Modal.ModalButton open="Edit-cabin">
                      <span>
                        <FiEdit2 /> Edit
                      </span>
                    </Modal.ModalButton>

                    <Modal.ModalWindow open="Edit-cabin">
                      <>
                        <Modal.ModalHeader>
                          <span>
                            <IoCloseSharp />
                          </span>
                        </Modal.ModalHeader>
                        <Modal.ModalContent>
                          <CreateCabinForm cabin={cabin} />
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
    </>
  );
};

export default CabinTableRow;
