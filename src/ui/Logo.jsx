import { useContext } from "react";
import styled from "styled-components";
import { DarkModeContext } from "../context/DarkModeProvider";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { darkMode } = useContext(DarkModeContext);
  const logo = darkMode ? "./Images/logo-dark.png" : "./Images/logo-light.png";

  return (
    <StyledLogo>
      <Img src={logo} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
