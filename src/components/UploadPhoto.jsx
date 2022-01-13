import React, { useRef, useState } from 'react';
import { Form, Alert, Button, ProgressBar } from "react-bootstrap";
import useUploadPhoto from '../hooks/useUploadPhoto';

const UploadPhoto = ({ albumId }) => {
    const [image, setImage] = useState(null);

    const fileInputRef = useRef();

    const { error, loading, progress, uploadPhoto } = useUploadPhoto();

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);

        } else {
            // setImage to null so that Form.Text (image size) disappears if we have no file in the input field
            setImage(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Upload photo to storage and firestore
        uploadPhoto(image, albumId);

        fileInputRef.current.value = "";
        
        // setImage to null so that Form.Text (image size) disappears if we have no file in the input field
        setImage(null);
    };

    return (
        <Form onSubmit={handleSubmit} className="upload-photo rounded mt-3 mb-5 p-3 p-sm-4 w-100">

            <h2 className="display-4 mb-4">Upload Photo</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group controlId="file-upload" className="mb-3">
                <Form.Label>Choose a photo to upload</Form.Label>
                <Form.Control type="file" multiple onChange={handleFileChange} ref={fileInputRef} />
                {image && <Form.Text className="text-muted">{Math.round(image.size / 1024)} kb</Form.Text>}
            </Form.Group>

            <Button disabled={loading} type="submit" variant="primary" className="mt-2">Upload</Button>
            {progress ? <ProgressBar className="mt-3" now={progress} label={`${progress} %`} /> : ""}

        </Form>
    );
}

export default UploadPhoto;