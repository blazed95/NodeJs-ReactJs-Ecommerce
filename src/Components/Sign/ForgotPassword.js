



import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useAuth } from "../../Contexts/AuthContext"
import { Link } from "react-router-dom"


const ForgotPassword = () => {
    const emailRef = useRef();

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');


    const { resetPassword } = useAuth()



    // Email validation function



    // async function handleSumbit(e) {
    const hadleSumbit = async (e) => {
        e.preventDefault()

        try {
            setError("")
            setMessage("")
            setLoading(true);
            await resetPassword(emailRef.current.value)
            setMessage("Check your Email!")
        } catch (e) {

            setError("There is no user record corresponding to this email address.")
        }
        setLoading(false);
    }

    return (
        <>
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Password Reset</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {message && <Alert variant="success">{message}</Alert>}
                            <Form onSubmit={hadleSumbit}>
                                <Form.Group id="email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" ref={emailRef} required />
                                </Form.Group>
                                <Button disabled={loading} className="w-100" type="submit">
                                    Reset Password
                                </Button>
                                <div className="w-100 text-center mt-3"><Link to="/login">Login Page</Link></div>
                            </Form>
                        </Card.Body>
                    </Card>
                    <p className="w-100 text-center mt-4"> Do you need a new account ? <Link to="/register"> Sign Up </Link> </p>
                </div>
            </Container>

        </ >)

}

export default ForgotPassword;