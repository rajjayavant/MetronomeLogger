import { React } from "react";
import './adjustmentButton.css'

const AdjustmentButton = ({ value, onClick }) => {
    const handleClick = (event)=>{
        onClick(event, value);
    }

    return (
        <div className="adjustment-button" onClick={handleClick}>
            {(value < 0) ? ('-' + Math.abs(value)) : ('+' + value)}
        </div>
    );
};
export default AdjustmentButton;