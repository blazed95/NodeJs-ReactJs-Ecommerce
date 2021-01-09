import React, { useEffect, useState } from 'react'
import { StripeProvider, Elements } from 'react-stripe-elements'
import InjectedCheckoutForm from "./CheckoutForm"

const Checkout = () => {

    const [stripeState, setStripeState] = useState({ stripe: null })

    useEffect(() => {
        console.log(window.Stripe)
        if (window.Stripe) {
            setStripeState({ stripe: window.Stripe('pk_test_51I2CbbJqyLBpp2ndmhtySWTAMzj0WcR7FQSbBb7LRhkrGGuniBxcHgCuLv1K8HM5iWZErrKYHPO7yAwOY84KZir100H93NGQK4') })
        } else {
            document.querySelector('#stripe-js').addEventListener('load', () => {
                // Create Stripe instance once Stripe.js loads
                setStripeState({ stripe: window.Stripe('pk_test_51I2CbbJqyLBpp2ndmhtySWTAMzj0WcR7FQSbBb7LRhkrGGuniBxcHgCuLv1K8HM5iWZErrKYHPO7yAwOY84KZir100H93NGQK4') })
            });
        }
    }, [])
    return (
        <StripeProvider stripe={stripeState.stripe} >
            <Elements>
                <InjectedCheckoutForm />
            </Elements>
        </StripeProvider>
    )
}
export default Checkout;