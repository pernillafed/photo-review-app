import React, { useState } from 'react';
import { doc, query, collection, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { Button, Container, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import UploadPhoto from '../components/UploadPhoto';
import { db } from "../firebase";
import { useFirestoreDocumentData, useFirestoreQueryData } from "@react-query-firebase/firestore";
import { useAuthContext } from "../contexts/AuthContext";
import PhotoGrid from '../components/PhotoGrid';
import EditAlbum from '../components/EditAlbum';
import useAddNewPhotos from '../hooks/useAddNewPhotos';

const MyAlbum = () => {
    const [newPhotos, setNewPhotos] = useState([]);
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [editAlbum, setEditAlbum] = useState(false);
    const [showReviewUrl, setShowReviewUrl] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { albumId } = useParams();
    const { currentUser } = useAuthContext();
    const { addNewPhotos } = useAddNewPhotos();

    const navigate = useNavigate();

    const albumRef = doc(db, "albums", albumId);
    const photosQueryRef = query(
        collection(db, "albums", albumId, "photos"),
        orderBy("timestamp", "desc")
    );

    // Get chosen album from firestore
    const { data: album, isLoading: isLoadingAlbum } = useFirestoreDocumentData(["albums", albumId], albumRef, {
        subscribe: true,
        idField: "albumId",
    }, {
        refetchOnMount: "always",
    });

    // Get array of photos from firestore
    const { data: photos, isLoading: isLoadingPhotos } = useFirestoreQueryData(["photos"], photosQueryRef, {
        subscribe: true,
        idField: "photoId",
    }, {
        refetchOnMount: "always",
    });

    const handleCreateClick = async () => {
        if (newPhotos.length === 0) {
            return setError("You must choose at least one photo");
        }

        setError(null);

        try {
            setLoading(true);

            // Add new album to firestore
            const newAlbum = await addDoc(collection(db, "albums"), {
                name: `New album - ${new Date().toLocaleString()}`,
                description: "",
                owner: currentUser.uid,
                timestamp: serverTimestamp(),
            });

            // Add photos to subcollection in new album in firestore
            addNewPhotos(newPhotos, newAlbum);

            navigate("/my-albums");

        } catch (err) {
            setError(err.message);

        } finally {
            setLoading(false);
        }
    };

    const handleCancelCreateClick = () => {
        setShowCheckboxes(false);
        setError(null);
        setNewPhotos([]);
    };

    return (
        <Container className="my-album mt-4 pb-5 px-4 d-flex flex-column align-items-center">
            {isLoadingAlbum ? <p>Loading...</p> : album && album.owner === currentUser.uid ? (

                <>
                    {!editAlbum ? (

                        <>
                            <h1 className="display-2 text-center">{album.name}</h1>
                            <p className="album-description text-center">{album.description}</p>
                            {!photos || photos.length === 0 && <Button className="my-2" variant="dark" onClick={() => setEditAlbum(true)}>Edit album</Button>}
                        </>

                    ) : <EditAlbum album={album} setEditAlbum={setEditAlbum} />}

                    {isLoadingPhotos ? <p>Loading...</p> : photos?.length > 0 ? (

                        <>
                            {!showCheckboxes && !editAlbum ? (

                                <div className="d-flex my-3">
                                    <Button className="me-3" variant="dark" onClick={() => setEditAlbum(true)}>Edit album</Button>
                                    <Button variant="dark" onClick={() => setShowCheckboxes(true)}>Choose photos</Button>
                                </div>

                            ) : showCheckboxes && !editAlbum ? (

                                <div className="d-flex my-3">
                                    <Button disabled={loading} variant="primary" className="me-2" onClick={handleCreateClick}>Create new album with chosen photos</Button>
                                    <Button disabled={loading} variant="danger" onClick={handleCancelCreateClick}>Cancel</Button>
                                </div>

                            ) : ""}

                            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                            
                            <PhotoGrid photos={photos} newPhotos={newPhotos} setNewPhotos={setNewPhotos} showCheckboxes={showCheckboxes} />
                            
                            <div className="d-flex flex-column align-items-center mt-2 mb-4">
                                <Button variant="primary" onClick={() => setShowReviewUrl(!showReviewUrl)}>{!showReviewUrl ? "Show" : "Hide"} review URL</Button>
                                {showReviewUrl && <p className="review-url rounded px-3 py-2 m-0">{window.location.origin}/review-photos/album/{album.albumId}</p>}
                            </div>
                        </>

                    ) : <p className="mt-3"><i>This album is empty</i></p>}
                    
                    <UploadPhoto albumId={albumId} />
                </>

            ) : album && album.owner !== currentUser.uid ? <p>You are unauthorized to access this page</p> : <p>Album does not exist</p>}

        </Container>
    );
}
 
export default MyAlbum;