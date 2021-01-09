import React, { useState } from "react";
import "../../App.css";
import styled from "styled-components";
import SideBar from "./SideBar";

const StyledBurger = styled.div`
  display: none;
  width: 2.5rem;
  height: 2rem;
  position: fixed;
  width: 33%;
  right: -20%;
  z-index: 20;
  cursor: pointer;

  @media (max-width: 650px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  .burger-row {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => (open ? "#e9e3e6" : "black")};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0))")};
    }
    &:nth-child(2) {
      opacity: ${({ open }) => (open ? 0 : 1)};
    }
    &:nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0))")};
    }
  }
`;
export default function Burger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div className="burger-row"></div>
        <div className="burger-row"></div>
        <div className="burger-row"></div>
      </StyledBurger>
      <SideBar open={open} />
    </>
  );
}
