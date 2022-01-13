import React, { useRef, useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from "../contexts/AuthContext";

const SignupPage = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { signup } = useAuthContext();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError("The passwords does not match");
        }

        setError(null);

        try {
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            navigate("/");

        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }

    return (
        <Container className="signup-page mt-4 pb-5 d-flex flex-column align-items-center">

            <h1 className="display-2">Sign Up</h1>

            <Form onSubmit={handleSubmit} className="signup-form rounded mt-4 mb-5 p-3 p-sm-4 w-100">

                {error && <Alert variant="danger">{error}</Alert>}

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" ref={confirmPasswordRef} />
                </Form.Group>

                <Button disabled={loading} type="submit" variant="primary" className="mt-2">Sign Up</Button>
                <p className="mt-3 mb-2">Already have an account? <Link to="/login">Log in!</Link></p>
                
            </Form>

        </Container>
    );
}
 
export default SignupPage;