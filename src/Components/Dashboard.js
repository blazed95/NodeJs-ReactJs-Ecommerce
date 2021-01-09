import React from 'react'
//import styled from "styled-components";
import Navbar from './Nav/Navbar'
//import Catalog from './Nav/Catalog'
//import Checkout from './Shop/Checkout'
import Products from './Shop/Products'

import { useAuth } from '../Contexts/AuthContext.js'




const Dashboard = ({ browserHistory }) => {
    //const [products, setProducts] = useState([]); //Components that render async data need to be prepared to render an empty state, at least once.
    //const [error, setError] = useState(false);
    const { currentUser, products } = useAuth(); // { logout } means select a specific function from useAuth import 
    //window.scrollTo(0, 0)


    //console.log(products)
    return (
        <>
            <Navbar />
            <Products productsdb={products} />
            {
                currentUser ?
                    (<>
                        <h1>Welcome {currentUser.displayName} to our Store </h1>
                    </>
                    )
                    :
                    (<>
                    </>
                    )
            }
        </>
    )
}



export default Dashboard;



