import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import style from "../../../styles/global.module.scss";
import Card from "../../components/card/Card";
import Card1 from "../../components/card1/Card1";
import LyricsModal from "../../components/lyricsModal/LyricsModal";
import DeletePlaylistModal from "../../components/deletePlaylistModal/DeletePlaylistModal";
import MusicTracker from "../../components/musicTrack/MusicTrack";
import { Typography } from "@mui/material";
import { DeleteOutline } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

import {
    setAlbum,
    setFavouriteId,
    setSong,
    setSongs,
} from "../../store/musicReducer";
// import {
//     setPlaylist,
//     setFavouriteId,
//     setSong,
//     setSongs,
// } from "../../store/playlistReducer";
import classes from "./PlaylistPage.module.css";
import { Height } from "@material-ui/icons";
const postSelector = (state) => state.music;

const PlaylistPage = ({ songs, playlist }) => {
    console.log("PlaylistPage >>>>>>>>");

    console.log("Songs from Playlist Page: ", songs);

    const { song, language, user, favouriteId } = useSelector(
        postSelector,
        shallowEqual
    );

    // songs = [
    //     {
    //         Playlist_Image: "images/LoveDivine-eng.jpg",
    //         Playlist_Name: "Love Divine 1",
    //         Playlist_id: "61710878ef45b9107c721284",
    //         Song_File: "audio/02 As The Deer Pants - 2. Air.mp3",
    //         Song_Length: "1:10",
    //         Song_Lyrics: "As the deer pants for the water,\r\nSo my soul longs after You.\r\nYou alone are my heart's desire\r\nAnd I long to worship You.\r\nYou alone are my strength, my shield,\r\nTo You alone may my spirit yield.\r\nYou alone are my heart's desire\r\nAnd I long to worship You.",
    //         Song_Name: "As The Deer Pants - 2. Air",
    //         __v: 0,
    //         _id: "6173bee440ebae07109d983a"
    //     },
    //     {
    //         Playlist_Image: "images/LoveDivine-eng.jpg",
    //         Playlist_Name: "Love Divine 1",
    //         Playlist_id: "61710878ef45b9107c721284",
    //         Song_File: "audio/01 As The Deer Pants - 1. Prelude.mp3",
    //         Song_Length: "2:30",
    //         Song_Lyrics: "As the deer pants for the water,\r\nSo my soul longs after You.\r\nYou alone are my heart's desire\r\nAnd I long to worship You.\r\nYou alone are my strength, my shield,\r\nTo You alone may my spirit yield.\r\nYou alone are my heart's desire\r\nAnd I long to worship You.",
    //         Song_Name: "As The Deer Pants - 1. Prelude",
    //         __v: 0,
    //         _id: "6173bee440ebae07109d9839",
    //     }
    // ];

    // playlist = [
    //     {
    //         Playlist_Image: "images/LoveDivine-eng.jpg",
    //         Playlist_Image_nl: "images/LoveDivine-nl.jpg",
    //         Playlist_Name: "Love Divine 1",
    //         Singer_Name: "Mulder",
    //         Song_Desc: "Music performed by Ian Mulder & The London Symphony Orchestra.\nLeader and solo violin: Gordan Nikolitch.\n\nOrchestrations by Jorge Calandrelli, Frédéric Dunis, and Ian Mulder.\n\nRecorded at Lyndhurst Hall, Air Studios, London by Geoff Foster.\nAssistant Engineer: John Prestage.\nRecording console: 96 channel Neve 88R.\n\nMixed at Air Studios, London by Geoff Foster.\nAssistant Engineer: John Prestage.\nMixing console Studio 2: 80 channel SSL 8000G.\n\nIan Mulder plays a Steinway & Sons model D, concert grand piano at Lyndhurst Hall, London.\nIan Mulder is dressed by Tip de Bruin, Amsterdam, NL.\nCover Photography Ely Cathedral: Martin Black, Ely, UK. www.MartinBlack.com.\n\nSheet Music available at: www.LoveDivineCD.com.\n",
    //         index: 1,
    //         __v: 0,
    //         _id: "61710878ef45b9107c721284"
    //     }
    // ];

    const route = useRouter();
    const dispatch = useDispatch();
    const [currentTime, setCurrentTime] = useState(0);
    const [songName, setSongName] = useState("");
    const [playlistName, setPlaylistName] = useState("");
    const [pic, setPic] = useState("");
    const [lyrics, setLyrics] = useState("");
    const [file, setFile] = useState("");
    const [singleSong, setSingleSong] = useState("");
    const [songArray, setSongArray] = useState([]);
    const [time, setTime] = useState(1000);
    const [showLyrics, setShowLyrics] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [openDeletePlaylistModal, setOpenDeletePlaylistModal] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
        console.log("Delete playlist clicked");
    };
    const handleOpenDeletePlaylistModal = () => {
        setOpenDeletePlaylistModal(true);
        console.log("Delete playlist clicked");
    };
    const handleClose = () => {
        setOpen(false);
        console.log("Delete playlist clicked");
    };
    const handleCloseDeletePlaylistModal = () => {
        setOpenDeletePlaylistModal(false);
        console.log("Delete playlist clicked");
    };
    const [loadingForPlaylist, setLoadingForPlaylist] = useState(false);
    const [songPlay, setSongPlay] = useState(false);
    const [lockedSongs, setLockedSongs] = useState(false);
    const [isOn, setIsOn] = useState(false);
    const [selected, setSelected] = useState(false);
    const [screenRefresh, setScreenRefresh] = useState(false);
    const [songHr, setSongHr] = useState(0);
    const [songMin, setSongMin] = useState(0);
    const [songHrShow, setSongHrShow] = useState(false);
    const [songPlaying, setSongPlaying] = useState(false);

    const toggleSwitch = () => {
        setIsOn(prevState => !prevState);
    };

    const songFileArray = songs.map((ele, ind) => {
        let fileName = process.env.media_url.concat(ele.Song_File);
        return {
            fileName,
            length: ele.Song_Length,
        };
    });
    const onPauseSong = () => {
        setSongPlaying(false);
    };
    const onPlaySong = () => {
        setSongPlaying(true);
    };

    const onEndSong = () => {
        let currentSongIndex;

        if (typeof window !== "undefined") {
            // Perform localStorage action
            currentSongIndex = localStorage.getItem("currentSongIndex");
        }

        currentSongIndex++;
        if (currentSongIndex < songArray.length) {
            if (typeof window !== "undefined") {
                // Perform localStorage action
                localStorage.setItem("currentSongIndex", currentSongIndex);
            }

            setSingleSong(
                `${process.env.media_url}/${songArray[currentSongIndex].Song_File}`
            );
        } else {
            if (typeof window !== "undefined") {
                // Perform localStorage action
                localStorage.setItem("currentSongIndex", 0);
            }

            setSongName(songArray[0].Song_Name);
            setPlaylistName(songArray[0].Playlist_Name);
            // console.log(
            //   "img",
            //   process.env.media_url.concat(songArray[0].Album_Image)
            // );
            setPic(process.env.media_url.concat(songArray[0].Playlist_Image));
            setSingleSong(`${process.env.media_url}/${songArray[0]?.Song_File}`);
        }
    };

    // Complete playlist time not available

    useEffect(() => {
        // console.log(`${process.env.media_url}/${songArray[0]?.Song_File}`)
        setSingleSong(`${process.env.media_url}/${songArray[0]?.Song_File}`);
    }, [songArray]);

    useEffect(() => {
        let currentSongIndex;

        if (typeof window !== "undefined") {
            // Perform localStorage action
            currentSongIndex = localStorage.getItem("currentSongIndex");
        }

        setPlaylistName(songArray[currentSongIndex]?.Playlist_Name);
        setSongName(songArray[currentSongIndex]?.Song_Name);
        setLyrics(songArray[currentSongIndex]?.Song_Lyrics);

        setPic(
            `${process.env.media_url}/`.concat(
                songArray[currentSongIndex]?.Playlist_Image
            )
        );
    }, [singleSong]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("currentSongIndex", 0);
        }
        let user;
        if (typeof window !== "undefined") {
            user = JSON.parse(localStorage.getItem("music-app-credentials"));
        }
        if (user?.hasOwnProperty("expiresIn")) {
            let tempArr = songs.filter((ele, i) => {
                if (i === 1) return ele;
                if (i !== 1 && i % 5 === 0) {
                    return ele;
                }
            });

            let stringifyArray = JSON.stringify(tempArr);

            if (typeof window !== "undefined") {
                localStorage.setItem("songArray", stringifyArray);
            }

            setSongArray(tempArr);
            setSingleSong(`${process.env.media_url}/${tempArr[0].Song_File}`);
        } else {
            let stringifyArray = JSON.stringify(songs);

            if (typeof window !== "undefined") {
                // Perform localStorage action
                localStorage.setItem("songArray", stringifyArray);
            }
            if (favouriteId) {
                let index = songs.findIndex((o) => o._id === favouriteId);
                let arr1 = songs.slice(index, songs.length);
                let arr2 = songs.slice(0, index);
                const finalArr = [...arr1, ...arr2];
                setSongArray(finalArr);
                setSingleSong(`${process.env.media_url}/${finalArr[0].Song_File}`);
            } else {
                setSongArray(songs);
                setSingleSong(`${process.env.media_url}/${songs[0]?.Song_File}`);
            }
        }

        setSongName(songs[0]?.Song_Name);
        setLyrics(songs[0]?.Song_Lyrics);
        if (!user?.token) return route.replace("/login");
        if (!songs?.length) return route.replace("/");
        dispatch(setSongs(songs));
        // dispatch(setPlaylist(playlist));
        dispatch(setAlbum(playlist));

        if (isMobile) {
            dispatch(setSong(songs[songs.length - 1]));
        } else {
            dispatch(setSong(songs[songs.length - 1]));
        }

        return () => {
            if (typeof window !== "undefined") {
                localStorage.removeItem("counter");
            }

            dispatch(setFavouriteId(""));
        };
    }, [playlist]);

    const [selectedSongIndex, setSelectedSongIndex] = useState(null);
    const handleChangeSong = (index) => {
        setSelectedSongIndex(index);
        setSelected(true);
        console.log(selected);
    };

    if (!songs || !songs.length) return <h1>Loading...</h1>;

    return (
        <div className={classes.albums}>
            <Head>
                <title>
                    {playlistName} | {songName}
                </title>
                <meta name="description" content={song?.Song_Name} />
            </Head>
            <br />

            <div
                style={{
                    position: "fixed",
                    top: "50%",
                    right: "44vw",
                    left: "44vw",
                    // left: 0,
                    // width: "100%",
                    // height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 100,
                }}
            >
                <ClipLoader color="red" loading={loadingForPlaylist} size={"10vw"} />
            </div>
            <h4 style={{ color: "white", textAlign: "center" }}>STREAMING</h4>
            <h1>{playlistName}</h1>

            {/* ----------Lyrics Mode Switch---------- */}

            <div className={classes.lyricsToggleButtonContainer}>
                <div className={classes.lyricsToggleButtonMain} style={{ display: 'flex', alignItems: 'center' }}>
                    <label className={`switch ${isOn ? 'on' : 'off'} ${classes.lyricsToggleButtonLabel}`}>
                        <input className={classes.lyricsToggleButtonInput} type="checkbox" checked={isOn} onChange={toggleSwitch} />
                        <span className={`${classes.lyricsToggleButtonBackground} ${isOn ? classes.isOn : ''}`}>
                            <span className={`${classes.lyricsToggleButtonText} ${isOn ? classes.isOn : ''}`}>
                                {isOn ? 'ON' : 'OFF'}
                            </span>
                            <span className={`${classes.lyricsToggleButtonPointer} ${isOn ? classes.isOn : ''}`}></span>
                        </span>
                    </label>
                    <p className={classes.lyricsModeParagraph}>
                        <b>
                            Lyrics Mode <span className={classes.redTextColor}>(new feature!)</span>
                        </b>
                    </p>
                </div>
                <div style={{ width: "5rem" }}></div>
                <div className={classes.deleteButtonContainer} onClick={() => setOpenDeletePlaylistModal(true)}>
                    <div className={classes.deleteButtonText}>Delete playlist</div>
                    <IconButton disableRipple="true" className={classes.deleteButton}>

                        <DeleteOutline />
                    </IconButton>
                </div>
            </div>

            {/* ----------Lyrics Modal---------- */}
            <LyricsModal
                open={open}
                setOpen={setOpen}
                handleOpen={handleOpen}
                handleClose={handleClose}
                lyrics={lyrics}
            />

            <DeletePlaylistModal
                openDeletePlaylistModal={openDeletePlaylistModal}
                setOpenDeletePlaylistModal={setOpenDeletePlaylistModal}
                handleOpenDeletePlaylistModal={handleOpenDeletePlaylistModal}
                handleCloseDeletePlaylistModal={handleCloseDeletePlaylistModal}
                lyrics={lyrics}
            />

            {/* ----------Music list and Lyrics View---------- */}

            {/* <div className={classes.albumsMain}> */}
            <div className={`${classes.albumsMain} ${isOn ? classes.isOn : ''}`}>
                <Card1
                    title={playlistName}
                    // title="Your Favourites"
                    // url={`${process.env.media_url}/${language.title === "eng"
                    //     ? song?.Playlist_Image
                    //     : song?.Playlist_Image && song?.Playlist_Image.replace("eng", "nl")
                    //     }`}
                    url={'/images/Icons-01.png'}
                    disableFetch
                />
                <div style={{
                    flex: '1'
                }}>
                    {!isOn ? <div>
                        <div className={classes.albumsMainPlaylist}>
                            {/* {songs?.map((albumSong, i) =>
                songs.length - 1 !== i ? ( */}
                            {/* <div key={albumSong._id} onClick={() => handleChangeSong(i)} > */}
                            {/* <Fragment key={i}> */}
                            <Fragment >
                                <MusicTracker
                                    singleSong={singleSong}
                                    currentTime={currentTime}
                                    setCurrentTime={setCurrentTime}
                                    // albumSong={albumSong}
                                    // order={i}
                                    songs={songs}
                                    songName={songName}//
                                    setSongName={setSongName}
                                    trial={user?.hasOwnProperty("expiresIn")}
                                    setSongArray={setSongArray}
                                    setSingleSong={setSingleSong}
                                    selected={selected}//
                                    screenRefresh={screenRefresh}//
                                    setScreenRefresh={setScreenRefresh}//
                                    songPlaying={songPlaying}//
                                    caller="playlist"//
                                />
                                {/* <div className={classes.lyricsStyle}>Lyrics</div> */}
                            </Fragment>
                            {/* </div> */}
                            {/* ) : null
              )} */}
                        </div>
                    </div> :
                        <div className={classes.lyricsViewMain}>
                            <div className={classes.lyricsViewTextContainer} >
                                <div style={{ position: 'relative', width: "100%", flex: "none", height: '40px' }}>
                                    <button className={classes.lyricsViewCloseButton} checked={isOn} onClick={toggleSwitch}>
                                        <span style={{ margin: '5px' }}>&#9660;</span>
                                        Close
                                    </button>
                                </div>
                                <div style={{ position: 'relative', width: "100%", flex: 1 }}>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        sx={{
                                            color: 'white',
                                            textAlign: 'center',
                                            fontSize: '1rem',
                                        }}
                                    >
                                        {(() => {
                                            const lyricsInString = JSON.stringify(lyrics);
                                            const lyricsArray = lyricsInString.replace(/"/g, '').split('\\r\\n');

                                            if (lyricsArray.length === 1 && lyricsArray[0] === '') {
                                                return (
                                                    <p>No lyrics to display</p>
                                                );
                                            } else {
                                                return (
                                                    lyricsArray.map((text, index) => (
                                                        <p key={index} className={classes.lyricsText}>
                                                            {text}
                                                        </p>
                                                    ))
                                                );
                                            }
                                        })()}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className={style.music}>
                <div className={classes.hoverStyling}>
                    <img src={pic}></img>
                </div>
                <div className={style.infoDiv}>
                    <p className={style.Album_Name}>{playlistName}</p>

                    <p>{songName}</p>

                </div>
                <div className={style.trash}></div>
                <div className={style.trash}></div>
                <div className={style.trash}></div>
                <div className={style.trash}></div>
                <div className={style.trash}></div>
                <AudioPlayer
                    className={style.player}
                    progressJumpStep={3000}
                    src={singleSong}
                    onEnded={(e) => onEndSong()}
                    autoPlay={true}
                    onPause={(e) => onPauseSong()}
                    onPlay={(e) => onPlaySong()}
                />
            </div>

            {/* <MusicPlayer currentTime={currentTime} setCurrentTime={setCurrentTime} songs={songs} trial={user?.hasOwnProperty("expiresIn")} songName={songName} setSongName={setSongName} setLyrics={setLyrics} lyrics={lyrics} /> */}
        </div >
    );
};
// Nothing

export default React.memo(PlaylistPage);
