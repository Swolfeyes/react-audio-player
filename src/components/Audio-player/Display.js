import React from 'react';

import styles from '../../styles/Display.scss';

import classnames from 'classnames/bind';

const cx = classnames.bind(styles);


const Display = ({ title, artist, active, image, isPlaying }) => {

    const classes = cx({
        'display': true,
        'display--active': !!active,
        'display--active--isPlaying': !!isPlaying,
    });

    const discClasses = cx({
        'display__disc': true,
        [`display__disc--${image}`]: image,
    });

    console.log(image)

    return (
        <div className={classes}>
            <div className={discClasses}></div>
            <div className={styles['display__track-info']}>
                <div className={styles['display__track-info__title']}><span>{title}</span></div>
                <div className={styles['display__track-info__artist']}><span>{artist}</span></div>
            </div>
        </div>
    )
}
    



export default Display;