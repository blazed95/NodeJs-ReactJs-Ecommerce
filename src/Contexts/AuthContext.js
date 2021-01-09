import React, { useContext, useState, useEffect } from "react"
import firebase from "../config/firebase"
//import { useHistory } from "react-router-dom"
require('dotenv').config();

const AuthContext = React.createContext();


export const useAuth = () => {
    return useContext(AuthContext)
}


export const AuthProvider = ({ children, browserHistory }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [cartItems, setCartItems] = useState([]); //Components that render async data need to be prepared to render an empty state, at least once.


    //const history = useHistory()
    //Fetching Products from our MongoDB
    const fetchData = async () => {

        const res = await fetch("http://localhost:5000/Items")
        res.json().then((res) => {
            setProducts(res.data)
        })
            .catch((err) => {
                alert("Error")
                console.log(err)
            })
    }
    const addtoCart = async (id, quantity, size) => {
        try {
            const res = await fetch("http://localhost:5000/Cart", {
                method: "POST",
                body: JSON.stringify({
                    itemId: id,
                    quantity: quantity,
                    size: size
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Accept': 'application/json'
                },
            })
            let data = await res.json()
            console.log(data)
            if (data.type === "success") {
                alert("SUCCESS - YOUR ITEM IS ON THE CART")
            }
            else {
                alert("FAIL-SOMETHING WENT WRONG")
            }
        } catch (err) {
            alert("Error")
            console.log(err)
        }
    }


    const fetchCartData = async () => {

        const res = await fetch("http://localhost:5000/Cart")
        res.json().then((res) => {
            setCart(res.data);
            setCartItems(res.data.items)
        })
            .catch((err) => {
                alert("Error")
                console.log(err)
            })
    }



    //Register req to Firebase Auth
    const register = (email, password) => {

        return firebase.auth().createUserWithEmailAndPassword(email, password)
    }
    //Login req to Firebase Auth
    const login = (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
    }
    //Logout req to Firebase Auth
    const logout = () => {
        return firebase.auth().signOut();
    }
    //Reset Password req to Firebase Auth
    const resetPassword = (email) => {
        return firebase.auth().sendPasswordResetEmail(email)

    }
    //This function gives a DisplayName in the user who is created with createUserWithEmailAndPassword(email, password)
    const addUserName = (name) => {
        firebase.auth().currentUser.updateProfile({
            displayName: name
        })
    }

    const authListener = () => {
        firebase.auth().onAuthStateChanged((user) => {

            if (user) {
                setCurrentUser(user);
                console.log(user)
                //We done loading the user... so now we can render it
            }
        })
    }

    useEffect(() => {
        fetchData();
        fetchCartData();
        setLoading(false);
        const unsubscribe = authListener();
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        browserHistory,
        register,
        login,
        logout,
        resetPassword,
        addUserName,
        addtoCart,
        fetchCartData,
        products,
        cart,
        cartItems
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>

    )
}