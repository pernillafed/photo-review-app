import React, { useEffect, useRef, useState } from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, NavLink } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

const Navigation = () => {
    // Custom expand state, so we can control when navbar should open and close
    const [expanded, setExpanded] = useState(false);

    const { currentUser } = useAuthContext();

    const outsideClickRef = useRef();

    const handleOutsideClick = (e) => {
        // Closes navbar menu if we click anywhere outside of the navbar
        if(outsideClickRef && outsideClickRef.current && !outsideClickRef.current.contains(e.target)) {
            setExpanded(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.addEventListener('mousedown', handleOutsideClick);
        }
    });

    return (
        <Navbar bg="light" variant="light" expand="md" expanded={expanded} ref={outsideClickRef} className="navigation">

            <Container>
                
                <Link to="/" className="logo text-decoration-none text-dark fs-5" onClick={() => setExpanded(false)}>PhotoReview</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />

                <Navbar.Collapse id="basic-navbar-nav">
                    {currentUser ? (

                        <Nav className="ms-auto py-2">
                            {/* setExpanded closes navbar menu when we click on a NavLink */}
                            <NavLink to="/my-albums" className="nav-link text-end" onClick={() => setExpanded(false)}>My Albums</NavLink>
                            <NavLink to="/logout" className="nav-link text-end" onClick={() => setExpanded(false)}>Log Out</NavLink>
                        </Nav>

                    ) : (

                        <Nav className="ms-auto py-2">
                            <NavLink to="/login" className="nav-link text-end" onClick={() => setExpanded(false)}>Log In</NavLink>
                            <NavLink to="/signup" className="nav-link text-end" onClick={() => setExpanded(false)}>Sign Up</NavLink>
                        </Nav>
                        
                    )}
                </Navbar.Collapse>

            </Container>

        </Navbar>
    );
}
 
export default Navigation;