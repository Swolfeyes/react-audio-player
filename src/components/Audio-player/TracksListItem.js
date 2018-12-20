import React from 'react';

import classnames from 'classnames/bind';

import styles from '../../styles/TracksListItem.scss';

const cx = classnames.bind(styles);

const TracksListItem = ({ title, artist, onTracksListItemClick, active }) => {

    const classes = cx({
        'tracks-list-item': true,
        'tracks-list-item--active': !!active,
    });

    return (
        <div onClick={onTracksListItemClick} className={classes}>
            <div className={styles['tracks-list-item__title']}>{title}</div>
            <div className={styles['tracks-list-item__artist']}>{artist}</div>
        </div>
    )    
}
export default TracksListItem;