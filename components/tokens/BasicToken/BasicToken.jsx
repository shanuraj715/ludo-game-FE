import React from 'react'
import styles from './basicToken.module.scss'
import { BOX_COLORS } from '@/constants'

function BasicToken({ box }) {
    return (
        <div style={{ backgroundColor: BOX_COLORS[box].default }} className={`${styles.token} ${styles.token}${box}`}>
        </div>
    )
}

export default BasicToken
