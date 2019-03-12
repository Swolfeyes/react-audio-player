import React from 'react';

import Controls from './Controls.js';
import Display from './Display.js';
import TrackCurrentTime from './TrackCurrentTime.js';
import TrackDuration from './TrackDuration.js';
import TracksListItem from './TracksListItem.js';


import { tracks } from '../../data/tracks.js';
import styles from '../../styles/AudioPlayer.scss';

import classnames from 'classnames/bind';

const cx = classnames.bind(styles);


class AudioPlayer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTrackIndex: 0,
            trackCurrentTime: 0,
            trackDuration: 0,
            isPlaying: false,
        }
    }

    componentDidMount() {
        
        this.audio.addEventListener('timeupdate', () => {    
            this.trackProgressUpdate();
            
            this.setState({
                trackCurrentTime: this.audio.currentTime,
            });
        });

        this.audio.addEventListener('canplaythrough', () => {
            this.handleLoadedData();
        });
    }

    //========================================
    // Handlers
    //========================================

    handleLoadedData() { 
        if (this.state.isPlaying)  {
            this.audio.play();

            this.setState({
                isPlaying: true,
                trackDuration: this.audio.duration,
            });
        } else {
            this.setState({
                isPlaying: false,
                trackDuration: this.audio.duration,
            });
        }
    }

    handleNextTrackClick() {
        const { currentTrackIndex } = this.state;

        this.setState({   
            currentTrackIndex: (currentTrackIndex + 1) % tracks.length,
        });

    }

    handlePreviousTrackClick() {      
        const { currentTrackIndex } = this.state;

        this.setState({
            currentTrackIndex: currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1,
        });
    }

    handlePlayTrackClick() {
        this.playTrack();
    }

    handleProgressBarClick(event) {
        this.movePinToPosition(event.pageX);
    }

    //========================================
    // Others
    //========================================

    getClickPercent(event, element) {
        return (event.clientX - element.getBoundingClientRect().left) / element.offsetWidth;
    }

    
    playTrack() {
        if (this.audio.paused) {
            this.setState({
                isPlaying: true,
            });

            this.audio.play();

        } else {

            this.setState({
                isPlaying: false,
            });

            this.audio.pause();
        }
    }

    setActiveTrack(index) {
        this.setState({
            currentTrackIndex: index,
        });
    }

    trackProgressUpdate() {
        const playPercent = this.progressBar.offsetWidth * (this.audio.currentTime / this.audio.duration);

        this.progressBarPin.style.width = `${playPercent}px`;

        if(this.audio.currentTime >= this.audio.duration) {
          this.handleNextTrackClick();
        }        
    }

    movePinToPosition(position) {

        const pinLeft = position - this.progressBar.offsetLeft;

        if (pinLeft >= 0 && pinLeft <= this.progressBar.offsetWidth) {
            this.progressBarPin.style.width = `${pinLeft}px`;
        }
        if (pinLeft < 0) {
            this.progressBarPin.style.width = `0px`;
        }
        if (pinLeft >= this.progressBar.offsetWidth) {
            this.progressBarPin.style.width = `${this.progressBar.offsetWidth}px`;
        }

        this.audio.currentTime = this.audio.duration * this.getClickPercent(event, this.progressBar);
    }

    buildTracksList() {

        const { currentTrackIndex } = this.state;

        return tracks.map((item, index) => {
            return (
                <TracksListItem 
                    key={index}
                    title={item.title}
                    artist={item.artist}
                    active={index === currentTrackIndex}
                    onTracksListItemClick={() => this.setActiveTrack(index)}
                />
            )
        });
    }


    render() {
        const { currentTrackIndex, trackDuration, trackCurrentTime, isPlaying } = this.state;


        return (
            <div className={styles['audio-player']}>
                <audio 
                    ref={(audio) => { this.audio = audio }}
                    src={tracks[currentTrackIndex].track}
                />
                <div className={styles['audio-player__display']}>
                {
                    tracks.map((item, index) => {
                            return (
                                <Display 
                                    key={item.id} 
                                    title={item.title} 
                                    artist={item.artist} 
                                    active={index === currentTrackIndex} 
                                    image={item.image}
                                    isPlaying={!!isPlaying}
                                 />
                            )
                        })
                }
                </div>
                <div className={styles['audio-player__track-time']}>
                    <div className={styles['audio-player__track-time__current-time']}>
                        <TrackCurrentTime currentTime={trackCurrentTime} />
                    </div>
                    <div 
                    ref={(progressBar) => { this.progressBar = progressBar }}
                    className={styles['audio-player__track-time__progress-bar']}
                    onClick={(e) => this.handleProgressBarClick(e)}
                    >
                    <div 
                        ref={(progressBarPin) => {this.progressBarPin = progressBarPin}}
                        className={styles['audio-player__track-time__progress-bar__pin']}
                    />
                </div>
                    <div className={styles['audio-player__track-time__duration']}>
                        <TrackDuration duration={trackDuration} />
                    </div>
                </div>
                <div className={styles['audio-player__controls']}>
                    <Controls 
                        onNextTrackClick={() => this.handleNextTrackClick()}
                        onPreviousTrackClick={() => this.handlePreviousTrackClick()}
                        onPlayTrackClick={() => this.handlePlayTrackClick()}
                        isPlaying={!!isPlaying}
                    />
                </div>
                <div className={styles['audio-player__tracks-list']}>
                    {this.buildTracksList()}
                </div>
            </div>
        )
    }
}

export default AudioPlayer;