import React, { useState } from 'react';
import { Alert, Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { query, collection, orderBy, addDoc, doc, serverTimestamp } from 'firebase/firestore';
import { useFirestoreDocumentData, useFirestoreQueryData } from "@react-query-firebase/firestore";
import { db } from "../firebase";
import PhotoCard from '../components/PhotoCard';
import Masonry from 'react-masonry-css';
import { SRLWrapper } from 'simple-react-lightbox';
import ReviewedPhotosList from '../components/ReviewedPhotosList';
import { masonryBreakpointsDefault } from '../shared/masonryBreakpoints';
import useAddNewPhotos from '../hooks/useAddNewPhotos';

const ReviewPhotos = () => {
    const { albumId } = useParams();

    const [acceptedPhotos, setAcceptedPhotos] = useState([]);
    const [rejectedPhotos, setRejectedPhotos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

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

    const handleClick = async () => {
        if (acceptedPhotos.length + rejectedPhotos.length !== photos.length) {
            return setError("All photos must be reviewed");
        }

        if (acceptedPhotos.length ===  0) {
            return setError("You must accept at least one photo");
        }
        
        setError(null);

        try {
            setLoading(true);

            // Add new album to firestore
            const newAlbum = await addDoc(collection(db, "albums"), {
                name: `Client review - ${album.name} - ${new Date().toLocaleString()}`,
                description: "",
                owner: album.owner,
                timestamp: serverTimestamp(),
            });

            // Add photos to new album in firestore
            addNewPhotos(acceptedPhotos, newAlbum);

            navigate("/thank-you");

        } catch (err) {
            setError(err.message);

        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="review-photos mt-4 pb-5 px-4 d-flex flex-column align-items-center">

            <h1 className="display-2">Review Photos</h1>

            {isLoadingAlbum ? <p>Loading...</p> : album ? (

                <>
                    <h2 className="display-4 text-center mt-3">Album:<br />{album.name}</h2>
                    {isLoadingPhotos ? <p>Loading...</p> : photos?.length > 0 ? (

                        <>
                            <SRLWrapper>

                                <Masonry
                                    breakpointCols={masonryBreakpointsDefault}
                                    className="review-photos-grid justify-content-center mt-3"
                                    columnClassName="review-photos-grid-column"
                                >
                                    {photos.map(photo => (

                                        <PhotoCard
                                            key={photo.photoId}
                                            photo={photo}
                                            acceptedPhotos={acceptedPhotos}
                                            setAcceptedPhotos={setAcceptedPhotos}
                                            rejectedPhotos={rejectedPhotos}
                                            setRejectedPhotos={setRejectedPhotos}
                                        />
                                        
                                    ))}
                                </Masonry>
                                
                            </SRLWrapper>
                            
                            <div className="mb-5 d-flex flex-wrap w-100 justify-content-evenly">
                                {acceptedPhotos.length > 0 && (
                                    <ReviewedPhotosList reviewedType="Accepted" reviewedPhotos={acceptedPhotos} allPhotosLength={photos.length} />
                                )}
                                {rejectedPhotos.length > 0 && (
                                    <ReviewedPhotosList reviewedType="Rejected" reviewedPhotos={rejectedPhotos} allPhotosLength={photos.length} />
                                )}
                            </div>
                            
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Button disabled={loading} variant="primary" className="mt-3 mb-5" onClick={handleClick}>Send review</Button>
                        </>

                    ) : <p className="mt-3"><i>There are no photos to review</i></p>}
                </>

            ) : <p className="mt-3">Album does not exist</p>}

        </Container>
    );
}
 
export default ReviewPhotos;