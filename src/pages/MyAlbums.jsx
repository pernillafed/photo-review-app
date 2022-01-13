import React from 'react';
import { useFirestoreQueryData } from '@react-query-firebase/firestore';
import { collection, orderBy, query, where } from 'firebase/firestore';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CreateAlbum from '../components/CreateAlbum';
import { useAuthContext } from '../contexts/AuthContext';
import { db } from '../firebase';

const MyAlbums = () => {
    const { currentUser } = useAuthContext();

    const queryRef = query(
        collection(db, "albums"),
        where("owner", "==", currentUser.uid),
        orderBy("timestamp", "desc")
    );

    // Get array of albums from firestore
    const { data, isLoading } = useFirestoreQueryData(["albums"], queryRef, {
        subscribe: true,
        idField: "id",
    }, {
        refetchOnMount: "always",
    });

    return (
        <Container className="my-albums mt-4 pb-5 d-flex flex-column align-items-center">

            <h1 className="display-2">My Albums</h1>

            {isLoading ? <p>Loading...</p> : data?.length > 0 ? (

                <div className="d-flex flex-wrap justify-content-center w-100 mt-3">
                    {data.map(album => (

                        <Link
                            to={`/my-albums/album/${album.id}`}
                            key={album.id}
                            className="album-card w-100 mb-2 mx-1 p-3 text-center text-white fs-5 bg-dark rounded text-decoration-none"
                        >{album.name}</Link>

                    ))}
                </div>

            ) : <p className="my-3">You have no albums</p>}

            <CreateAlbum />

        </Container>
    );
}
 
export default MyAlbums;