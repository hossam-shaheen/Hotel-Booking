import { IoCloseSharp } from "react-icons/io5";
import { Modal } from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
import { Button } from "../../ui/Button";

const AddNewCabin = () => {
  return (
    <>
      <Modal>
        <Modal.ModalButton open="Add-cabin">
          <Button $size="large" $variation="primary">
            Add New Cabin
          </Button>
        </Modal.ModalButton>

        <Modal.ModalWindow open="Add-cabin">
          <Modal.ModalHeader><IoCloseSharp /></Modal.ModalHeader>
          <Modal.ModalContent>
             <CreateCabinForm />
          </Modal.ModalContent>
        </Modal.ModalWindow>
      </Modal>
    
    </>
  );
};
export default AddNewCabin;
