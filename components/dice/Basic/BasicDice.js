'use client'
import React, { useEffect, useState, useRef } from 'react';
import './basicDice.scss';
import { getRandomNumberInRange } from '@/utils/utils';

const classes = [
    'show-front',
    'show-back',
    'show-right',
    'show-left',
    'show-top',
    'show-bottom'
]

const ThreeDDice = ({
    number,
    update,
    updateDiceRollingState,
    onClick,
    isDiceRolling
}) => {
    const [rotationClass, setRotationClass] = useState('');

    const intervalRef = useRef(null);
    const countRef = useRef(0);
    const isFirstRenderRef = useRef(true)

    const rollDice = React.useCallback(() => {
        if (isDiceRolling) return;
        onClick();
    }, [isDiceRolling])

    useEffect(() => {
        if (isFirstRenderRef.current) {
            isFirstRenderRef.current = false;
            return;
        }
        updateDiceRollingState(true);
        intervalRef.current = setInterval(() => {
            countRef.current = countRef.current + 1;
            setRotationClass(classes[getRandomNumberInRange(1, 6)]);
            if (countRef.current >= 8) {
                countRef.current = 0
                clearInterval(intervalRef.current);
                setRotationClass(classes[number - 1]);
                updateDiceRollingState(false);
            }
        }, 140)
    }, [update]);

    return (
        <div className="dice-container">
            <div onClick={rollDice} className={`dice ${rotationClass}`}>
                <div className="face front">
                    <span className="dice-dot-1-1 dice-dot"></span>
                </div>
                <div className="face back">
                    <span className="dice-dot-2-1 dice-dot"></span>
                    <span className="dice-dot-2-2 dice-dot"></span>
                </div>
                <div className="face right">
                    <span className="dice-dot-3-1 dice-dot"></span>
                    <span className="dice-dot-3-2 dice-dot"></span>
                    <span className="dice-dot-3-3 dice-dot"></span>
                </div>
                <div className="face left">
                    <span className="dice-dot-4-1 dice-dot"></span>
                    <span className="dice-dot-4-2 dice-dot"></span>
                    <span className="dice-dot-4-3 dice-dot"></span>
                    <span className="dice-dot-4-4 dice-dot"></span>
                </div>
                <div className="face top">
                    <span className="dice-dot-5-1 dice-dot"></span>
                    <span className="dice-dot-5-2 dice-dot"></span>
                    <span className="dice-dot-5-3 dice-dot"></span>
                    <span className="dice-dot-5-4 dice-dot"></span>
                    <span className="dice-dot-5-5 dice-dot"></span>
                </div>
                <div className="face bottom">
                    <span className="dice-dot-6-1 dice-dot"></span>
                    <span className="dice-dot-6-2 dice-dot"></span>
                    <span className="dice-dot-6-3 dice-dot"></span>
                    <span className="dice-dot-6-4 dice-dot"></span>
                    <span className="dice-dot-6-5 dice-dot"></span>
                    <span className="dice-dot-6-6 dice-dot"></span>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ThreeDDice);
