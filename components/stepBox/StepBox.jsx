import React from 'react'
import styles from './stepBox.module.scss'
import { BOX_COLORS, COLORS } from '@/constants'
import { StarFill, Arrow90degRight, ArrowUpRight } from 'react-bootstrap-icons'

function StepBox(props) {

    const { rotation, rotationDegree, box } = props

    return (
        <div
            data-rotation={`${rotationDegree}deg`}
            className={rotation ? styles.rotation : ''}
            style={{ transform: `rotate(${rotationDegree}deg)` }}
        >
            <div className={`${styles.stepBoxContainer}`}>
                <div className={styles.stepCellRow}>
                    <div
                        className={styles.stepCell}
                    >
                    </div>
                    <div
                        className={styles.stepCell}
                    >
                        <Arrow90degRight className="breath-animation" style={{ color: BOX_COLORS[box].alpha, transform: 'rotate(90deg)' }} size={20} />
                    </div>
                    <div
                        className={styles.stepCell}
                    >
                    </div>
                </div>
                <div className={styles.stepCellRow}>
                    <div
                        className={styles.stepCell}
                    >
                    </div>
                    <div
                        className={styles.stepCell}

                        style={{ background: `radial-gradient(#fff, ${BOX_COLORS[box].alpha})` }}
                    >
                    </div>
                    <div
                        className={styles.stepCell}
                        style={{ background: `radial-gradient(#fff, ${BOX_COLORS[box].alpha})` }}
                    >
                        <StarFill style={{ color: BOX_COLORS[box].default }} size={20} />
                    </div>
                </div>
                <div className={styles.stepCellRow}>
                    <div
                        className={styles.stepCell}
                    >
                        <StarFill className={styles.stopCell} style={{ color: COLORS.stop }} size={20} />
                    </div>
                    <div
                        className={styles.stepCell}

                        style={{ background: `radial-gradient(#fff, ${BOX_COLORS[box].alpha})` }}
                    >
                    </div>
                    <div
                        className={styles.stepCell}
                    >
                    </div>
                </div>
                <div className={styles.stepCellRow}>
                    <div
                        className={styles.stepCell}
                    >
                    </div>
                    <div
                        className={styles.stepCell}

                        style={{ background: `radial-gradient(#fff, ${BOX_COLORS[box].alpha})` }}
                    >
                    </div>
                    <div
                        className={styles.stepCell}
                    >
                    </div>
                </div>
                <div className={styles.stepCellRow}>
                    <div
                        className={styles.stepCell}
                    >
                    </div>
                    <div
                        className={styles.stepCell}

                        style={{ background: `radial-gradient(#fff, ${BOX_COLORS[box].alpha})` }}
                    >
                    </div>
                    <div
                        className={styles.stepCell}
                    >
                    </div>
                </div>
                <div className={styles.stepCellRow}>
                    <div
                        className={styles.stepCell}
                    >
                    </div>
                    <div
                        className={styles.stepCell}

                        style={{ background: `radial-gradient(#fff, ${BOX_COLORS[box].alpha})` }}
                    >
                    </div>
                    <div
                        className={styles.stepCell}
                    >
                        <ArrowUpRight className="breath-animation" style={{ color: BOX_COLORS[box].alpha, transform: 'rotate(90deg)' }} size={20} />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default StepBox
