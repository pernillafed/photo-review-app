import React from 'react';
import { Container } from 'react-bootstrap';

const ThankYouPage = () => {
    return (
        <Container className="thank-you-page mt-4 pb-5">

            <h1 className="display-3 text-center">Thank you for reviewing this album!</h1>
            <p className="fs-4 text-center mt-3">Your review has been sent to the photographer.</p>
            
        </Container>
    );
}
 
export default ThankYouPage;