import React, { useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Input } from "@nextui-org/input";
import './dialogForm.css';

const DialogForm = ({ isOpen, handleClose, bpm }) => {
    const [exerciseName, setExerciseName] = useState('');
    const [description, setDescription] = useState('');

    const onSave = () => {
        const exerciseLog = {
            "bpm": bpm,
            "exerciseName": exerciseName,
            "description": description,
            "dateTime": new Date()
        }
        localStorage.setItem(exerciseLog.dateTime, JSON.stringify(exerciseLog));
        handleClose();
    }
    return (
        <Modal
            className="main-modal-container"
            keepMounted={false}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isOpen}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                    sx: {
                        backdropFilter: 'blur(3px)',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',

                    },
                },
            }}
        >

            <div className="modal-container">
                <div className="transition-modal-title">
                    
                    
                    {bpm} BPM
                </div>

                <div className="input">
                    <Input
                        color="white"
                        type="text"
                        variant='underlined'
                        label="Exercise Name"
                        onChange={(e) => { setExerciseName(e.target.value) }}
                        value={exerciseName}
                    />
                </div>

                <div className="input">
                    <Input
                        color="white"
                        type="text"
                        variant='underlined'
                        label="Description"
                        onChange={(e) => { setDescription(e.target.value) }}
                        value={description}
                    />
                </div>

                <Button
                    className="save-button"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={onSave}
                >
                    Save
                </Button>
            </div>
        </Modal>
    );
}

export default DialogForm;
