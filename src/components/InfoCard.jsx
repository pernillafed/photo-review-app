import React from 'react';
import { Card } from 'react-bootstrap';

const InfoCard = ({ img, description}) => {
    return (
        <Card className="info-card mb-4 mx-3">

            <Card.Img variant="top" src={img} />

            <Card.Body className="bg-dark">
                <Card.Title className="text-center text-light">{description}</Card.Title>
            </Card.Body>
            
        </Card>
    );
}
 
export default InfoCard;