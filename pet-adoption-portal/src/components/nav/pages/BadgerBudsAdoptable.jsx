import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BadgerBudsDataContext from '../../../contexts/BadgerBudsDataContext';
import BadgerBudSummary from './BadgerBudSummary';

const BadgerBudsAdoptable = () => {
  const allBuddies = useContext(BadgerBudsDataContext);
  const [availableBuddies, setAvailableBuddies] = useState([]);

  useEffect(() => {
    const savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds')) || [];
    const adoptedCatIds = JSON.parse(sessionStorage.getItem('adoptedCatIds')) || [];
    setAvailableBuddies(allBuddies.filter(buddy => !savedCatIds.includes(buddy.id) && !adoptedCatIds.includes(buddy.id)));
  }, [allBuddies]);

  const handleSave = (buddy) => {
    const savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds')) || [];
    savedCatIds.push(buddy.id);
    sessionStorage.setItem('savedCatIds', JSON.stringify(savedCatIds));
    
    alert(`${buddy.name} has been added to your basket!`);
    
    setAvailableBuddies(prevBuddies => prevBuddies.filter(b => b.id !== buddy.id));
  };

  return (
    <Container fluid>
      <h1>Available Badger Buds</h1>
      <p>The following cats are looking for a loving home! Could you help?</p>
      {availableBuddies.length === 0 ? (
        <p>No buds are available for adoption!</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
          {availableBuddies.map(buddy => (
            <Col key={buddy.id}>
              <BadgerBudSummary 
                buddy={buddy} 
                onSave={handleSave}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default BadgerBudsAdoptable;