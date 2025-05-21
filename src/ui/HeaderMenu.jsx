import React, { useContext } from "react";
import styled from "styled-components";
import { TbLogout2 } from "react-icons/tb";
import { useLogout } from "../hooks/useLogout";
import { LuSun } from "react-icons/lu";
import { IoMoon } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { DarkModeContext } from "../context/DarkModeProvider";
import { NavLink } from "react-router-dom";

const MenuLList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  li:focus,
  li:focus-within {
    outline: none;
  }
`;
const MenuLink = styled.button`
  display: inline-block;
  color: var(--color-brand-600);
  text-decoration: none;
  font-weight: 500;
  font-size: 1.4rem;
  cursor: pointer;
  background-color: transparent;
  border: none;
  &:focus {
    outline: none;
  }

  svg {
    width: 1.8rem;
    height: 1.8rem;
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const StyledNavLink = styled(NavLink)`
  display: inline-block;
  color: var(--color-brand-600);
  text-decoration: none;
  font-weight: 500;
  font-size: 1.4rem;
  cursor: pointer;
  background-color: transparent;
  border: none;
  
  &:focus {
    outline: none;
  }

  svg {
    width: 1.8rem;
    height: 1.8rem;
    margin-left: 10px;
    margin-right: 10px;
  }

  &.active {
    color: var(--color-brand-800); // Style for the active link
    font-weight: bold;
  }
`;

export default function HeaderMenu() {
  const { handelLogout } = useLogout();
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <MenuLList>
      <li>
        <StyledNavLink to="/account">
        <FaUser />
        </StyledNavLink>
      </li>
      <li>
        <MenuLink onClick={toggleDarkMode}>
          {darkMode ? <LuSun /> : <IoMoon />}
        </MenuLink>
      </li>
      <li>
        <MenuLink onClick={handelLogout}>
          <TbLogout2 />
        </MenuLink>
      </li>
    </MenuLList>
  );
}
