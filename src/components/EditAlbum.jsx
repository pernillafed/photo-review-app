import React, { useRef, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { Form, Alert, Button } from 'react-bootstrap';
import { db } from '../firebase';

const EditAlbum = ({ album, setEditAlbum }) => {
    const newAlbumNameRef = useRef();
    const newAlbumDescriptionRef = useRef();
    
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newAlbumNameRef.current.value.length) {
            return setError("An album name must be provided");
        }

        setError(null);

        try {
            setLoading(true);

            // Update album in firestore
            await updateDoc(doc(db, "albums", album.albumId), {
                name: newAlbumNameRef.current.value,
                description: newAlbumDescriptionRef.current.value
            });

            setEditAlbum(false);

        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="edit-album w-100">

            <Form.Group controlId="new-album-name" className="mb-3">
                <Form.Control type="text" placeholder="new album name" defaultValue={album.name} ref={newAlbumNameRef} />
            </Form.Group>

            <Form.Group controlId="new-album-description" className="mb-3">
                <Form.Control as="textarea" rows={3} placeholder="new album description" defaultValue={album.description} ref={newAlbumDescriptionRef} />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            <div className="d-flex justify-content-center my-3">
                <Button disabled={loading} type="submit" variant="primary" className="me-2">Save</Button>
                <Button disabled={loading} variant="danger" onClick={() => setEditAlbum(false)}>Cancel</Button>
            </div>
            
        </Form>
    );
}
 
export default EditAlbum;