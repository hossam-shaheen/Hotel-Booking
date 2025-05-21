import { useForm } from "react-hook-form";
import { Button } from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow, { Label } from "../../ui/FormRow";
import Input from "../../ui/Input";
import Heading from "../../ui/Heading";
import useUpdateUser from "../../hooks/useUpdateUser";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateCurrentUserData, isPending } = useUpdateUser();

  const isUpdating = isPending;

  function onSubmit({ password }) {
    updateCurrentUserData({ password });
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow>
          <Label htmlFor="password">Password (min 8 characters)</Label>
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            disabled={isUpdating}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            })}
          />
          {errors?.password?.message}
        </FormRow>

        <FormRow>
          <Label htmlFor="passwordConfirm">Confirm password</Label>
          <Input
            type="password"
            autoComplete="new-password"
            id="passwordConfirm"
            disabled={isUpdating}
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                getValues().password === value || "Passwords need to match",
            })}
          />
          {errors?.passwordConfirm?.message}
        </FormRow>
        <FormRow>
          <Button onClick={reset} type="reset" $variation="secondary">
            Cancel
          </Button>
          <Button disabled={isUpdating}>Update password</Button>
        </FormRow>
      </Form>
    </>
  );
}

export default UpdatePasswordForm;
