"use client"
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import styles from './page.module.css';

interface Div {
    position: {
        x: number;
        y: number;
    };
    mainText: string;
    description: string;
}

export default function Home() {
    const [divs, setDivs] = useState<Div[]>([]);
    const [mainText, setMainText] = useState('');
    const [description, setDescription] = useState('');

    const handleDrag = (e: any, ui: any, index: number) => {
        const { x, y } = divs[index].position;
        const newDivs = [...divs];
        newDivs[index] = {
            ...newDivs[index],
            position: { x: x + ui.deltaX, y: y + ui.deltaY },
        };
        setDivs(newDivs);
    };

    const handleMainTextChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newDivs = [...divs];
        newDivs[index] = {
            ...newDivs[index],
            mainText: e.target.value,
        };
        setDivs(newDivs);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
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
                        <div className={styles.circleTop} />
                        <div className={styles.circleBottom} />
                        <div className={styles.circleLeft} />
                        <div className={styles.circleRight} />
                    </div>
                </Draggable>
            ))}
        </main>
    );
}
