import React, { useState, useEffect } from "react";
import Logout from "../Sign/Logout"
import styled from "styled-components";
import { Avatar, Dropdown, Menu } from "antd"
import { BsPerson, BsBag } from 'react-icons/bs';
import { Link } from 'react-router-dom'
import { useAuth } from '../../Contexts/AuthContext'
import "../../App.css";


export default function RightNav({ open }) {
  const { currentUser, cartItems } = useAuth();
  const [numItems, setNumItems] = useState()

  const numItemsToCart = () => {
    if (cartItems.length !== 0) {
      let total = 0;
      cartItems.forEach(item => {
        //console.log(item.quantity)
        total = total + item.quantity
        setNumItems(total)
      })
    }




  }
  useEffect(() => {
    numItemsToCart();

  })
  const menu = (
    <Menu>
      <Menu.Item>
        <Logout />
      </Menu.Item>
    </Menu>
  );
  return (
    <StyledItems className="items" open={open}>
      <ul className="items-container">
        {currentUser ?
          (<>
            <Dropdown overlay={menu} placement="bottomCenter" arrow>
              <Avatar
                style={{
                  backgroundColor: "black",
                  verticalAlign: 'middle',
                  width: "24px",
                  height: "24px",
                  lineHeight: "24px",
                  cursor: "pointer"
                }}
              >
                {currentUser.displayName.charAt(0).toUpperCase()}
              </Avatar>
            </Dropdown>
          </>)
          :
          (<>
            <Link to='/login' style={{ height: "24px", lineHeight: "0" }}> <BsPerson className="person icons" /></Link>
          </>)}

        <Link to='/cart' className="cart" >
          <BsBag className="bag icons"></BsBag>
          {cartItems.length > 0 ?
            <div className="cart-count">
              <div className="cart-count-span">{numItems}</div>
            </div>
            :
            <></>
          }

        </Link>
      </ul >
    </StyledItems >
  );
}

const StyledItems = styled.div`
  width: 33%;
  .items-container {
    display: flex;
    justify-content: flex-end;
    margin: 0;
    padding: 0;
  }
  .icons {
    color: rgb(61,66,70);
    //color: #e9e3e6;
    font-weight: 400;
  }
  .item-links:hover {
    font-weight: 600;
    color: 255, 165, 0;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }
  .person {
    height: 25px;
    width: 25px;
    cursor: pointer;
    color: black;
    margin: 0 5%;
    stroke-width: 0.3;
  }
  .cart {
    height: 22px;
    margin: 0 ;
     text-decoration: none;
     margin: 0 5%;  
     text-align: center;
  }
  .bag {   
    height: 22px;
    width: 22px;
    cursor: pointer;
    color: black;
    stroke-width: 0.3;
  }
  .cart-count {
    position: relative;
    top: -30px;
    right: -20px;
    color:white;
    height: 18px;
    background-color: black;
    shape-outside: circle();
    clip-path: circle();
    font-size: 11px;
    cursor: default;
   
  }
  .cart-count-span {
    position: relative;
    top: 1px;
  }
  .person:hover{
    height: 27px;
    width: 27px;
    transition: 0.2s ease-in-out;
  }
 
  @media (max-width: 650px) {
    display: none;
  }
`;