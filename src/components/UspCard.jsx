import React from 'react';

const UspCard = ({ icon, label }) => {
    return (
        <div className="usp d-flex flex-column align-items-center mb-3 mx-5">

            <i className={icon}></i>
            <p className="mt-1 fs-4">{label}</p>
            
        </div>
    );
}
 
export default UspCard;