import React from 'react'
import styles from './ludoBox.module.scss'
import { BOX_COLORS } from '@/constants'
import { Star } from 'react-bootstrap-icons'
import Image from 'next/image'

function LudoBox(props) {

    const { box, image } = props

    return (
        <div className={styles.mainBox} style={{ background: `radial-gradient(#fff, ${BOX_COLORS[box].alpha})` }}>
            <div className={styles.image}>
                <Image src={image} alt="Ludo Box" width={200} height={200} />
            </div>
            <div className={styles.mainBoxChild}>
                <div
                    className={styles.mainBoxCell}
                    style={{ backgroundColor: BOX_COLORS[box].default }}
                >
                    {/* <Star size={40} style={{ color: BOX_COLORS[box].default }} /> */}
                </div>
                <div
                    className={styles.mainBoxCell}
                    style={{ backgroundColor: BOX_COLORS[box].default }}
                >
                </div>
                <div
                    className={styles.mainBoxCell}
                    style={{ backgroundColor: BOX_COLORS[box].default }}
                >
                </div>
                <div
                    className={styles.mainBoxCell}
                    style={{ backgroundColor: BOX_COLORS[box].default }}
                >
                </div>
            </div>
        </div>
    )
}

export default LudoBox
