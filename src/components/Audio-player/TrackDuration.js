import React from 'react';

import styles from '../../styles/Track.scss';

const TrackDuration = ({ duration }) => {

    const calculateTotalTrackLength = (duration) => {
        let seconds = Math.floor(duration);    
        let minutes = Math.floor( seconds / 60 );
        minutes = minutes >= 10 ? minutes : `0${minutes}`;    
        seconds = Math.floor( seconds % 60 );
        seconds = seconds >= 10 ? seconds : `0${seconds}`;  
        const time = `${minutes}:${seconds}`;
        return time;
    }

    return (
        <div className={styles['track__duration']}><span>{calculateTotalTrackLength(duration)}</span></div>
    )
}

export default TrackDuration;