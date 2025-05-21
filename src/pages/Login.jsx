import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;
const LoginSubTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 500;
  text-align: center;
`;
function Login() {
  return <LoginLayout>
    <Logo/>
    <LoginSubTitle>Login to the wild oasis</LoginSubTitle>
    <LoginForm />
  </LoginLayout>;
}

export default Login;
