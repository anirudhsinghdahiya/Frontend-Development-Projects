import React, { useState } from 'react';
import { Card, Button, Carousel } from 'react-bootstrap';

const BadgerBudSummary = ({ buddy, onSave }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleSave = () => {
    onSave(buddy);
  };

  return (
    <Card className="mb-3">
      {showDetails ? (
        <Carousel>
          {buddy.imgIds.map((imgId, index) => (
            <Carousel.Item key={imgId}>
              <img
                className="d-block w-100"
                src={`https://raw.githubusercontent.com/CS571-F24/hw5-api-static-content/main/cats/${imgId}`}
                alt={`${buddy.name} - picture ${index + 1}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <Card.Img 
          variant="top" 
          src={`https://raw.githubusercontent.com/CS571-F24/hw5-api-static-content/main/cats/${buddy.imgIds[0]}`} 
          alt={`A picture of ${buddy.name}`} 
        />
      )}
      <Card.Body>
        <Card.Title>{buddy.name}</Card.Title>
        
        {showDetails && (
          <>
            <Card.Text>Gender: {buddy.gender}</Card.Text>
            <Card.Text>Breed: {buddy.breed}</Card.Text>
            <Card.Text>Age: {buddy.age}</Card.Text>
            {buddy.description && <Card.Text>Description: {buddy.description}</Card.Text>}
          </>
        )}
        
        <Button variant="primary" onClick={toggleDetails} className="me-2">
          {showDetails ? "Show Less" : "Show More"}
        </Button>
        <Button variant="secondary" onClick={handleSave}>Save</Button>
      </Card.Body>
    </Card>
  );
};

export default BadgerBudSummary;