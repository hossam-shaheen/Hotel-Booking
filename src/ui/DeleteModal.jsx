import React from "react";
import { Button } from "./Button";
import FormRow from "./FormRow";

export default function DeleteModal({ message, handelDelete, onClick }) {
  return (
    <>
      <p>{message}</p>

      <FormRow>
        <Button $size="medium" $variation="secondary" onClick={onClick}>
          Cancel
        </Button>
        <Button $size="medium" $variation="primary" onClick={handelDelete}>
          Yes
        </Button>
      </FormRow>
    </>
  );
}
