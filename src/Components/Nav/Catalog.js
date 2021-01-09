import React from 'react'
import styled from "styled-components";

const Catalog = () => {
    return (
        <>

            <CatalogContainer className="catalog">
                <ul className="catalog-contaier">
                    <li className="catalog-list"><a href="/#">Hoodies</a></li>
                    <li className="catalog-list"><a href="/#">Shoes</a></li>
                    <li className="catalog-list"><a href="/#">Tshirts</a></li>
                    <li className="catalog-list"><a href="/#">Pants</a></li>
                </ul>

            </CatalogContainer>

        </>
    )
}
export default Catalog

const CatalogContainer = styled.div`
    width: 100%;
    min-height: 3vh;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: auto;
    margin: 0 0;
    .catalog-contaier {
        width: 100%;
        display: flex;
        justify-content: space-evenly;

        align-items: center;
        list-style-type: none;
        text-decoration: none;
        margin: 0 ; 
        background-color : #f8f9fa;
        padding: 0 20%;
  }
  .catalog-list a{
    
    text-decoration: none;
    color: black;
  }
  .catalog-list {
    text-transform: uppercase;
    font-weight: 400;
    font-family: 'Ubuntu', sans-serif;
    padding: 0;
    margin: 0 2%;
  }
  .catalog-list:hover {
      font-weight: 500;
  }

`