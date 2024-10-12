'use client'

import React, { useState } from 'react'
import LudoBox from '@/components/ludoBox/ludoBox'
import StepBox from '@/components/stepBox/StepBox'
import styles from './play.module.scss'
import CenterBox from '@/components/centerBox/CenterBox'
import dice1 from '../../assets/images/dice1.webp'
import dice2 from '../../assets/images/dice2.webp'
import dice3 from '../../assets/images/dice3.webp'
import dice4 from '../../assets/images/dice4.png'
import BasicDice from '../../components/dice/Basic/BasicDice'
import { getRandomNumberInRange, play } from '@/utils/utils'

function page() {

    const [number, setNumber] = useState(getRandomNumberInRange(1, 6))
    const [forceUpdate, setForceUpdate] = useState(Math.random())
    const [isDiceRolling, setDiceRolling] = useState(false)
    const [currentTurn, setCurrentTurn] = useState(1)

    const updateNumber = () => {
        const num = getRandomNumberInRange(1, 6)
        setForceUpdate(Math.random())
        setNumber(num)
    }

    const updateDiceRollingState = React.useCallback((state) => {
        setDiceRolling(state)
    }, [])

    return (
        <div className={styles.pageContainer}>
            <div className={styles.gameContainer}>
                <div className={styles.ludoRow}>
                    <LudoBox box={0} image={dice1.src} />
                    <StepBox rotationDegree={0} box={1} />
                    <LudoBox box={1} image={dice2.src} />
                </div>
                <div className={styles.ludoRow}>
                    <StepBox rotation={true} rotationDegree={270} box={0} />
                    <CenterBox />
                    <StepBox rotation={true} rotationDegree={90} box={2} />
                </div>
                <div className={styles.ludoRow}>
                    <LudoBox box={3} image={dice3.src} />
                    <StepBox rotationDegree={180} box={3} />
                    <LudoBox box={2} image={dice4.src} />
                </div>
            </div>
            <div className={styles.diceContainer}>
                {/* <button onClick={updateNumber}>Roll Dice</button> */}
                <BasicDice
                    onClick={updateNumber}
                    updateDiceRollingState={updateDiceRollingState}
                    update={forceUpdate}
                    number={number}
                    isDiceRolling={isDiceRolling}
                />
            </div>
        </div>
    )
}

export default page
