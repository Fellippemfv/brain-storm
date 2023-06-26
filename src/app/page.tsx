"use client"
import { useState } from 'react';
import Draggable from 'react-draggable';
import styles from './page.module.css';

export default function Home() {
    const [divs, setDivs] = useState([]);
    const [mainText, setMainText] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCircle, setSelectedCircle] = useState(null);
    const [lines, setLines] = useState([]);

    const handleDrag = (e, ui, index) => {
        const { x, y } = divs[index].position;
        const newDivs = [...divs];
        newDivs[index] = {
            ...newDivs[index],
            position: { x: x + ui.deltaX, y: y + ui.deltaY },
        };
        setDivs(newDivs);
    };

    const handleMainTextChange = (e, index) => {
        const newDivs = [...divs];
        newDivs[index] = {
            ...newDivs[index],
            mainText: e.target.value,
        };
        setDivs(newDivs);
    };

    const handleDescriptionChange = (e, index) => {
        const newDivs = [...divs];
        newDivs[index] = {
            ...newDivs[index],
            description: e.target.value,
        };
        setDivs(newDivs);
    };

    const createThought = () => {
        const newDivs = [...divs];
        const position = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        newDivs.push({
            position,
            mainText: '',
            description: '',
        });
        setDivs(newDivs);
    };

    const handleCircleClick = (e, divIndex, circleIndex) => {
        if (selectedCircle === null) {
            setSelectedCircle({ divIndex, circleIndex });
        } else {
            const { divIndex: selectedDivIndex, circleIndex: selectedCircleIndex } = selectedCircle;
            if (divIndex !== selectedDivIndex) {
                const newLines = [...lines];
                newLines.push({ start: selectedCircle, end: { divIndex, circleIndex } });
                setLines(newLines);
            }
            setSelectedCircle(null);
        }
    };

    return (
        <main className={styles.mainContainer}>
            <div className={styles.createButtonContainer}>
                <button className={styles.createButton} onClick={createThought}>
                    Criar pensamento
                </button>
            </div>
            {divs.map((div, divIndex) => (
                <Draggable
                    key={divIndex}
                    handle=".drag-handle"
                    onDrag={(e, ui) => handleDrag(e, ui, divIndex)}
                >
                    <div
                        className={styles.draggableDiv}
                        style={{ left: div.position.x, top: div.position.y }}
                    >
                        <div className={`${styles.textareaContainer} drag-handle`}>
                            <input
                                type="text"
                                value={div.mainText}
                                onChange={(e) => handleMainTextChange(e, divIndex)}
                                placeholder="Texto principal"
                            />
                            <input
                                type="text"
                                value={div.description}
                                onChange={(e) => handleDescriptionChange(e, divIndex)}
                                placeholder="Descrição"
                            />
                        </div>
                        <div className={styles.circleTop} onClick={(e) => handleCircleClick(e, divIndex, 0)} />
                        <div className={styles.circleBottom} onClick={(e) => handleCircleClick(e, divIndex, 1)} />
                        <div className={styles.circleLeft} onClick={(e) => handleCircleClick(e, divIndex, 2)} />
                        <div className={styles.circleRight} onClick={(e) => handleCircleClick(e, divIndex, 3)} />
                    </div>
                </Draggable>
            ))}
            {lines.map((line, index) => (
                <svg key={index} className={styles.line}>
                    <line
                        x1={divs[line.start.divIndex].position.x}
                        y1={divs[line.start.divIndex].position.y}
                        x2={divs[line.end.divIndex].position.x}
                        y2={divs[line.end.divIndex].position.y}
                    />
                </svg>
            ))}
        </main>
    );
}
