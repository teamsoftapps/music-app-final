import React, { useEffect, useState } from "react";
import classes from "./AlbumPage.module.css";
import Card from "../../components/card/Card";
import MusicTracker from "../../components/musicTrack/MusicTrack";
import MusicPlayer from "../../components/musicPlayer/MusicPlayer";
import { useRouter } from "next/router";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { setSong, setSongs, setAlbum } from "../../store/musicReducer";
import Head from "next/head";
import { isMobile } from "react-device-detect";

const postSelector = (state) => state.music;

function AlbumPage({ songs, album }) {
    const { song, language, user } = useSelector(postSelector, shallowEqual);
    const route = useRouter();
    const dispatch = useDispatch();

    const [currentTime, setCurrentTime] = useState(0);
    const [trial, setTrial] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("music-app-credentials"));

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
    }, []);

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
                    url={`${process.env.media_url}/${
                        language.title === "eng" ? song?.Album_Image : song?.Album_Image && song?.Album_Image.replace("eng", "nl")
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
                                trial={user?.hasOwnProperty("expiresIn")}
                            />
                        ) : null,
                    )}
                </div>
            </div>
            <MusicPlayer currentTime={currentTime} setCurrentTime={setCurrentTime} songs={songs} />
        </div>
    );
}
// Nothing

export default React.memo(AlbumPage);
