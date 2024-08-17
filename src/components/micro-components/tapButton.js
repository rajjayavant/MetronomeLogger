import { React } from 'react';

const TapButton = ({ onClick }) => {
    return (
    <div className='start-button' onClick ={onClick}>
        <div> Tap </div>
    </div>
    );
};

export default TapButton;
