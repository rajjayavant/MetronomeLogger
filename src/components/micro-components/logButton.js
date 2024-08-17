import { React } from 'react';

const LogButton = ({ onClick }) => {
    return (
    <div className='start-button' onClick ={onClick}>
        <div> Log </div>
    </div>
    );
};

export default LogButton;
