import React from "react";
import { Card, Button } from "react-bootstrap";

function BadgerMessage(props) {

    const { message, onDelete, currentUser } = props;
    const { id, title, poster, content, created } = message;

    const dt = new Date(created);

    return (
        <Card style={{ margin: "0.5rem", padding: "0.5rem" }}>
            <h2>{title}</h2>
            <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
            <br />
            <i>{poster}</i>
            <p>{content}</p>
            {poster === currentUser && (
                <Button variant="danger" onClick={() => onDelete(id)}>
                    Delete
                </Button>
            )}
        </Card>
    );
}

export default BadgerMessage;