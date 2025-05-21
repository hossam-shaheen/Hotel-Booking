import { useForm } from "react-hook-form";
import { Button } from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow, { Label } from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignUp } from "../../hooks/useSignUp";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm();
  const password = watch("password");

  const { handelLogout, isPending } = useSignUp();

  const createUser = (data) => {
    const currentUser =
      data && data.fullName && data.email && data.password
        ? {
            fullName: data.fullName,
            email: data.email,
            password: data.password,
          }
        : null;
    handelLogout(currentUser);
    reset()
  };

  return (
    <Form onSubmit={handleSubmit((data) => createUser(data))}>
      <FormRow>
        <Label htmlFor="fullName">Full name</Label>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "Please enter your first name.",
          })}
          disabled={isPending}
        />

        {errors.fullName && <p>{errors.fullName.message}</p>}
      </FormRow>

      <FormRow>
        <Label htmlFor="email">Email address</Label>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "Please enter your email.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address",
            },
          })}
          disabled={isPending}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </FormRow>

      <FormRow>
        <Label htmlFor="password">Password (min 8 characters)</Label>
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "Please enter password.",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long.",
            },
          })}
          disabled={isPending}
        />

        {errors.password && <p>{errors.password.message}</p>}
      </FormRow>

      <FormRow>
        <Label htmlFor="passwordConfirm">Repeat password</Label>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "Please enter the confirmation password.",
            validate: (value) => value === password || "Passwords do not match",
          })}
          disabled={isPending}
        />
        {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
      </FormRow>

      <FormRow>
        <Button $variation={"danger"} type="reset">Cancel</Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
