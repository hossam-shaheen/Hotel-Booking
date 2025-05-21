import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Heading as="h3">Update user data</Heading>
      <UpdateUserDataForm />

      <Heading as="h3">Update password</Heading>
      <UpdatePasswordForm />
    </>
  );
}

export default Account;
