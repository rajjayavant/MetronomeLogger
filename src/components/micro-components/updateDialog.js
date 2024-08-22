import React, { useState, useEffect } from "react";
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Input } from "@nextui-org/input";
import './updateDialog.css';

const UpdateDialog = ({ isOpen, handleClose, exerciseLog }) => {
    const [exerciseName, setExerciseName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (exerciseLog) {
            setExerciseName(exerciseLog.exerciseName || '');
            setDescription(exerciseLog.description || '');
        }
    }, [exerciseLog]);

    const onUpdate = () => {
        const newExerciseLog = {
            bpm: exerciseLog.bpm,
            exerciseName: exerciseName,
            description: description,
            dateTime: new Date(exerciseLog.dateTime),
        };
        localStorage.setItem(new Date(newExerciseLog.dateTime), JSON.stringify(newExerciseLog));
        handleClose();
    };

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
                    {exerciseLog.bpm} BPM
                </div>

                <div className="input">
                    <Input
                        color="white"
                        type="text"
                        variant="underlined"
                        label="Exercise Name"
                        onChange={(e) => setExerciseName(e.target.value)}
                        value={exerciseName}
                    />
                </div>

                <div className="input">
                    <Input
                        color="white"
                        type="text"
                        variant="underlined"
                        label="Description"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                </div>

                <Button
                    className="save-button"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={onUpdate}
                >
                    Update
                </Button>
            </div>
        </Modal>
    );
};

export default UpdateDialog;
