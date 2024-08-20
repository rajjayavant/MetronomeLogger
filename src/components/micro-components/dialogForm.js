import React, { useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'gray',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
};


const DialogForm = ({ isOpen, handleClose, bpm }) => {
    const [exerciseName, setExerciseName] = useState('');
    const [description, setDescription] = useState('');

    const onSave = () =>{
        const exerciseLog = {
            "bpm": bpm,
            "exerciseName": exerciseName,
            "description": description,
            "dateTime" : new Date()
        }
        localStorage.setItem(exerciseLog.dateTime, JSON.stringify(exerciseLog));
        handleClose();
    }
    return (
        <Modal
            keepMounted = {false}
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
            <Box sx={style}>
                <Typography
                    id="transition-modal-title"
                    variant="h4"
                    component="h2"
                    sx={{ textAlign: 'center', marginBottom: 2 }}
                >
                    {bpm} BPM
                </Typography>


                <TextField sx={{ marginBottom: 1 }}
                    value={exerciseName}
                    id="standard-password-input"
                    label="Exercise Name"
                    type="text"
                    autoComplete="current-password"
                    variant="standard"
                    onChange={(e)=>{setExerciseName(e.target.value)}}
                />

                <TextField sx={{ marginBottom: 1 }}
                    value ={description}
                    id="standard-password-input"
                    label="Description"
                    type="text"
                    autoComplete="current-password"
                    variant="standard"
                    multiline= {true}
                    onChange={(e)=>{setDescription(e.target.value)}}
                />

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={onSave}
                >
                    Save
                </Button>
            </Box>
        </Modal>
    );
}

export default DialogForm;
