import { useState } from "react";
import Input from "../../ui/Input";
import { Button } from "../../ui/Button";
import Form from "../../ui/Form";
import styled from "styled-components";
import { useLogin } from "../../hooks/useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

const LoginFormRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  margin-bottom: 1.6rem;
  justify-content: end;
`;
const LoginLabel = styled.label`
  flex-basis: 8rem;
`;

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handelLogin, isPending } = useLogin();
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    const account = {
      email,
      password,
    };
    handelLogin(account);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <LoginFormRow>
        <LoginLabel htmlFor="email">Email</LoginLabel>
        <Input
          type="email"
          id="email"
          placeholder="Enter your email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />
      </LoginFormRow>
      <LoginFormRow>
        <LoginLabel htmlFor="email">Password</LoginLabel>
        <Input
          type="password"
          id="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
        />
      </LoginFormRow>
      <LoginFormRow>
        <Button size="large">{isPending ? <SpinnerMini /> : "Login"}</Button>
      </LoginFormRow>
    </Form>
  );
}

export default LoginForm;
