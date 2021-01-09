import React from "react";
import { Link } from "react-router-dom"
import "../../App.css";
//import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import logo from "../../images/update.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

import Burger from "./Burger.js";
import RightNav from "./RightNav";

export default function Navbar() {

  //const [fillOnScroll, setfillOnScroll] = useState(false);

  //Scroll one page magic
  /*seScrollPosition(
      ({ prevPos, currPos }) => {
          const isShow = currPos.y < 0;
          if (isShow !== fillOnScroll) setfillOnScroll(isShow);
      },
      [fillOnScroll],
      false,
      false,
      50
  );
  */

  //Navbar animation


  return (
    <StyledNav className="navbar" /*fillOnScroll={fillOnScroll}*/>
      <div className="social">
        <ul className="social-list">
          <FontAwesomeIcon
            className="socialIcon fa-youtube"
            icon={faYoutube}
            size="2x"
          />
          <FontAwesomeIcon
            className="socialIcon fa-facebook"
            icon={faFacebook}
            size="2x"
          />
          <FontAwesomeIcon
            className="socialIcon fa-instagram"
            icon={faInstagram}
            size="2x"
          />
        </ul>
      </div>

      <div className="logo-container">
        <Link to="/"><img className="logo-image" src={logo} alt=""></img></Link>
      </div>

      <Burger />
      <RightNav />
    </StyledNav>
  );
}

const StyledNav = styled.div`
  background-color: #e9ecef;
  z-index: 500;
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  /*background-color: ${({ fillOnScroll }) =>
    fillOnScroll ? "rgba(255, 82, 27, 0)" : "rgba(255, 82, 30, 1)"};
  transition: background-color 0.4s ease-in-out;*/
  width: 100%;
  min-height: 10vh;
  /*min-height: ${({ fillOnScroll }) => (fillOnScroll ? "7vh" : "10vh")};
  transition: min-height 0.25s ease-in-out;
  -webkit-box-shadow: 4px 11px 15px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 4px 11px 15px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 4px 11px 15px 0px rgba(0, 0, 0, 0.75);*/
  padding: 0.5rem 2rem;
  .navbar {
    background-color: #f2e9e4;
  }
  .social {
    width: 33%;
  }
  .social-list {
    display: flex;
    margin: 0;
    padding: 0;
  }
  .socialIcon {
    margin: 0 2%;
  }
  .fa-facebook:hover {
    cursor: pointer;
    color: #0d389b;
    text-shadow: 0 0 15px #0d389b;
    transition: 0.5s ease;
  }
  .fa-instagram:hover {
    cursor: pointer;
    color: #bc2a8d;
    text-shadow: 0 0 15px #bc2a8d;
    transition: 0.5s ease;
  }
  .fa-youtube:hover {
    cursor: pointer;
    color: #ff0000;
    text-shadow: 0 0 15px #ff0000;
    transition: 0.5s ease;
  }
  .fa-2x {
    font-size: 1.2em;
    color: rgb(61,66,70)
  }

  /*LOGO*/
  .logo-container {
    width: 33%;
    display: flex;
    justify-content: center;
    align-items: center;

  }
  .logo-image {
    height: 60px;
    width: 60px;
    color: black;

  }

  /*burger*/
  @media (max-width: 650px) {
    .fa-2x {
      font-size: 1.3em;
      color: black;
      z-index: 10;
      transition: 0.3s ease-in-out;
    }
  }
`;
