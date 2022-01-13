import React, { useRef, useState } from 'react';
import { Form, Alert, Button } from 'react-bootstrap';
import { useAuthContext } from '../contexts/AuthContext';
import { serverTimestamp } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const CreateAlbum = () => {
    const albumNameRef = useRef();
    const albumDescriptionRef = useRef();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const { currentUser } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!albumNameRef.current.value.length) {
            return setError("An album name must be provided");
        }

        setError(null);

        try {
            setLoading(true);

            // Add album to firestore
            await addDoc(collection(db, "albums"), {
                name: albumNameRef.current.value,
                description: albumDescriptionRef.current.value,
                owner: currentUser.uid,
                timestamp: serverTimestamp(),
            });

            albumNameRef.current.value = "";
            albumDescriptionRef.current.value = "";

        } catch (err) {
            setError(err.message);

        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="create-album rounded mt-4 mb-5 p-3 p-sm-4 w-100">

            <h2 className="display-4 mb-4">Create Album</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group controlId="album-name" className="mb-3">
                <Form.Label>Album Name</Form.Label>
                <Form.Control type="text" ref={albumNameRef} />
            </Form.Group>

            <Form.Group controlId="album-description" className="mb-3">
                <Form.Label>Album Description</Form.Label>
                <Form.Control as="textarea" rows={3} ref={albumDescriptionRef} />
            </Form.Group>

            <Button disabled={loading} type="submit" variant="primary" className="mt-2">Create</Button>

        </Form>
    );
}
 
export default CreateAlbum;