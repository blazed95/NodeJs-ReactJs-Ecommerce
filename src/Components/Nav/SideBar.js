import React from "react";
import styled from "styled-components";

import "../../App.css";

const StyledItems2 = styled.div`
  display: none;

  @media (max-width: 650px) {
    width: 33%;
    display: flex;
    .items-container {
      position: fixed;
      background-color: #080705;
      /*transform: ${({ open }) =>
    open ? "translateX(0)" : "translateX(100%)"};*/
      clip-path: ${({ open }) =>
    open ? "circle(1000px at 100% 10%)" : "circle(0px at 90% 5%)"} ;
      -webkit-clip-path: ${({ open }) =>
    open ? "circle(1000px at 100% 10%)" : "circle(0px at 90% 5% )"};
      transition: clip-path 0.8s ease-out;
      transition: -webkit-clip-path 0.8s ease-out;
      top: 0;
      right: 0;
      height: 100vh;
      width: 100%;
    }
    .items-list {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      padding: 0;
    }
    .item-links {
      text-transform: uppercase;
      list-style-type: none;
      text-decoration: none;
      color: #ececec;
      font-weight: 400;
      /*margin: 33%;*/
    }
    .item-links:hover {
      font-weight: 600;
      color: 255, 165, 0;
      cursor: pointer;
      transition: 0.2s ease-in-out;
    }
    .items-list li {
    opacity:${({ open }) => (open ? 1 : 0)};
    }
    .items-list li:nth-child(1) {
    transition: opacity 0.5s ease 0.2s;
    }
    .items-list li:nth-child(2) {
    transition:  opacity 0.5s ease 0.4s;
    }
    .items-list li:nth-child(3) {
    transition:  opacity 0.5s ease 0.6s;
    }
    li.fade {
    opacity: 1;
    }
    
  }
`;
export default function SideBar({ open }) {
  return (
    <StyledItems2 className="items" open={open}>
      <div className="items-container">
        <ul className="items-list">
          <li className="item-links">Home</li>
          <li className="item-links">Shop</li>
          <li className="item-links">Art</li>
        </ul>
      </div>
    </StyledItems2>
  );
}
