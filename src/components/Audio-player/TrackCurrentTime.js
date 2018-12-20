import React from 'react';

import styles from '../../styles/Track.scss';

const TrackCurrentTime = ({ currentTime }) => {

    const calculateTrackCurrentTime = (currentTime) => {
        const currentMinute = parseInt(currentTime / 60) % 60;
        const currentSecondsLong = currentTime % 60;
        const currentSeconds = currentSecondsLong.toFixed();
        const currentTrackTime = (currentMinute < 10 
          ? `0${currentMinute}` 
          : currentMinute) + `:` 
          + (currentSeconds < 10 
          ? `0${currentSeconds}`
          : currentSeconds);
        return currentTrackTime;
      }

    return (
        <div className={styles['track__current-time']}><span>{calculateTrackCurrentTime(currentTime) || currentTime}</span></div>
    )
} 

export default TrackCurrentTime;