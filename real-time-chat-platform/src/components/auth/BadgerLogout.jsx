import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';

export default function BadgerLogout() {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

  useEffect(() => {
    fetch('https://cs571api.cs.wisc.edu/rest/auth/logout', {
      method: 'GET',
      headers: {
        "X-CS571-ID": "bid_a2af385ee3dcc0025e6ea8de3c41a34c0983dc676d69028a71dc3bf93e2fc84a"
      },
      credentials: "include"
    })
    .then(res => {
      if (res.status === 200) {
        // Logout successful
        setLoginStatus(null); // Clear login status in context
        navigate('/'); // Redirect to home page
      } else {
        // Handle errors
        console.error("Logout failed with status:", res.status);
        // Optionally display an error message or redirect
        setLoginStatus(null); // Ensure login status is cleared
        navigate('/');
      }
    })
    .catch(err => {
      console.error("Logout Error:", err);
      // Handle network errors
      setLoginStatus(null); // Ensure login status is cleared
      navigate('/');
    });
  }, [navigate, setLoginStatus]);

  // Optionally, display a message while logging out
  return null;
}