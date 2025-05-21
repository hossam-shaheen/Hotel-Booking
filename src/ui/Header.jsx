import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import { useGetUser } from "../hooks/useGetUser";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  align-items: center;
  justify-content: end;
`;

const UserName = styled.h1`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-800);
  margin-left: 10px;
  margin-right: 15px;
`;

function Header() {
  const { user } = useGetUser();

  return (
    <StyledHeader>
      <UserAvatar />
      <UserName>{user?.user_metadata?.full_name}</UserName>
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
