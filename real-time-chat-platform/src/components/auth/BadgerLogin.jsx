import React, { useRef, useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';

export default function BadgerLogin() {
    const usernameRef = useRef(null);
    const pinRef = useRef(null);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    // Regex for validating a 7-digit pin
    const pinRegex = /^\d{7}$/;

    const handleLogin = (e) => {
        e.preventDefault();

        const username = usernameRef.current.value;
        const pin = pinRef.current.value;

        // Validation checks
        if (!username || !pin) {
            setError("You must provide both a username and pin!");
            return;
        }

        if (!pinRegex.test(pin)) {
            setError("Your pin is a 7-digit number!");
            return;
        }

        // Reset error message
        setError(null);
        setIsSubmitting(true);

        // Perform the API call to authenticate the user
        fetch("https://cs571api.cs.wisc.edu/rest/f24/hw6/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": "bid_a2af385ee3dcc0025e6ea8de3c41a34c0983dc676d69028a71dc3bf93e2fc84a" // Your Badger ID
            },
            credentials: "include",
            body: JSON.stringify({
                username: username,
                pin: pin
            })
        })
        .then(res => {
            setIsSubmitting(false);
            if (res.status === 200) {
                // Login successful
                setLoginStatus({ username });
                // Navigate to home page
                navigate('/');
                return res.json();
            } else if (res.status === 401) {
                // Incorrect username or pin
                setError("Incorrect username or pin!");
                throw new Error("Incorrect username or pin");
            } else {
                // Other errors
                setError("An error occurred during login.");
                throw new Error("Unexpected login error");
            }
        })
        .catch(err => {
            console.error("API Error:", err);
            // Error state is already set in the response handler
        });
    };

    return (
        <div>
            <h1>Login</h1>
            <Form onSubmit={handleLogin}>
                <Form.Group controlId="loginUsername">
                    <Form.Label htmlFor="loginUsername">Username</Form.Label>
                    <Form.Control
                        id="loginUsername"
                        type="text"
                        placeholder="Enter username"
                        ref={usernameRef}
                    />
                </Form.Group>

                <Form.Group controlId="loginPin">
                    <Form.Label htmlFor="loginPin">Pin</Form.Label>
                    <Form.Control
                        id="loginPin"
                        type="password"
                        placeholder="Enter 7-digit pin"
                        maxLength={7}
                        ref={pinRef}
                    />
                </Form.Group>

                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

                <Button type="submit" className="mt-3" disabled={isSubmitting}>Login</Button>
            </Form>
        </div>
    );
}