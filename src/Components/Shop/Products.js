import React from 'react'
import styled from "styled-components";
import { useHistory } from 'react-router-dom'
import "./Shop.css"


const Products = ({ productsdb }) => {

    const history = useHistory();


    const handlePurchase = prod => () => {
        history.push(`/product/${prod.name.replace(/\s/g, '-')}?&id=${prod._id}`)
        //window.location.reload(false);
    }

    return (
        <>
            <h2 className="text-Header 1">Keep it Real Keep it Loco</h2>

            <ProductsContainer>
                {productsdb.map(prod => (
                    <div className="product" key={prod._id} onClick={handlePurchase(prod)}>
                        <img className="product-image" src={"http://localhost:5000/" + prod.image} alt={prod.name} />
                        <h2 className="product-name">{prod.name}</h2>
                        <h3 className="product-price">{'$' + prod.price}</h3>
                    </div>

                ))}
            </ProductsContainer>
        </>
    )
}

export default Products
const ProductsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content:center;
    margin: 2% 5%;

    .product{
        display: flex;
        flex-direction: column;
        width: 200px;
        align-items: center;
        justify-content:center;
        margin: 20px 35px;
        
    }
    .product-image{
        height: 150px;
        cursor: pointer;
        transition: 0.4s ease-in;
    }
    .product-name {
        text-align: center;
        flex-direction: center;
        align-items: center;
        font-size: 1rem;
        cursor: pointer;
        transition: 0.4s ease-in;

    }
    .product-price {
        font-size: 0.9rem;
        font-weight: 400;
        cursor: pointer;
    }
    .product:hover{
        opacity: 0.6;
    }
    
    @media (max-width: 900px) {
        .product-image {
            height: 210px;
            transition: 0.4s ease-in;
        }
        .product-name {
            font-size: 1.1rem;
            transition: 0.4s ease-in;
        }
  }
  @media (max-width: 590px) {
        .product-image {
            height: 270px;
            transition: 0.4s ease-in;   
        }

        .product-name {
            font-size: 1.2rem;
            transition: 0.4s ease-in;
        }
  }
`