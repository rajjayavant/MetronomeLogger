import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionItem } from "@nextui-org/react";
import ModeEditOutlineSharpIcon from '@mui/icons-material/ModeEditOutlineSharp';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import './historyPage.css';

const transitionProps = {
    variants: {
        enter: {
            y: 0,
            opacity: 1,
            height: "auto",
            transition: {
                height: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    duration: 1,
                },
                opacity: {
                    easings: "ease",
                    duration: 1,
                },
            },
        },
        exit: {
            y: -10,
            opacity: 0,
            height: 0,
            transition: {
                height: {
                    easings: "ease",
                    duration: 0.25,
                },
                opacity: {
                    easings: "ease",
                    duration: 0.3,
                },
            },
        },
    },
};

export default function App() {
    const [exerciseLogs, setExerciseLogs] = useState([]);
    const navigate = useNavigate();

    const updateExerciseLogs = () => {
        let logs = [];
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const exerciseLog = localStorage.getItem(key);
                if (exerciseLog) logs.push(JSON.parse(exerciseLog));
            }
            const sortedData = [...logs].sort((a, b) => {
                const dateA = new Date(a.dateTime);
                const dateB = new Date(b.dateTime);
                return dateB - dateA;
            });

            let structuredData = [];
            let currentDateData = [];
            let currentDate = null;
            if (sortedData.length > 0) currentDate = sortedData[0].dateTime.split('T')[0];
            for (let i = 0; i < sortedData.length; i++) {
                if (currentDate !== sortedData[i].dateTime.split('T')[0]) {
                    structuredData.push(currentDateData);
                    currentDateData = [sortedData[i]];
                    currentDate = sortedData[i].dateTime.split('T')[0];
                } else {
                    currentDateData.push(sortedData[i]);
                }
            }
            structuredData.push(currentDateData);
            setExerciseLogs(structuredData);
        }
        else setExerciseLogs([]);
    };

    useEffect(() => {
        updateExerciseLogs();
    }, []);

    const onDelete = (dateTime) => {
        localStorage.removeItem(new Date(dateTime));
        updateExerciseLogs();
    };

    return (
        <div className="history-container">
            <div className="top-bar">
            <ArrowBackIosNewSharpIcon className="back-arrow" onClick={() => { navigate('/') }} />
            <div className="heading">
                <h1 >History</h1>
            </div>
            </div>
            {(localStorage.length === 0) ? <div className="no-log-message">Go and Create a Log First. Practice!</div> :
                <div>
                    {exerciseLogs.map((currentDateLogs, dateIndex) => (
                        <div key={dateIndex}>
                            <div className="date"> {(currentDateLogs[0].dateTime.split('T')[0]).split("-").reverse().join("-")} </div>
                            <Accordion
                                variant="shadow"
                                selectionMode="multiple"
                                showDivider={true}
                                fullWidth={false}
                                motionProps={transitionProps}
                            >
                                {currentDateLogs.map((exerciseLog, index) => (
                                    <AccordionItem
                                        key={index}
                                        aria-label={exerciseLog.dateTime}
                                        subtitle={
                                            <span>
                                                {exerciseLog.bpm} BPM <strong>{exerciseLog.dateTime.slice(11, 16)}</strong>
                                            </span>
                                        }
                                        title={exerciseLog.exerciseName}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div className="accordian-item">{exerciseLog.description}</div>
                                            <div>
                                                <button><ModeEditOutlineSharpIcon /></button>
                                                <button onClick={() => onDelete(exerciseLog.dateTime)} ><DeleteSharpIcon /></button>
                                            </div>
                                        </div>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}
