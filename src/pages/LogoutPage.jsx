import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

const LogoutPage = () => {
    const { logout } = useAuthContext();

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(async () => {
        await logout();
        
        // Clears all connected caches so that next logged in user doesn't see previous users data before their data is done loading
        queryClient.clear();
        
        navigate("/");
    }, []);

    return (
        <Container className="logout-page mt-4 pb-5">

            <p className="display-4 text-center mb-5">You are being logged out...</p>

        </Container>
    );
}
 
export default LogoutPage;