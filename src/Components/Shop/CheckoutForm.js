import React, { useState } from 'react'
import { Link } from "react-router-dom"
import {
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    injectStripe
} from 'react-stripe-elements'
import { useAuth } from '../../Contexts/AuthContext.js'
import styled from "styled-components";
const CheckoutForm = ({ stripe }) => {
    const [receiptUrl, setReceiptUrl] = useState('')
    const { cart } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();

        /*try {

            const { token } = await stripe.createToken()
            console.log(token)
            const charge = await fetch('http://localhost:5000/api/stripe/charge', {
                method: "POST",
                body: JSON.stringify({
                    amount: cart.subTotal.toString().replace('.', ''),
                    source: token.id,
                    description: "",
                    receipt_email: ""
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Accept': 'application/json'
                },
            })
            let data = await charge.json()
            console.log(data)
            if (data.type === "success") {
                alert("SUCCESS -- YOUR ORDER IS CONFIRMED")
                setReceiptUrl(charge.data.charge.receipt_url)
            }
            else {
                alert("FAIL-YOUR ORDER IS NOT CONFIRMED")
            }
        } catch (err) {
            alert("Error")
            console.log(err)
        }
        */

    }



    if (receiptUrl) {
        return (
            <div className="success">
                <h2>Payment Successful!</h2>
                <a href={receiptUrl}>View Receipt</a>
                <Link to="/">Home</Link>
            </div>
        )
    }
    return (
        <CheckoutContainer>
            <div className="checkout-form">
                <p>Amount: {cart.subTotal}$</p>
                <form onSubmit={handleSubmit}>
                    <label>
                        Card details
                        <CardNumberElement className="stripe-element" />
                    </label>
                    <br></br>
                    <label>
                        Expiration date
                        <CardExpiryElement className="stripe-element" />
                    </label>
                    <br></br>
                    <label>
                        CVC
                        <CardCVCElement className="stripe-element" />
                    </label>
                    <button type="submit" className="order-button">
                        Pay
                    </button>
                </form>
            </div>
        </CheckoutContainer>
    )
}

export default injectStripe(CheckoutForm);

const CheckoutContainer = styled.div`
display: flex;
padding: 0;
height: 100vh;
width: 100%;
background-color: #e1e1e1;
label{
    width:100%;
}
.checkout-form{
    height: 100vh;
    width: 50%;
    margin: 0 ;
    box-sizing: border-box;
    padding: 0 ;
    

}
.checkout-form form {
    border: 3px solid #e6ebf1;
    margin: 0;
    padding: 0;
    width: 50%;
    background-color: #e6ebf1;
}
input,
.stripe-element{
  width: 100%;
  padding: 10px 14px;
  font-size: 17px;
  font-family: 'Source Code Pro', monospace;
 
  border: 0;
  outline: 0;
  border-radius: 4px;
  background: white;
}
.stripe-element--focus{
  box-shadow: rgba(50, 50, 93, 0.109804) 0px 4px 6px, rgba(0, 0, 0, 0.0784314) 0px 1px 3px;
  -webkit-transition: all 150ms ease;
  transition: all 150ms ease;
}
`