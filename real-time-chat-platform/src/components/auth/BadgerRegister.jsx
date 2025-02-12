import React, { useState, useContext } from "react";
import { Form, Button, Alert } from "react-bootstrap"; // Importing Bootstrap components for form
import { useNavigate } from 'react-router-dom';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';

export default function BadgerRegister() {
    const [username, setUsername] = useState("");
    const [pin, setPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false); // To prevent multiple submissions

    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    // Regex for validating a 7-digit pin
    const pinRegex = /^\d{7}$/;

    const handleRegister = (e) => {
        e.preventDefault();

        // Validation checks
        if (!username || !pin) {
            setError("You must provide both a username and pin!");
            return;
        }

        if (!pinRegex.test(pin) || !pinRegex.test(confirmPin)) {
            setError("Your pin must be a 7-digit number!");
            return;
        }

        if (pin !== confirmPin) {
            setError("Your pins do not match!");
            return;
        }

        // Reset error message
        setError(null);
        setIsSubmitting(true); // Disable the register button to prevent multiple submissions

        // Perform the API call to register the user
        fetch("https://cs571api.cs.wisc.edu/rest/f24/hw6/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": "bid_a2af385ee3dcc0025e6ea8de3c41a34c0983dc676d69028a71dc3bf93e2fc84a" // Hardcoded Badger ID
            },
            credentials: "include",
            body: JSON.stringify({
                username: username,
                pin: pin
            })
        })
        .then(res => {
            setIsSubmitting(false); // Re-enable the register button
            if (res.status === 200) {
                // Registration successful
                setLoginStatus({ username });
                // Navigate to home page
                navigate('/');
                return res.json();
            } else if (res.status === 409) {
                // Username already exists
                setError("That username has already been taken!");
                throw new Error("Username already taken");
            } else {
                // Other errors
                setError("An error occurred during registration.");
                throw new Error("Unexpected registration error");
            }
        })
        .catch(err => {
            console.error("API Error:", err);
            // Error state is already set in the response handler
        });
    };

    return (
        <div>
            <h1>Register</h1>
            <Form onSubmit={handleRegister}>
                <Form.Group controlId="registerUsername">
                    <Form.Label htmlFor="registerUsername">Username</Form.Label>
                    <Form.Control
                        id="registerUsername"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                    />
                </Form.Group>

                <Form.Group controlId="registerPin">
                    <Form.Label htmlFor="registerPin">Pin</Form.Label>
                    <Form.Control
                        id="registerPin"
                        type="password"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        placeholder="Enter 7-digit pin"
                        maxLength={7}
                    />
                </Form.Group>

                <Form.Group controlId="registerConfirmPin">
                    <Form.Label htmlFor="registerConfirmPin">Repeat Pin</Form.Label>
                    <Form.Control
                        id="registerConfirmPin"
                        type="password"
                        value={confirmPin}
                        onChange={(e) => setConfirmPin(e.target.value)}
                        placeholder="Repeat 7-digit pin"
                        maxLength={7}
                    />
                </Form.Group>

                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

                <Button type="submit" className="mt-3" disabled={isSubmitting}>Register</Button>
            </Form>
        </div>
    );
}