import React, { useRef, useState } from 'react';
import { Container, Form, Alert, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

const LoginPage = () => {
    const emailRef = useRef();
    const passwordRef = useRef();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuthContext();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);

        try {
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate("/");

        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <Container className="login-page mt-4 pb-5 d-flex flex-column align-items-center">

            <h1 className="display-2">Log In</h1>

            <Form onSubmit={handleSubmit} className="login-form rounded mt-4 mb-5 p-3 p-sm-4 w-100">

                {error && <Alert variant="danger">{error}</Alert>}

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} />
                </Form.Group>

                <Button disabled={loading} type="submit" variant="primary" className="mt-2">Log In</Button>
                <p className="mt-3 mb-2">Don't have an account? <Link to="/signup">Sign up!</Link></p>

            </Form>

        </Container>
    );
}
 
export default LoginPage;