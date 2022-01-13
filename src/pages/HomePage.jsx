import React from 'react';
import { Container } from 'react-bootstrap';
import bannerImg from "../assets/images/photographer-banner.jpg";
import UspCard from '../components/UspCard';
import InfoCard from '../components/InfoCard';
import albumImg from "../assets/images/album.jpg";
import photosImg from "../assets/images/photos.jpg";
import reviewImg from "../assets/images/review.jpg";

const HomePage = () => {
    return (
        <div className="home-page">

            <div className="banner">
                <img src={bannerImg} alt="Person holding a camera" className="img-fluid w-100 h-100" />
            </div>

            <Container className="pb-3">

                <h1 className="display-1 text-center mt-3 mb-4">Welcome to PhotoReview</h1>

                <div className="usp-wrapper d-flex flex-wrap justify-content-center py-4 px-5">
                    <UspCard icon="fas fa-bolt" label="Fast" />
                    <UspCard icon="fas fa-check" label="Easy" />
                    <UspCard icon="fas fa-shield-alt" label="Secure" />
                </div>
                
                <div className="info-wrapper d-flex flex-wrap justify-content-center mb-5">
                    <InfoCard img={albumImg} description="Create albums" />
                    <InfoCard img={photosImg} description="Upload photos" />
                    <InfoCard img={reviewImg} description="Let your clients review" />
                </div>

            </Container>

        </div>
    );
}
 
export default HomePage;