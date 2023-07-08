"use client"
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import styles from './page.module.css';
import SteppedLineTo from 'react-lineto';

interface Div {
    id: string;
    position: {
        x: number;
        y: number;
    };
    mainText: string;
    description: string;
}

export default function Home() {
    const [divs, setDivs] = useState<Div[]>([]);
    const [connections, setConnections] = useState<string[]>([]);
    const [selectedDivIds, setSelectedDivIds] = useState<string[]>([]);

    const handleDrag = (e: any, ui: any, id: string) => {
        const index = divs.findIndex((div) => div.id === id);
        if (index !== -1) {
            const { x, y } = divs[index].position;
            const newDivs = [...divs];
            newDivs[index] = {
                ...newDivs[index],
                position: { x: x + ui.deltaX, y: y + ui.deltaY },
            };
            setDivs(newDivs);
        }
    };

    const handleMainTextChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const index = divs.findIndex((div) => div.id === id);
        if (index !== -1) {
            const newDivs = [...divs];
            newDivs[index] = {
                ...newDivs[index],
                mainText: e.target.value,
            };
            setDivs(newDivs);
        }
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const index = divs.findIndex((div) => div.id === id);
        if (index !== -1) {
            const newDivs = [...divs];
            newDivs[index] = {
                ...newDivs[index],
                description: e.target.value,
            };
            setDivs(newDivs);
        }
    };

    const handleCircleClick = (id: string) => {
        if (selectedDivIds.includes(id)) {
            const newSelectedDivIds = selectedDivIds.filter((divId) => divId !== id);
            setSelectedDivIds(newSelectedDivIds);
        } else {
            if (selectedDivIds.length === 1) {
                const [sourceId] = selectedDivIds;
                const targetId = id;
                const connection = `${sourceId}-${targetId}`;
                setConnections([...connections, connection]);
                setSelectedDivIds([]);
            } else {
                setSelectedDivIds([id]);
            }
        }
    };


    const createThought = () => {
        const newDivs = [...divs];
        const id = `div${newDivs.length}`;
        const position = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        newDivs.push({
            id,
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
            {divs.map((div) => (
                <Draggable
                    key={div.id}
                    handle=".drag-handle"
                    onDrag={(e, ui) => handleDrag(e, ui, div.id)}
                >
                    <div
                        className={`${styles.draggableDiv} ${div.id}`}
                        style={{ left: div.position.x, top: div.position.y }}
                        id={div.id}
                    >
                        <div className={`${styles.textareaContainer} drag-handle`}>
                            <input
                                type="text"
                                value={div.mainText}
                                onChange={(e) => handleMainTextChange(e, div.id)}
                                placeholder="Texto principal"
                            />
                            <input
                                type="text"
                                value={div.description}
                                onChange={(e) => handleDescriptionChange(e, div.id)}
                                placeholder="Descrição"
                            />
                        </div>
                        <div
                            className={styles.circleTop}
                            onClick={() => handleCircleClick(div.id)}
                            style={{
                                backgroundColor: selectedDivIds.includes(div.id) ? 'darkblue' : 'lightblue',
                            }}
                        />
                        <div
                            className={styles.circleBottom}
                            onClick={() => handleCircleClick(div.id)}
                            style={{
                                backgroundColor: selectedDivIds.includes(div.id) ? 'darkblue' : 'lightblue',
                            }}
                        />
                        <div
                            className={styles.circleLeft}
                            onClick={() => handleCircleClick(div.id)}
                            style={{
                                backgroundColor: selectedDivIds.includes(div.id) ? 'darkblue' : 'lightblue',
                            }}
                        />
                        <div
                            className={styles.circleRight}
                            onClick={() => handleCircleClick(div.id)}
                            style={{
                                backgroundColor: selectedDivIds.includes(div.id) ? 'darkblue' : 'lightblue',
                            }}
                        />
                    </div>
                </Draggable>
            ))}
            <div className={styles.connectionContainer}>
                {connections.map((connection) => {
                    const [sourceId, targetId] = connection.split('-');
                    const sourceDiv = divs.find((div) => div.id === sourceId);
                    const targetDiv = divs.find((div) => div.id === targetId);
                    if (sourceDiv && targetDiv) {
                        return (
                            <SteppedLineTo
                                key={connection}
                                from={sourceDiv.id}
                                to={targetDiv.id}
                                borderColor="skyblue"
                                borderWidth={4}
                                zIndex={-1}

                            />
                        );
                    }
                    return null;
                })}
            </div>
        </main>
    );
}
