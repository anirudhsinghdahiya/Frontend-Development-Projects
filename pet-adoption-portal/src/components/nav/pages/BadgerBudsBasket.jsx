import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import BadgerBudsDataContext from '../../../contexts/BadgerBudsDataContext';

export default function BadgerBudsBasket() {
    const allBuddies = useContext(BadgerBudsDataContext);
    const [savedBuddies, setSavedBuddies] = useState([]);

    useEffect(() => {
        const savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds')) || [];
        const adoptedCatIds = JSON.parse(sessionStorage.getItem('adoptedCatIds')) || [];
        setSavedBuddies(allBuddies.filter(buddy => savedCatIds.includes(buddy.id) && !adoptedCatIds.includes(buddy.id)));
    }, [allBuddies]);

    const handleUnselect = (buddy) => {
        const savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds')) || [];
        const updatedSavedCatIds = savedCatIds.filter(id => id !== buddy.id);
        sessionStorage.setItem('savedCatIds', JSON.stringify(updatedSavedCatIds));
        
        alert(`${buddy.name} has been removed from your basket!`);
        
        setSavedBuddies(prevBuddies => prevBuddies.filter(b => b.id !== buddy.id));
    };

    const handleAdopt = (buddy) => {
        const adoptedCatIds = JSON.parse(sessionStorage.getItem('adoptedCatIds')) || [];
        adoptedCatIds.push(buddy.id);
        sessionStorage.setItem('adoptedCatIds', JSON.stringify(adoptedCatIds));

        const savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds')) || [];
        const updatedSavedCatIds = savedCatIds.filter(id => id !== buddy.id);
        sessionStorage.setItem('savedCatIds', JSON.stringify(updatedSavedCatIds));
        
        alert(`Thank you for adopting ${buddy.name}! 🐱🏠`);
        
        setSavedBuddies(prevBuddies => prevBuddies.filter(b => b.id !== buddy.id));
    };

    return (
        <Container fluid>
            <h1>Badger Buds Basket</h1>
            <p>These cute cats could be all yours!</p>
            {savedBuddies.length === 0 ? (
                <p>You have no buds in your basket!</p>
            ) : (
                <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
                    {savedBuddies.map(buddy => (
                        <Col key={buddy.id}>
                            <Card className="mb-3">
                                <Card.Img 
                                    variant="top" 
                                    src={`https://raw.githubusercontent.com/CS571-F24/hw5-api-static-content/main/cats/${buddy.imgIds[0]}`} 
                                    alt={`A picture of ${buddy.name}`} 
                                />
                                <Card.Body>
                                    <Card.Title>{buddy.name}</Card.Title>
                                    <Button variant="secondary" onClick={() => handleUnselect(buddy)} className="me-2">Unselect</Button>
                                    <Button variant="success" onClick={() => handleAdopt(buddy)}>Adopt</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}