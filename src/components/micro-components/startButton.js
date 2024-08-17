import { React } from 'react';

const StartButton = ({ isPlaying, onClick }) => {
    return (
    <div className='start-button' onClick ={onClick}>
        <div> {isPlaying? 'Stop' : 'Play'}</div>
    </div>
    );
};

export default StartButton;