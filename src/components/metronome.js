import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import './metronome.css';
import DialogForm from './micro-components/dialogForm.js';


var webWorker = null;
const lookahead = 25.0;
var audioContext = null;
var unlocked = false;
var currentNote;
var scheduleAheadTime = 0.1;
var nextNoteTime = 0.0;
var noteLength = 0.05;
var isMetronomePlaying = false;
var tempo = 120;
var lastTap = null;


const scheduleNote = (beatNumber, time) => {
    var osc = audioContext.createOscillator();
    osc.connect(audioContext.destination);
    if (beatNumber === 1)
        osc.frequency.value = 880.0;
    else
        osc.frequency.value = 440.0;

    osc.start(time);
    osc.stop(time + noteLength);
}

const nextNote = (bpm) => {
    var secondsPerBeat = 60.0 / bpm;
    nextNoteTime += secondsPerBeat;
    currentNote++;
    if (currentNote === 5) {
        currentNote = 1;
    }
}

const scheduler = (bpm) => {
    while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
        scheduleNote(currentNote, nextNoteTime);
        nextNote(bpm);
    }
}


const Metronome = () => {
    const [isPlaying, flipPlayStop] = useState(false);
    const [bpm, updateBpm] = useState(120);
    const [isModalOpen, toggleModalOpen] = useState(false);
    const key = useRef(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isModalOpen) key.current = key.current + 1;
    }, [isModalOpen]);

    useEffect(() => {
        webWorker = new Worker(new URL('./metronomeWorker.js', import.meta.url));
        webWorker.onmessage = function (e) {
            if (e.data === "tick") {
                scheduler(tempo);
            }
        };
        webWorker.postMessage({ "interval": lookahead });
    }, [])

    const togglePlayStop = () => {
        if (!audioContext)
            audioContext = new AudioContext();
        if (!unlocked) {
            var buffer = audioContext.createBuffer(1, 1, 22050);
            var node = audioContext.createBufferSource();
            node.buffer = buffer;
            node.start(0);
            unlocked = true;
        }
        isMetronomePlaying = !isMetronomePlaying;
        if (isMetronomePlaying) {
            currentNote = 1;
            nextNoteTime = audioContext.currentTime + 0.05;
            webWorker.postMessage("start");
        } else {
            webWorker.postMessage("stop");
        }
        flipPlayStop(!isPlaying);
    }

    const handleSliderChange = (event, newValue) => {
        tempo = newValue;
        updateBpm(newValue);
    }

    const handleAdjustment = (event, adjustmentValue) => {
        if (tempo + adjustmentValue <= 240 && tempo + adjustmentValue >= 30) {
            tempo = tempo + adjustmentValue;
            updateBpm(tempo);
        }
    }

    const handleLog = () => {
        toggleModalOpen(!isModalOpen);
    }

    const navigateToHistory = () => {
        if (isPlaying) {
            webWorker.postMessage("stop");
            isMetronomePlaying = false;
        }
        navigate('history');
    }

    const handleTap = () => {
        const currentTime = (new Date()).getTime();
        if (lastTap === null) {
            lastTap = currentTime;
        }
        else if ((currentTime - lastTap) <= 2000) {
            tempo = Math.ceil((60 * 1000) / (currentTime - lastTap));
            lastTap = currentTime;
            if (tempo > 240) tempo = 240;
            updateBpm(tempo);
            if (!isPlaying) {
                togglePlayStop();
            }
        }
        else {
            lastTap = currentTime;
        }
    }
    return (
        <div className='container'>
            <DialogForm key={key.current} isOpen={isModalOpen} handleClose={handleLog} bpm={bpm} />
            <div className="metronome-container">
                <div className="bpm-display">{bpm} BPM</div>
                <div className="controls-container">
                    <button className="adjustment-button" onClick={(e) => handleAdjustment(e, -5)}> -5</button>
                    <button className="adjustment-button" onClick={(e) => handleAdjustment(e, -1)}> -1</button>
                    <Slider
                        className='slider'
                        value={bpm}
                        valueLabelDisplay='auto'
                        min={30}
                        max={240}
                        defaultValue={bpm}
                        onChange={handleSliderChange}
                        size='medium'
                        sx={{
                            '& .MuiSlider-thumb': {
                                color: "darkcyan"
                            },
                            '& .MuiSlider-track': {
                                color: "darkcyan"
                            },
                            '& .MuiSlider-rail': {
                                color: "#acc4e4"
                            },
                            '& .MuiSlider-active': {
                                color: "green"
                            }
                        }}
                    />
                    <button className="adjustment-button" onClick={(e) => handleAdjustment(e, 1)}> +1</button>
                    <button className="adjustment-button" onClick={(e) => handleAdjustment(e, 5)}> +5</button>
                </div>
                <div className="start-buttons-container">
                    <button className="tap-button start-button" onClick={handleTap}> Tap</button>
                    <button className="play-button start-button" onClick={togglePlayStop}> {isPlaying ? 'Stop' : 'Play'}</button>
                    <button className="log-button start-button" onClick={handleLog}> Log</button>
                </div>


            </div>
            <Button className="history-button" variant="contained" onClick={navigateToHistory}>History</Button>
            <footer className="footer">
                Made with <span style={{ color: 'red' }}>♥</span> by{" "}
                <a href="https://github.com/rajjayavant/MetronomeLogger" target="_blank" rel="noopener noreferrer">
                    Raj Jayavant
                </a>
            </footer>
        </div>


    )
};

export default Metronome;