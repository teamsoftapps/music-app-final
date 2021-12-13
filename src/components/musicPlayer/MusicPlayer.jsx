import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IconButton, Slider } from "@material-ui/core";
import { PauseCircleFilled, PlayCircleFilled, SkipNextSharp, SkipPreviousSharp, VolumeDown, VolumeUp, VolumeOff } from "@material-ui/icons";
import classes from "./MusicPlayer.module.css";
import axios from "axios";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setNextSong, setPreviousSong, setIsPlaying } from "../../store/musicReducer";
import InfoIcon from "@mui/icons-material/Info";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { isMobile } from "react-device-detect";

const postSelector = (state) => state.music;

// let initialRef = 0;

function MusicPlayer({ currentTime, setCurrentTime, songs }) {
    const { song, isPlaying, album, language, user } = useSelector(postSelector, shallowEqual);

    const dispatch = useDispatch();

    // const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [showDetails, setshowDetails] = useState(false);
    const [isLyrics, setIsLyrics] = useState(0);

    const handleIsLyrics = (event, newValue) => {
        setIsLyrics(newValue);
    };

    const audioPlayer = useRef();
    const animationRef = useRef();
    const volumePreState = useRef();
    const initialRef = useRef(0);

    useEffect(() => {
        if (initialRef.current > 1) {
            try {
                let url = process.env.base_url + "/history/add";
                let data = { songName: song.Song_Name, albumName: song.Album_Name, userEmail: user.email, createdAt: new Date().getTime() };
                axios.post(url, data);
            } catch (e) {
                // Nothing
            }
            defaultHandler(true);
        }

        return () => {
            defaultHandler(false);
            initialRef.current++;
        };
    }, [song]);

    // set Default once song is done playing.
    useEffect(async () => {
        if (Math.floor(audioPlayer.current?.duration) === Math.floor(currentTime)) {
            dispatch(setNextSong(song));
            defaultHandler(true);
        }
    }, [audioPlayer.current?.duration, currentTime]);

    function defaultHandler(play) {
        setCurrentTime(0);
        dispatch(setIsPlaying(play));
        if (play) {
            setTimeout(() => {
                audioPlayer.current.play();
                animationRef.current = requestAnimationFrame(whilePlaying);
            }, 100);
        } else {
            cancelAnimationFrame(animationRef.current);
        }
    }

    // Calculate the Streaming Time
    function calculateTime(secs) {
        if (secs) {
            const minutes = Math.floor(secs / 60);
            const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
            const seconds = Math.floor(secs % 60);
            const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
            return `${returnedMinutes}:${returnedSeconds}`;
        }
    }

    function togglePlayPause() {
        const prevValue = isPlaying;
        dispatch(setIsPlaying(!prevValue));
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
        setCurrentTime(audioPlayer.current?.currentTime);
        animationRef.current = requestAnimationFrame(whilePlaying);
    }

    function changeMusicTime(e, value) {
        if (value) {
            audioPlayer.current.currentTime = value;
            setCurrentTime(value);
        }
    }

    function changeVolume(e, value) {
        audioPlayer.current.volume = value;
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
    }

    function songDuration(duration) {
        return duration && typeof duration === "number" && duration;
    }

    // function calculateSeconds(hms) {
    //     var a = hms.split(":");
    //     let seconds = a[0] * 60 + +a[1];
    //     if (a.length > 2) {
    //         seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
    //     }
    //     return seconds;
    // }

    // function jumpNext() {
    //     let count = 0;
    //     let found = false;
    //     let foundId = null;
    //     songs.map((songLocal, i) => {
    //         if (song._id === songLocal._id) {
    //             found = true;
    //             foundId = i;
    //             count += calculateSeconds(songLocal.Song_Length);
    //             alert(count);
    //         }
    //         if (!found) {
    //             count += calculateSeconds(songLocal.Song_Length);
    //         }
    //         if (foundId && foundId + 1 === songs.length) {
    //             count = 0;
    //         }
    //     });
    //     alert(count);
    //     document.getElementById("audioPlayer").currentTime = count;
    //     setCurrentTime(count);
    // }

    // function jumpPrevious() {
    //     let count = 0;
    //     let found = false;
    //     songs.map((songLocal, i) => {
    //         if (song._id === songLocal._id) {
    //             found = true;
    //         }
    //         if (!found) {
    //             count += calculateSeconds(song.Song_Length);
    //         }
    //     });
    //     document.getElementById("audioPlayer").currentTime = count;
    //     setCurrentTime(count);
    // }

    return (
        <div style={showDetails ? { height: "50vh" } : { height: 130 }} className={`${classes.albumsMusicContainer} `}>
            <div className={classes.albumsMusicPlayer}>
                <div className={classes.albumsMusicPlayerProfile}>
                    <div className={classes.musicTrackImage}>
                        <Image src={`${process.env.media_url}/${song?.Album_Image}`} alt="" width="75" height="75" layout="responsive" />
                    </div>
                    <div className={classes.albumsMusicPlayerTitle}>
                        <h4>{song?.Album_Name}</h4>
                        <h3>{song?.Song_Name}</h3>
                    </div>
                </div>
                <div className={classes.albumsMusicPlayerMain}>
                    <div className={classes.musicController}>
                        <IconButton
                            onClick={isMobile ? "" : () => dispatch(setPreviousSong(song))}
                            aria-label="previous song"
                            className={`${classes.musicControllerBtn} ${isMobile ? classes.disableIcon : null}`}
                            disabled={isMobile ? true : false}
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
                            onClick={isMobile ? "" : () => dispatch(setNextSong(song))}
                            aria-label="next song"
                            disabled={isMobile ? true : false}
                            className={`${classes.musicControllerBtn} ${isMobile ? classes.disableIcon : null}`}
                        >
                            <SkipNextSharp fontSize="large" />
                        </IconButton>
                    </div>
                    <audio
                        ref={audioPlayer}
                        id="audioPlayer"
                        preload="auto"
                        src={`${process.env.media_url}/${song?.Song_File}`}
                        type="audio/mp3"
                    >
                        {/* <source  src={`songs/${song}.mp3`} type="audio/mp3" /> */}
                        Your browser does not support the audio element.
                    </audio>
                    <div className={classes.slider}>
                        <p>{!currentTime ? "00:00" : calculateTime(currentTime)}</p>
                        <Slider
                            style={{ flex: 1, width: "100%" }}
                            // value={currentTime}
                            value={typeof currentTime === "number" ? currentTime : 0}
                            onChange={changeMusicTime}
                            aria-labelledby="input-slider"
                            max={songDuration(audioPlayer.current?.duration)}
                        />
                        <p>
                            {song && song?.Song_Length}
                            {/* {!calculateTime(audioPlayer.current?.duration) ? "00:00" : calculateTime(audioPlayer.current?.duration)} */}
                        </p>
                    </div>
                </div>
                <div className={classes.musicOptionWrapper}>
                    {song.Song_Lyrics && (
                        <span className={`${classes.musicLyrics} ${classes.musicLyricsIconW}`}>
                            <span
                                className={`${classes.tab} ${classes.musicLyricsIcon} ${classes.active}`}
                                onClick={() => setshowDetails(!showDetails)}
                            >
                                {language.title === "nl" ? "LIEDTEKSTEN" : "LYRICS"}
                            </span>
                        </span>
                    )}
                    <div className={classes.musicVolume}>
                        <IconButton onClick={handleVolume}>
                            {!volume ? <VolumeOff /> : volume > 0.5 ? <VolumeUp /> : <VolumeDown />}
                        </IconButton>
                        <Slider aria-label="Volume" value={volume} onChange={changeVolume} step={0.01} max={1} />
                    </div>
                </div>
            </div>
            {showDetails && (
                <div className={classes.albumsMusicDetails}>
                    {/* <Box sx={{ width: "100%" }}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs
                                value={isLyrics}
                                onChange={handleIsLyrics}
                                aria-label="basic tabs example"
                                textColor="inherit"
                                indicatorColor="primary"
                                centered
                            >
                                <Tab label="Song Lyrics" style={{ marginRight: "10px", padding: "10px" }} {...a11yProps(1)} />
                                <Tab label="Album Details" style={{ padding: "10px" }} {...a11yProps(0)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={isLyrics} index={0}>
                            <span className={classes.lyricsText}>{song.Song_Lyrics && song.Song_Lyrics}</span>
                        </TabPanel>
                        <TabPanel value={isLyrics} index={1}>
                            <span className={classes.lyricsText}>{album.Song_Desc && album.Song_Desc}</span>
                        </TabPanel>
                    </Box> */}
                    <div className={classes.tabsWrapper}>
                        <div
                            className={`${classes.tab} ${isLyrics === 0 ? classes.active : ""}`}
                            onClick={() => {
                                setIsLyrics(0);
                            }}
                        >
                            {language.title === "nl" ? "LIEDTEKSTEN" : "LYRICS"}
                        </div>
                        <div
                            className={`${classes.tab} ${isLyrics === 1 ? classes.active : ""}`}
                            onClick={() => {
                                setIsLyrics(1);
                            }}
                        >
                            {language.title === "nl" ? "ALBUM DETAILS" : "ALBUM DETAILS"}
                        </div>
                    </div>
                    <div className={classes.tabsContentWrapper}>
                        {isLyrics === 0 ? <span className={classes.lyricsText}>{song.Song_Lyrics && song.Song_Lyrics}</span> : ""}
                        {isLyrics === 1 ? <span className={classes.lyricsText}>{album.Song_Desc && album.Song_Desc}</span> : ""}
                    </div>
                </div>
            )}
        </div>
    );
}

{
    /* <h2 className={classes.lyricsHeading}>Lyrics</h2>
<br />
<p className={classes.lyricsText}>{song.Song_Lyrics && song.Song_Lyrics}</p> */
}

export default React.memo(MusicPlayer);
