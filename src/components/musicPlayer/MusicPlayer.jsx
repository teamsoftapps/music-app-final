import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IconButton, Slider } from "@material-ui/core";
import {
    FastForwardRounded,
    FastRewindRounded,
    FavoriteOutlined,
    Info,
    PauseCircleFilled,
    PlayCircleFilled,
    QueueMusic,
    Repeat,
    SkipNextSharp,
    SkipPreviousSharp,
    VolumeDown,
    VolumeUp,
    VolumeOff,
} from "@material-ui/icons";
import classes from "./MusicPlayer.module.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setNextSong, setPreviousSong } from "../../store/musicReducer";

function MusicPlayer() {
    const { song } = useSelector((state) => state?.music, shallowEqual);

    const dispatch = useDispatch();

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [showDetails, setshowDetails] = useState(false);

    const audioPlayer = useRef();
    const animationRef = useRef();
    const volumePreState = useRef();

    useEffect(() => {
        defaultHandler();
        return defaultHandler();
    }, [song]);

    // set Default once song is done playing.
    useEffect(() => {
        if (Math.floor(audioPlayer.current?.duration) === Math.floor(currentTime)) {
            defaultHandler();
        }
    }, [audioPlayer.current?.duration, currentTime]);

    function defaultHandler() {
        setIsPlaying(false);
        setCurrentTime(0);
        cancelAnimationFrame(animationRef.current);
    }

    // Calculate the Streaming Time
    const calculateTime = (secs) => {
        if (secs) {
            const minutes = Math.floor(secs / 60);
            const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
            const seconds = Math.floor(secs % 60);
            const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
            return `${returnedMinutes}:${returnedSeconds}`;
        }
    };

    function togglePlayPause() {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
        } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current);
        }
    }

    // Connect progress bar(Slider) with the currrent time.
    function whilePlaying() {
        changePlayerCurrentTime(audioPlayer.current?.currentTime);
        animationRef.current = requestAnimationFrame(whilePlaying);
    }

    function changePlayerCurrentTime(value) {
        setCurrentTime(value);
    }

    function changeMusicTime(e, value) {
        audioPlayer.current.currentTime = value;
        changePlayerCurrentTime(value);
    }

    function changeVolume(e, value) {
        audioPlayer.current.volume = value;
        console.log(audioPlayer.current.volume, value);
        setVolume(value);
    }

    function handleVolume() {
        if (volume) {
            setVolume(0);
            audioPlayer.current.volume = 0;
            volumePreState.current = volume;
        } else {
            setVolume(volumePreState.current);
            audioPlayer.current.volume = volumePreState.current;
        }

        console.log("object", volumePreState.current);
    }

    return (
        <div style={showDetails ? { height: 300 } : { height: 125 }} className={`${classes.albumsMusicContainer} `}>
            {showDetails && (
                <div className={classes.albumsMusicDetails}>
                    <h3>Producer: Joe Smith</h3>
                    <h3>Recorded at XYZ studio in Berlin</h3>
                    <h3>etc.</h3>
                </div>
            )}
            <div className={classes.albumsMusicPlayer}>
                <div className={classes.albumsMusicPlayerProfile}>
                    <div className={classes.musicTrackImage}>
                        <Image src={"/images/singer.jfif"} alt="" width="75" height="75" layout="responsive" />
                    </div>
                    <div className={classes.albumsMusicPlayerTitle}>
                        <h3>Ian Mulder</h3>
                        <h4>{song?.Song_Name}</h4>
                    </div>
                </div>
                <div className={classes.albumsMusicPlayerMain}>
                    <div className={classes.musicController}>
                        <IconButton
                            onClick={() => dispatch(setPreviousSong(song))}
                            aria-label="previous song"
                            className={classes.musicControllerBtn}
                        >
                            <SkipPreviousSharp fontSize="large" />
                        </IconButton>
                        <IconButton
                            aria-label={!isPlaying ? "play" : "pause"}
                            onClick={togglePlayPause}
                            className={classes.musicControllerBtn}
                        >
                            {!isPlaying ? (
                                <PlayCircleFilled style={{ fontSize: "3.5rem" }} />
                            ) : (
                                <PauseCircleFilled style={{ fontSize: "3.5rem" }} />
                            )}
                        </IconButton>
                        <IconButton
                            onClick={() => dispatch(setNextSong(song))}
                            aria-label="next song"
                            className={classes.musicControllerBtn}
                        >
                            <SkipNextSharp fontSize="large" />
                        </IconButton>
                    </div>
                    <audio ref={audioPlayer} preload="auto" src={`http://localhost:5000/songs/${song?.Song_File}`} type="audio/mp3">
                        {/* <source  src={`songs/${song}.mp3`} type="audio/mp3" /> */}
                        Your browser does not support the audio element.
                    </audio>
                    <div className={classes.slider}>
                        <p>{!currentTime ? "00:00" : calculateTime(currentTime)}</p>
                        <Slider
                            style={{ flex: 1, width: "100%" }}
                            value={typeof currentTime === "number" ? currentTime : 0}
                            onChange={changeMusicTime}
                            aria-labelledby="input-slider"
                            max={audioPlayer.current?.duraiton}
                        />
                        <p>{!calculateTime(audioPlayer.current?.duration) ? "00:00" : calculateTime(audioPlayer.current?.duration)}</p>
                    </div>
                </div>
                <div className={classes.musicVolume}>
                    <IconButton onClick={handleVolume}>{!volume ? <VolumeOff /> : volume > 0.5 ? <VolumeUp /> : <VolumeDown />}</IconButton>
                    <Slider aria-label="Volume" value={volume} onChange={changeVolume} step={0.01} max={1} />

                    {/* <VolumeUp /> */}
                    <IconButton onClick={() => setshowDetails(!showDetails)}>
                        <Info />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

export default React.memo(MusicPlayer);
