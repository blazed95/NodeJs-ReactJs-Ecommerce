import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useAuth } from "../../Contexts/AuthContext"
import { Link } from "react-router-dom"


const Register = ({ browserHistory }) => {
    const userNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');

    //const history = useHistory();

    const { register, addUserName } = useAuth()

    // Email validation function
    const emailIsValid = (email) => {
        return /\S+@\S+\.\S+/.test(email)
    }


    // async function handleSumbit(e) {
    const hadleSumbit = async (e) => {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Password don't match")
        }
        if (!emailIsValid(emailRef.current.value)) {
            return setError("Email is not valid")
        }

        try {
            setError("")
            setLoading(true);
            await register(emailRef.current.value, passwordRef.current.value)
            await addUserName(userNameRef.current.value)
            browserHistory.push("/")
            window.location.reload(false);
            //After we Sign up that history.push brings us to the Dashboard page
        } catch (e) {
            console.log(e.message)
            setError(e.message)
        }
        setLoading(false);


    }

    return (
        <>
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Sign Up</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={hadleSumbit}>
                                <Form.Group id="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control placeholder="Username" ref={userNameRef} />
                                </Form.Group>
                                <Form.Group id="email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" ref={emailRef} required />
                                </Form.Group>
                                <Form.Group id="passsword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" ref={passwordRef} required />
                                </Form.Group>
                                <Form.Group id="confirm_password">
                                    <Form.Label> Confirm Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" ref={passwordConfirmRef} required />

                                </Form.Group>
                                <Button disabled={loading} className="w-100" type="submit">
                                    Creat Account
                        </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <p className="w-100 text-center mt-4"> Do you already have an account? <Link to="/login"> Log In </Link> </p>
                </div>
            </Container>

        </ >)

}

export default Register;
