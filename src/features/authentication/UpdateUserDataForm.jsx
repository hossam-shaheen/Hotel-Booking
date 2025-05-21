import { useState } from "react";

import FileInput from "../../ui/FileInput";
import { Button } from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow, { Label } from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useGetUser } from "../../hooks/useGetUser";
import Heading from "../../ui/Heading";
import useUpdateUser from "../../hooks/useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { full_name: currentFullName },
    },
  } = useGetUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  const { updateCurrentUserData, isPending } = useUpdateUser();

  const isUpdating = isPending;
  
  function handleSubmit(e) {
    e.preventDefault();
    updateCurrentUserData({ fullName, avatar });
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <Label htmlFor="email">Email address</Label>
          <Input value={email} disabled />
        </FormRow>
        <FormRow>
          <Label htmlFor="fullName">Full name</Label>
          <Input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            id="fullName"
            disabled={isUpdating}
          />
        </FormRow>
        <FormRow>
          <Label htmlFor="avatar">Upload a new avatar</Label>
          <FileInput
            id="avatar"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            disabled={isUpdating}
          />
        </FormRow>
        <FormRow>
          <Button type="reset" $variation="secondary">
            Cancel
          </Button>
          <Button>Update account</Button>
        </FormRow>
      </Form>
    </>
  );
}

export default UpdateUserDataForm;
