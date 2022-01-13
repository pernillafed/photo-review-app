import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const useAddNewPhotos = () => {

    const addNewPhotos = (newPhotos, newAlbum) => {
        newPhotos.forEach(async (photo) => {

            // Add each photo to subcollection in firestore
            await addDoc(collection(db, "albums", newAlbum.id, "photos"), {
                name: photo.name,
                path: photo.path,
                size: photo.size,
                timestamp: photo.timestamp,
                type: photo.type,
                url: photo.url,
            });
            
        });
    }

    return {
        addNewPhotos,
    };
}
 
export default useAddNewPhotos;