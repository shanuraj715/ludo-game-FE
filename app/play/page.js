import React from 'react'
import LudoBox from '@/components/ludoBox/ludoBox'
import StepBox from '@/components/stepBox/StepBox'
import styles from './play.module.scss'
import CenterBox from '@/components/centerBox/CenterBox'
import dice1 from '../../assets/images/dice1.webp'
import dice2 from '../../assets/images/dice2.webp'
import dice3 from '../../assets/images/dice3.webp'
import dice4 from '../../assets/images/dice4.png'

function page() {
    return (
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
    )
}

export default page
