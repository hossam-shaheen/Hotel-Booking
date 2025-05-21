import { createContext, useContext, useState, cloneElement } from "react";
import styled from "styled-components";
import useCloseModal from "../hooks/useCloseModal";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: absolute;
  min-width: 150px;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  z-index: 9999;
  right: ${(props) => props.$position.$x};
  top: ${(props) => props.$position.$y};

`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    display: flex;
    align-items: center;
    justify-content: space-between;
    svg {
      margin-right: 8px;
    }
  }
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenuContext = createContext();

const Menu = ({ children }) => {
  const [openMenu, setOpenMenu] = useState("");
  const openCurrentMenu = (currentMenu) => {
    setOpenMenu(currentMenu);
  };

  const closeCurrentMenu = () => {
    setOpenMenu("");
  };

  return (
    <MenuContext.Provider
      value={{ openMenu, closeCurrentMenu, openCurrentMenu }}
    >
      <StyledMenu>{children}</StyledMenu>
    </MenuContext.Provider>
  );
};
export default Menu;

const Toggle = ({ openList, children }) => {
  const { openMenu, closeCurrentMenu, openCurrentMenu } =
    useContext(MenuContext);
  const toggleMenu = () => {
    openMenu === openList ? closeCurrentMenu() : openCurrentMenu(openList);
  };
  return (
    <StyledToggle>
      <> {cloneElement(children, { onClick: toggleMenu })}</>
    </StyledToggle>
  );
};

const List = ({ children, openList, $position }) => {
  const { openMenu } = useContext(MenuContext);

  if (openMenu !== openList) return null;
  return <StyledList $position={$position}>{children}</StyledList>;
};

const Button = ({ children }) => {
  return <StyledButton>{children}</StyledButton>;
};

Menu.Toggle = Toggle;
Menu.List = List;
Menu.Button = Button;
