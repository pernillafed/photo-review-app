import React from 'react';
import { Form } from 'react-bootstrap';
import Masonry from 'react-masonry-css';
import { SRLWrapper } from "simple-react-lightbox";
import { masonryBreakpointsDefault } from '../shared/masonryBreakpoints';

const PhotoGrid = ({ photos, newPhotos, setNewPhotos, showCheckboxes }) => {

    const handleCheckboxChange = (e) => {
        const photo = photos.find(photo => photo.photoId === e.target.value);

        if (e.target.checked) {
            setNewPhotos([...newPhotos, photo]);

        } else {
            setNewPhotos(newPhotos.filter(photo => photo.photoId !== e.target.value));
        }
    };

    return (
        <SRLWrapper>

            <Masonry breakpointCols={masonryBreakpointsDefault} className="photo-grid masonry-grid justify-content-center mt-3" columnClassName="masonry-grid-column">
                {photos?.length > 0 && photos.map(photo => (

                    <div key={photo.photoId} className="img-wrapper position-relative">
                        <img src={photo.url} alt={photo.name} className="w-100 img-fluid" />
                        {showCheckboxes && <Form.Check type="checkbox" className="photo-checkbox" value={photo.photoId} onChange={handleCheckboxChange} />}
                    </div>

                ))}
            </Masonry>

        </SRLWrapper>
    );
}
 
export default PhotoGrid;