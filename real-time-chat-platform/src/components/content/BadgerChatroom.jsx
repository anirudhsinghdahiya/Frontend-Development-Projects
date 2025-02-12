import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Pagination, Form, Button, Alert } from "react-bootstrap";
import BadgerMessage from './BadgerMessage'; 
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [activePage, setActivePage] = useState(1); 
    const [title, setTitle] = useState("");  // Title for creating new post
    const [content, setContent] = useState("");  // Content for creating new post
    const [error, setError] = useState(null);  // Error message for post creation
    const [success, setSuccess] = useState(null);  // Success message for post creation
    const [isSubmitting, setIsSubmitting] = useState(false);  // To prevent multiple submissions

    // Access loginStatus from context
    const [loginStatus] = useContext(BadgerLoginStatusContext);

    // Fetch messages from the API
    const loadMessages = (page = 1) => {
        setLoading(true);
        fetch(`https://cs571api.cs.wisc.edu/rest/f24/hw6/messages?chatroom=${props.name}&page=${page}`, {
            headers: {
                "X-CS571-ID": "bid_a2af385ee3dcc0025e6ea8de3c41a34c0983dc676d69028a71dc3bf93e2fc84a"
            }
        })
            .then(res => res.json())
            .then(json => {
                setMessages(json.messages);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false); 
            });
    };

    useEffect(() => {
        loadMessages(activePage); 
    }, [props.name, activePage]);

    // Handle post creation
    const handleCreatePost = (e) => {
        e.preventDefault();

        if (!title || !content) {
            setError("You must provide both a title and content!");
            return;
        }

        // Reset messages
        setError(null);
        setSuccess(null);
        setIsSubmitting(true);

        // Correct API call to create a new post
        fetch(`https://cs571api.cs.wisc.edu/rest/f24/hw6/messages?chatroom=${props.name}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": "bid_a2af385ee3dcc0025e6ea8de3c41a34c0983dc676d69028a71dc3bf93e2fc84a"
            },
            credentials: "include",
            body: JSON.stringify({
                title: title,
                content: content
            })
        })
        .then(res => {
            setIsSubmitting(false);
            if (res.status === 200) {
                setSuccess("Successfully posted!");
                setTitle("");  // Clear form
                setContent("");  
                loadMessages(activePage);  // Reload messages after successful post
            } else {
                setError("An error occurred while creating the post.");
            }
        })
        .catch(err => {
            console.error("API Error:", err);
            setIsSubmitting(false);
            setError("An unexpected error occurred.");
        });
    };

    // Handle message deletion
    const handleDelete = (messageId) => {
        fetch(`https://cs571api.cs.wisc.edu/rest/f24/hw6/messages?id=${messageId}`, {
            method: "DELETE",
            headers: {
                "X-CS571-ID": "bid_a2af385ee3dcc0025e6ea8de3c41a34c0983dc676d69028a71dc3bf93e2fc84a"
            },
            credentials: "include"
        })
        .then(res => {
            if (res.status === 200) {
                alert("Successfully deleted the post!");
                loadMessages(activePage); // Reload messages after deletion
            } else {
                alert("An error occurred while deleting the post.");
            }
        })
        .catch(err => {
            console.error("API Error:", err);
            alert("An unexpected error occurred.");
        });
    };

    return (
        <>
            <h1>{props.name} Chatroom</h1>
            <hr />

            {/* Post creation form, visible only if the user is logged in */}
            {loginStatus ? (
                <Form onSubmit={handleCreatePost}>
                    <Form.Group controlId="postTitle">
                        <Form.Label htmlFor="postTitle">Post Title</Form.Label>
                        <Form.Control
                            id="postTitle"
                            type="text"
                            placeholder="Enter post title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="postContent">
                        <Form.Label htmlFor="postContent">Post Content</Form.Label>
                        <Form.Control
                            id="postContent"
                            as="textarea"
                            rows={3}
                            placeholder="Enter post content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Form.Group>

                    {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                    {success && <Alert variant="success" className="mt-3">{success}</Alert>}

                    <Button type="submit" className="mt-3" disabled={isSubmitting}>
                        Create Post
                    </Button>
                </Form>
            ) : (
                <Alert variant="warning">You must be logged in to post!</Alert>
            )}

            <hr />

            {/* Message display */}
            {loading ? (
                <p>Loading messages...</p>
            ) : messages.length > 0 ? (
                <Row>
                    {messages.map((message) => (
                        <Col key={message.id} xs={12} sm={6} md={4} lg={3}>
                            <BadgerMessage
                                message={message}
                                onDelete={handleDelete}
                                currentUser={loginStatus ? loginStatus.username : null}
                            />
                        </Col>
                    ))}
                </Row>
            ) : (
                <p>There are no messages on this page yet!</p>
            )}

            {/* Pagination */}
            <Pagination className="mt-3">
                {[1, 2, 3, 4].map(page => (
                    <Pagination.Item
                        key={page}
                        active={page === activePage}
                        onClick={() => setActivePage(page)}
                    >
                        {page}
                    </Pagination.Item>
                ))}
            </Pagination>
        </>
    );
}