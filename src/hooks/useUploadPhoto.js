import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from '../contexts/AuthContext';
import { db, storage } from '../firebase';

const useUploadPhoto = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(null);

    const { currentUser } = useAuthContext();

    const allowedFileTypes = ["image/jpeg", "image/png"];

    const uploadPhoto = (image, albumId) => {
        setLoading(true);

        if (!image) {
            setError("Not an image");
            setLoading(false);
            return;
        }

        if (!allowedFileTypes.includes(image.type)) {
            setError("Not a valid file type (jpeg and png only)");
            setLoading(false);
            return;
        }

        const uuid = uuidv4();
        const fileExt = image.name.substring(image.name.lastIndexOf(".") + 1);
        const fileRef = ref(storage, `photos/${currentUser.uid}/${uuid}.${fileExt}`);

        // Upload photo to storage
        const uploadTask = uploadBytesResumable(fileRef, image);

        // Add event to uploadTask
        uploadTask.on("state_changed", (snapshot) => {
            setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));

        }, (err) => {
            setError(err.message);
            setProgress(null);
            setLoading(false);

        }, async () => {
            // Get photo url from storage
            const url = await getDownloadURL(fileRef);

            // Add photo to subcollection in firestore
            await addDoc(collection(db, "albums", albumId, "photos"), {
                name: image.name,
                path: fileRef.fullPath,
                size: image.size,
                timestamp: serverTimestamp(),
                type: image.type,
                url,
            });

            setLoading(false);
            setProgress(null);
            setError(null);

            // Scroll to top of page when upload is done
            window.scrollTo(0, 0);
        });
    };

    return {
        error,
        loading,
        progress,
        uploadPhoto,
    };
}
 
export default useUploadPhoto;