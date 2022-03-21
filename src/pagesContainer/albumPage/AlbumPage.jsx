import React, { useEffect, useMemo, useState } from "react";
import classes from "./AlbumPage.module.css";
import style from '../../../styles/global.module.scss'
import Card from "../../components/card/Card";
import MusicTracker from "../../components/musicTrack/MusicTrack";
import MusicPlayer from "../../components/musicPlayer/MusicPlayer";
import { useRouter } from "next/router";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { setSong, setSongs, setAlbum, setFavourites } from "../../store/musicReducer";
import Head from "next/head";
import { isMobile } from "react-device-detect";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import axios from "axios";
import { useTimer } from 'react-timer-hook';
import moment from 'moment';
const postSelector = (state) => state.music;



function AlbumPage({ songs, album }) {
    const { song, language, user, favouriteId } = useSelector(postSelector, shallowEqual);


    // console.log(ind);
    const route = useRouter();
    const dispatch = useDispatch();
    const [currentTime, setCurrentTime] = useState(0);
    const [songName, setSongName] = useState('');
    const [albumName, setAlbumName] = useState('');
    const [pic, setPic] = useState('');
    const [lyrics, setLyrics] = useState('')
    const [file, setFile] = useState('');
    const [singleSong, setSingleSong] = useState('');
    const [songArray, setSongArray] = useState([]);
    const [time, setTime] = useState(1000);
    // seperate each song file
    // console.log(pic)
    const songFileArray = songs.map((ele, ind) => {
        let fileName = process.env.media_url.concat(ele.Song_File)
        return {
            fileName,
            length: ele.Song_Length
        }
    });

    const onEndSong = () => {

        let currentSongIndex = localStorage.getItem('currentSongIndex');
        currentSongIndex++;
        if (currentSongIndex < songArray.length) {
            localStorage.setItem('currentSongIndex', currentSongIndex);

            setSingleSong(`${process.env.media_url}/${songArray[currentSongIndex].Song_File}`);

        } else {
            localStorage.setItem('currentSongIndex', 0);
            setSongName(songArray[0].Song_Name);
            setAlbumName(songArray[0].Album_Name);
            console.log("img", process.env.media_url.concat(songArray[0].Album_Image));
            setPic(process.env.media_url.concat(songArray[0].Album_Image))
            setSingleSong(`${process.env.media_url}/${songArray[0]?.Song_File}`);
        }
    }

    // useEffect(() => {
    //     if (songArray[0]?._id !== favouriteId) {
    //         let songArra = songArray;
    //         const index = songArra.findIndex((o) => {
    //             return o._id === favouriteId
    //         });
    //         const arr1 = songArra.slice(index, songArra.length);
    //         const arr2 = songArra.slice(0, index);
    //         songArra = [...arr1, ...arr2];
    //         localStorage.setItem('currentSongIndex', 0)
    //         localStorage.setItem('songArray', JSON.stringify(songArra));
    //         setSingleSong(songArra[0]);
    //         setSongArray(songArra);
    //     }
    // }, [favouriteId])

    useEffect(() => {
        // console.log(`${process.env.media_url}/${songArray[0]?.Song_File}`)
        setSingleSong(`${process.env.media_url}/${songArray[0]?.Song_File}`)
    }, [songArray])



    useEffect(() => {
        let currentSongIndex = localStorage.getItem('currentSongIndex');
        setAlbumName(songArray[currentSongIndex]?.Album_Name);
        setSongName(songArray[currentSongIndex]?.Song_Name);
        setPic(`${process.env.media_url}/`.concat(songArray[currentSongIndex]?.Album_Image))
    }, [singleSong])

    useEffect(() => {

        localStorage.setItem('currentSongIndex', 0);

        // console.log(`${process.env.media_url}/${songs[0].Song_File}`);
        // songs?.some((s) => {
        //     if (s?._id === favouriteId) {
        //         let calcSecs = calculateSeconds(s?.Song_Length)
        //         console.log(calcSecs)
        //         setCurrentTime(calcSecs)
        //     }
        // })
        // console.log(songs)
        const user = JSON.parse(localStorage.getItem("music-app-credentials"));



        if (user?.hasOwnProperty('expiresIn')) {
            let tempArr = songs.filter((ele, i) => {
                if (i === 1) return ele;
                if ((i !== 1) && i % 5 === 0) {
                    return ele;
                }
            })
            let stringifyArray = JSON.stringify(tempArr);
            localStorage.setItem('songArray', stringifyArray);
            setSongArray(tempArr);
            setSingleSong(`${process.env.media_url}/${tempArr[0].Song_File}`)
        } else {
            let stringifyArray = JSON.stringify(songs);
            localStorage.setItem('songArray', stringifyArray);
            const ind = songs.findIndex((o) => {
                return o._id === favouriteId;
            })
            // const arr1 = songs.splice(ind);
            console.log(ind);
            setSongArray(songs);
            setSingleSong(`${process.env.media_url}/${songs[0].Song_File}`)
        }


        setSongName(songs[0]?.Song_Name)
        setLyrics(songs[0]?.Song_Lyrics)
        if (!user?.token.length) return route.replace("/login");
        if (!songs?.length) return route.replace("/");
        dispatch(setSongs(songs));
        dispatch(setAlbum(album));
        if (isMobile) {
            dispatch(setSong(songs[songs.length - 1]));
        } else {
            // dispatch(setSong(songs[0]));
            dispatch(setSong(songs[songs.length - 1]));
        }
        return () => localStorage.removeItem('counter');
    }, [album]);
    // useEffect(() => {
    //     songs?.filter((s) => {
    //         if (s?._id === favouriteId) {
    //             let calcSecs = calculateSeconds(s?.Song_Length)
    //             console.log(calcSecs)
    //             setCurrentTime(calcSecs)
    //         }
    //     })
    // }, [])
    // // set song from playlist
    // useEffect(() => {

    // }, [])
    // console.log(currentTime)

    // function calculateSeconds(hms) {
    //     var a = hms.split(":");
    //     let seconds = a[0] * 60 + +a[1];
    //     if (a.length > 2) {
    //         seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
    //     }
    //     return seconds;
    // }
    if (!songs || !songs.length) return <h1>Loading...</h1>;

    return (
        <div className={classes.albums}>
            <Head>
                <title>
                    {song?.Album_Name} | {song?.Song_Name}
                </title>
                <meta name="description" content={song?.Song_Name} />
            </Head>
            <br />
            <h4 style={{ color: "white", textAlign: "center" }}>STREAMING</h4>
            <h1>{song?.Album_Name}</h1>
            <div className={classes.albumsMain}>
                <Card
                    title={song?.Album_Name}
                    url={`${process.env.media_url}/${language.title === "eng" ? song?.Album_Image : song?.Album_Image && song?.Album_Image.replace("eng", "nl")
                        }`}
                    disableFetch
                />
                <div className={classes.albumsMainPlaylist}>
                    {songs?.map((albumSong, i) =>
                        songs.length - 1 !== i ? (
                            <MusicTracker
                                key={i}
                                currentTime={currentTime}
                                setCurrentTime={setCurrentTime}
                                albumSong={albumSong}
                                order={i}
                                songs={songs}
                                setSongName={setSongName}
                                setLyrics={setLyrics}
                                trial={user?.hasOwnProperty("expiresIn")}
                                setSongArray={setSongArray}
                                setSingleSong={setSingleSong}
                            />
                        ) : null,
                    )}
                </div>
            </div>
            <div className={style.music}>
                <img src={pic} ></img>
                <div className={style.infoDiv}>
                    <p className={style.Album_Name}>{albumName}</p>
                    {/* <br></br> */}
                    <p>{songName}</p>
                </div>
                <div className={style.trash}></div>
                <div className={style.trash}></div>
                <div className={style.trash}></div>
                <div className={style.trash}></div>
                <div className={style.trash}></div>
                <AudioPlayer className={style.player}
                    autoPlay
                    progressJumpStep={3000}
                    src={singleSong}
                    onEnded={(e) => onEndSong()}
                />
            </div>

            {/* <MusicPlayer currentTime={currentTime} setCurrentTime={setCurrentTime} songs={songs} trial={user?.hasOwnProperty("expiresIn")} songName={songName} setSongName={setSongName} setLyrics={setLyrics} lyrics={lyrics} /> */}
        </div>
    );
}
// Nothing

export default React.memo(AlbumPage);
