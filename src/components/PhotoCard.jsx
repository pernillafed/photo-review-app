import React from 'react';
import { Button, Card } from 'react-bootstrap';

const PhotoCard = ({ photo, acceptedPhotos, setAcceptedPhotos, rejectedPhotos, setRejectedPhotos }) => {

    const handleThumbsUp = () => {
        if (acceptedPhotos.includes(photo)) {
            return;

        } else if (rejectedPhotos.includes(photo)) {
            setRejectedPhotos(rejectedPhotos.filter(p => p !== photo));
            setAcceptedPhotos([...acceptedPhotos, photo]);

        } else {
            setAcceptedPhotos([...acceptedPhotos, photo]);
        }
    };

    const handleThumbsDown = () => {
        if (rejectedPhotos.includes(photo)) {
            return;

        } else if (acceptedPhotos.includes(photo)) {
            setAcceptedPhotos(acceptedPhotos.filter(p => p !== photo));
            setRejectedPhotos([...rejectedPhotos, photo]);

        } else {
            setRejectedPhotos([...rejectedPhotos, photo]);
        }
    };

    return (
        <Card className="photo-card">

            <Card.Img variant="top" src={photo.url} />

            <Card.Body className="d-flex justify-content-center">

                <Button
                    variant="success"
                    className={`w-50 me-2 ${acceptedPhotos.includes(photo) && "disabled"}`}
                    onClick={handleThumbsUp}
                ><i className="fas fa-thumbs-up"></i></Button>

                <Button
                    variant="danger"
                    className={`w-50 ${rejectedPhotos.includes(photo) && "disabled"}`}
                    onClick={handleThumbsDown}
                ><i className="fas fa-thumbs-down"></i></Button>
                
            </Card.Body>

        </Card>
    );
}
 
export default PhotoCard;