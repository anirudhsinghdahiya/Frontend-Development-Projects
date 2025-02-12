import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";

import crest from '../../assets/uw-crest.svg';
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

function BadgerLayout(props) {
    const navigate = useNavigate();

    // Initialize loginStatus from sessionStorage
    const [loginStatus, setLoginStatus] = useState(() => {
        const storedStatus = sessionStorage.getItem('loginStatus');
        return storedStatus ? JSON.parse(storedStatus) : null;
    });

    // Update sessionStorage whenever loginStatus changes
    useEffect(() => {
        if (loginStatus) {
            sessionStorage.setItem('loginStatus', JSON.stringify(loginStatus));
        } else {
            sessionStorage.removeItem('loginStatus');
        }
    }, [loginStatus]);

    // State to store chatrooms and loading/error state
    const [chatrooms, setChatrooms] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    // Fetch chatrooms when the component mounts
    useEffect(() => {
        fetch("https://cs571api.cs.wisc.edu/rest/f24/hw6/chatrooms", {
            headers: {
                "X-CS571-ID": "bid_a2af385ee3dcc0025e6ea8de3c41a34c0983dc676d69028a71dc3bf93e2fc84a"
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch chatrooms");
                }
                return res.json();
            })
            .then(data => {
                setChatrooms(data);
                setLoading(false); 
            })
            .catch(err => {
                console.error(err);
                setError("Failed to load chatrooms");
                setLoading(false); 
            });
    }, []);

    // Logout function
    const handleLogout = () => {
        // Perform logout actions
        fetch("https://cs571api.cs.wisc.edu/rest/f24/hw6/logout", {
            method: "POST",
            headers: {
                "X-CS571-ID": "bid_a2af385ee3dcc0025e6ea8de3c41a34c0983dc676d69028a71dc3bf93e2fc84a"
            },
            credentials: "include"
        })
        .then(res => {
            if (res.ok) {
                // Clear login status
                setLoginStatus(null);
                sessionStorage.removeItem('loginStatus');
                navigate('/');
            } else {
                console.error("Logout failed with status:", res.status);
            }
        })
        .catch(err => {
            console.error("Logout Error:", err);
        });
    };

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt="BadgerChat Logo"
                            src={crest}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        BadgerChat
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>

                        {loginStatus ? (
                            <>
                                {/* User is logged in */}
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                {/* User is not logged in */}
                                <Nav.Link as={Link} to="login">Login</Nav.Link>
                                <Nav.Link as={Link} to="register">Register</Nav.Link>
                            </>
                        )}

                        <NavDropdown title="Chatrooms">
                            {
                                loading ? (
                                    <NavDropdown.Item>Loading chatrooms...</NavDropdown.Item>
                                ) : error ? (
                                    <NavDropdown.Item>{error}</NavDropdown.Item>
                                ) : (
                                    chatrooms.map((chatroom, index) => (
                                        <NavDropdown.Item as={Link} to={`/chatrooms/${chatroom}`} key={index}>
                                            {chatroom}
                                        </NavDropdown.Item>
                                    ))
                                )
                            }
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
            <div style={{ margin: "1rem" }}>
                <BadgerLoginStatusContext.Provider value={[loginStatus, setLoginStatus]}>
                    <Outlet />
                </BadgerLoginStatusContext.Provider>
            </div>
        </div>
    );
}

export default BadgerLayout;