import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from "../../Contexts/AuthContext"



const Login = ({ browserHistory }) => {
    const emailRef = useRef();
    const passwordRef = useRef();

    const history = useHistory();

    const [loading, setLoading] = useState('');
    const [error, setError] = useState('')
    //const url = window.location.href;
    const { login } = useAuth();


    const handleSumbit = async (e) => {
        e.preventDefault()
        console.log("handlesumbit YOoooo")
        try {
            setError("")
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.replace('/'); //After we Logged in that history.push brings us to the Dashboard page
            //console.log(browserHistory.location)
            //window.location.reload(false);
        } catch (e) {
            setError(e.message)

            switch (e.code) {
                case "auth/wrong-password":
                    setError("The password is invalid.")
                    break;
                case "auth/user-not-found":
                    setError("Incorrect email or password.")
                    break;
                default:
            }

        }
        setLoading(false);
    }



    return (
        <>
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Log In</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSumbit}>
                                <Form.Group id="email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" ref={emailRef} required />
                                </Form.Group>
                                <Form.Group id="passsword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" ref={passwordRef} required />
                                </Form.Group>
                                <Button disabled={loading} className="w-100" type="submit">
                                    Log In
                        </Button>
                            </Form>
                            <div className="w-100 text-center mt-3">
                                <Link to="/forgot-password">Forgot Password?</Link>
                            </div>
                        </Card.Body>
                    </Card>
                    <p className="w-100 text-center mt-4"> Creat Account ! <Link to="/register"> Sign Up </Link> </p>
                </div>
            </Container>
        </>

    )
}

export default Login;

