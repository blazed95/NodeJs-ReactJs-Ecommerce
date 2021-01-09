import React, { useEffect, useState } from 'react'

import Navbar from '../Nav/Navbar'
// eslint-disable-next-line
import Catalog from '../Nav/Catalog'
import styled from "styled-components";
import queryString from 'query-string';
import { Radio, Button, Image } from 'antd';
import "./Shop.css";
import { useAuth } from '../../Contexts/AuthContext.js'



const Product = ({ location }) => {
    const { products, addtoCart, browserHistory } = useAuth();
    const { id } = queryString.parse(location.search)
    const [product, setProduct] = useState({});
    const [size, setSize] = useState('medium');
    useEffect(() => {
        products.forEach((prod) => {
            if (prod._id === id) {
                setProduct(prod);
            }
        })
    });
    const handleSizeChange = e => {
        setSize(e.target.value);
    };

    const addtoItemCart = async (item, num, size) => {
        await addtoCart(item, num, size)
        //
        browserHistory.push("/")
        window.location.reload(false);
    }
    return (
        <div>
            <Navbar />
            {/*<Catalog />*/}
            <ProductSection>
                <div className="left-container">
                    <div className="image-container">
                        <Image className="product-image" src={"http://localhost:5000/" + product.image} alt={product.name} />
                    </div>
                </div>
                <div className="right-container">
                    <h2 className="product-name">{product.name}</h2>
                    <br></br>
                    <div className="price-container">
                        <h3 className="product-price">Price: {'$' + product.price}</h3>
                        <Button type="primary" className="add-to-cart-button" onClick={(e) => (addtoItemCart(product._id, 1, size))}>Add to Cart</Button>
                    </div>
                    <br></br>
                    <br></br>
                    <div className="price-container">
                        <h3 className="product-size">Size: </h3>
                        <Radio.Group className="size-button" buttonStyle="solid" optionType="button" value={size} onChange={handleSizeChange}>
                            <Radio.Button value="small">Small</Radio.Button>
                            <Radio.Button value="medium">Medium</Radio.Button>
                            <Radio.Button value="large">Large</Radio.Button>
                        </Radio.Group>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h3 className="product-desc">Description:</h3>
                    <p className="product-desc">  {product.desc}</p>
                    <br></br>
                </div>
            </ProductSection>

        </div >
    )
}
export default Product;


const ProductSection = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0;  
    padding: 0;
    width: 100%;
    min-height: 86vh;
.price-container{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content:flex-start;    
}
.left-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%; 
}
.image-container{

}
.test {
    text-align: center;
}
.product-image{
    width: 400px;
    cursor: pointer;


}
.right-container {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center; 

}
.product-desc{ 
    margin-right: 10%;
    text-align: justify;
}
.product-price{
    font-family: 'Montserrat', sans-serif;
    font-size: 1.2rem;
    vertical-align: middle;
    margin-right: 10%;
    margin-bottom: 0;
}
.product-size {
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: 1.2rem;
    margin-right: 5%;
    margin-bottom: 0;
}
.size-button{
    border-color:black;
}
.add-to-cart-button {
    white-space: nowrap;
    border: 0;
    outline: 0;
    display: inline-block;
    width: 40%;
    height: 40px;
    line-height: 40px;
    padding: 0 14px;
    box-shadow: 0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08);
    color: #fff;
    border-radius: 4px;
    font-size: 15px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.025em;
    text-decoration: none;
    -webkit-transition: all 150ms ease;
    transition: all 150ms ease;
    margin-top: 10px;
}
.add-to-cart-button:hover {
    background-color:#ffc53d;
}
.product-image:hover{
    opacity: 0.7;
    transition: 0.15s ease-in-out;
}
@media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

`