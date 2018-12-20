import React from 'react';

import SVGInline from "react-svg-inline";

import Pause from './SVG/pause.svg';
import Stop from './SVG/stop.svg';
import Next from './SVG/forward.svg';
import Previous from './SVG/backward.svg';
import Play from './SVG/play.svg';

import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

import styles from '../../styles/Icon.scss';


const Icon = ({ iconName }) => {

    const icon = { Stop, Next, Play, Previous, Pause };

    const classes = cx({
        'icon': true,
        [`icon--${iconName}`]: iconName,
    });

    return (
        <div className={classes}>
            <SVGInline svg={icon[iconName]} />
        </div>
    );
}

export default Icon;