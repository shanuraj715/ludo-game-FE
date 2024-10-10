import React from 'react'
import styles from './centerBox.module.scss'
import { COLORS } from '@/constants'

function CenterBox() {
    return (
        <div
            className={styles.centerBox}
            style={{ background: `radial-gradient(#fff, ${COLORS.winBox})` }}
        >

        </div>
    )
}

export default CenterBox
