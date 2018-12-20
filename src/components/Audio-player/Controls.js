import React from 'react';

import Icon from '../Icon/main.js';

import styles from '../../styles/Controls.scss';

const Controls = ({ onPreviousTrackClick, onNextTrackClick, onPlayTrackClick, onStopTrackClick, isPlaying }) =>  (
        <div className={styles['controls']}>
            <div onClick={onPreviousTrackClick} className={styles['controls__item']}>
                <Icon iconName='Previous' />
            </div>
            <div onClick={onPlayTrackClick} className={styles['controls__item']}>
                { !isPlaying ? <Icon iconName='Play' className={styles['play']} /> : <Icon iconName='Pause' className={styles['pause']} /> }
            </div>
            <div onClick={onNextTrackClick} className={styles['controls__item']}>
                <Icon iconName='Next' />
            </div>
        </div>
    )


export default Controls;