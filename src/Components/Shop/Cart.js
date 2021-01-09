import React from 'react'
import Navbar from '../Nav/Navbar'
import styled from "styled-components";
import { useAuth } from '../../Contexts/AuthContext.js'
import { Link } from 'react-router-dom'
import "./Shop.css"



const Cart = () => {
    const { cart, cartItems, addtoCart, browserHistory } = useAuth();
    //const productRef = useRef();



    const onQuantityChange = async (id, quantity, size) => {
        if (quantity > 0) {
            await addtoCart(id, quantity, size)
            window.location.reload(false);
        }
        else if (quantity < 0) {
            await addtoCart(id, quantity, size)
            window.location.reload(false);
        }
    }

    const emptyCart = async () => {
        try {
            const res = await fetch("http://localhost:5000/Cart/empty-cart", {
                method: "DELETE",
            })
            await res.json();
            console.log(res)
            if (res.status === 200) {
                browserHistory.push("/")
                window.location.reload(false);
            }
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <>
            <Navbar />
            <h1 className="cart-Header"> Your Cart</h1>
            <hr></hr>
            <CartContainer >

                {cartItems.length > 0 ?
                    <>
                        <div className="table-header">
                            <ul className="table-header-list">
                                <li className="table-header-list1" >Product</li>
                                <li>Price</li>
                                <li>Quantity</li>
                                <li>Total</li>
                            </ul>
                        </div>
                        {cartItems.map(prod => (

                            <div key={prod._id} >
                                <hr></hr>

                                <div className="table-content" >
                                    <div className="product-container">
                                        <p className="product-name">{prod.itemId.name}</p>
                                        <img className="product-image" src={"http://localhost:5000/" + prod.image} alt={prod.name}></img>
                                        <p>Size: {prod.size.charAt(0).toUpperCase() + prod.size.slice(1)}</p>
                                    </div>
                                    <p>{prod.price}$</p>
                                    <div className="product-quantity-container">{prod.quantity}
                                        <div className="product-quantity">
                                            <button onClick={e => { onQuantityChange(prod.itemId._id, 1, prod.size) }}> + </button>
                                            <button onClick={e => { onQuantityChange(prod.itemId._id, -1, prod.size) }} > - </button>
                                        </div>
                                    </div>
                                    <p>{prod.total}$</p>
                                </div>
                            </div>

                        ))}
                        <hr></hr>
                        <div className="subtotal-container">
                            <h5>Subtotal: {cart.subTotal}$</h5>
                            <br></br>
                            <p>Shipping and taxes calculated at checkout</p>
                            <br></br>
                            <div className="subtotal-buttons">
                                <button onClick={(e) => { emptyCart() }}>Empty Cart</button>
                                <Link className="checkout-button" to='/checkout'>
                                    <button>Checkout</button>
                                </Link>

                            </div>

                        </div>
                    </>
                    :
                    <>
                        <div className="empty-cart">
                            <br />
                            <hr />
                            <h1>Your Cart Is Empty</h1>
                            <hr />
                        </div>
                    </>}



            </CartContainer >
        </>
    )
}

export default Cart

const CartContainer = styled.div`
margin: 3% 15%;
font-family: "Montserrat", sans-serif;
font-size: 12px;
p {
    margin: 0;
}
hr {
    margin: 10px 0;
}

.table-header{
    width: 100%;
    align-items: center;

}
.table-content {
    display: flex;
    justify-content: space-between;
    align-items:center;
}
.table-header-list{
    display: flex;
    justify-content: space-between;
    margin: 0 ;
    padding: 0;
    list-style-type: none;
    text-decoration: none;

    font-weight: 600;
    font-size: 18px;
}
.table-header-list1{
    width: 160px;
    text-align: center;
    display: flex;
    justify-content: center;
}

.product-container{
    width: 160px;
    text-align: center;
}
.product-image{
    width: 80px;
}
.product-name{
    font-weight: 600;
}
.product-quantity-container{
    display: flex;
    align-items:center;
    
}
.product-quantity {
    display: flex;
    flex-direction: column;
    margin: 0 10px;
}
.product-quantity button {
    color:black;
    background-color: #e9ecef;
    border-width: 1px;
    border-color: black;
    margin: 1px 0px;
    transition: 0.2s ease-in-out;
}
.product-quantity button:hover {
    background-color: white;
    
    transition: 0.2s ease-in-out;
}
.subtotal-container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    letter-spacing: 2px;
    padding-bottom: 10%;
}
.subtotal-buttons button{
    width: 100px;
    border: 0;
    margin-left: 10px;
    transition: 0.2s ease-in-out;
}
.subtotal-buttons button:last-child{
    background-color: #ffc53d;
}
.checkout-button{
    background-color: #e9ecef;
}

.empty-cart{
    width: 100%;
    text-align: center;
}
`