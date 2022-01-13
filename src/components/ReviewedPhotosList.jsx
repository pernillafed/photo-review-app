import React from 'react';
import { SRLWrapper } from 'simple-react-lightbox';
import Masonry from 'react-masonry-css';
import { masonryBreakpointsSmall } from "../shared/masonryBreakpoints";

const ReviewedPhotosList = ({ reviewedType, reviewedPhotos, allPhotosLength }) => {
    return (
        <div className="reviewed-photos-list mt-4">

            <h3 className="display-6 text-center">{reviewedType} Photos</h3>
            <p className="text-center mb-4">{reviewedPhotos.length}/{allPhotosLength} photos</p>

            <SRLWrapper>

                <Masonry breakpointCols={masonryBreakpointsSmall} className="reviewed-photos masonry-grid justify-content-center mt-3" columnClassName="masonry-grid-column">
                    {reviewedPhotos && reviewedPhotos.map(photo => (

                        <img key={photo.photoId} src={photo.url} alt={photo.name} className="w-100 img-fluid" />
                        
                    ))}
                </Masonry>

            </SRLWrapper>

        </div>
    );
}
 
export default ReviewedPhotosList;