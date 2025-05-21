import { useEffect, useRef } from "react";

const useCloseModal = (closeModal) => {
  const overlayElement = useRef(null);

  useEffect(() => {
    const handleClose = (e) => {
      if (
        overlayElement.current && 
        !overlayElement.current.contains(e.target)
      ) {
        closeModal(""); 
      }
    };

    document.addEventListener("click", handleClose, true);

    return () => {
      document.removeEventListener("click", handleClose, true);
    };
  }, [closeModal]);

  return overlayElement;
};

export default useCloseModal;
