import React, { useEffect, useState } from "react";
import classes from "./AlbumPage.module.css";
import Card from "../../components/card/Card";
import MusicTracker from "../../components/musicTrack/MusicTrack";
import MusicPlayer from "../../components/musicPlayer/MusicPlayer";
import { useRouter } from "next/router";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { setSong, setSongs, setAlbum, setFavourites } from "../../store/musicReducer";
import Head from "next/head";
import { isMobile } from "react-device-detect";
import axios from "axios";

const postSelector = (state) => state.music;

function AlbumPage({ songs, album }) {
    const { song, language, user, favouriteId } = useSelector(postSelector, shallowEqual);
    const route = useRouter();
    const dispatch = useDispatch();
    const [currentTime, setCurrentTime] = useState(0);
    const [songName, setSongName] = useState('')
    const [lyrics, setLyrics] = useState('')

    // console.log(album, songs)
    const [trial, setTrial] = useState(false);


    useEffect(() => {
        // songs?.some((s) => {
        //     if (s?._id === favouriteId) {
        //         let calcSecs = calculateSeconds(s?.Song_Length)
        //         console.log(calcSecs)
        //         setCurrentTime(calcSecs)
        //     }
        // })
        // console.log(songs)
        const user = JSON.parse(localStorage.getItem("music-app-credentials"));
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

                            />
                        ) : null,
                    )}
                </div>
            </div>
            <MusicPlayer currentTime={currentTime} setCurrentTime={setCurrentTime} songs={songs} trial={user?.hasOwnProperty("expiresIn")} songName={songName} setSongName={setSongName} lyrics={lyrics} />
        </div>
    );
}
// Nothing

export default React.memo(AlbumPage);
