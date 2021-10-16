import React, { useEffect } from "react";
import classes from "./AlbumPage.module.css";
import Card from "../../components/card/Card";
import MusicTracker from "../../components/musicTrack/MusicTrack";
import MusicPlayer from "../../components/musicPlayer/MusicPlayer";
import { useRouter } from "next/router";
import { useSelector, shallowEqual } from "react-redux";

const postSelector = (state) => state.music;

function AlbumPage() {
    const { songs, song, isDutch } = useSelector(postSelector, shallowEqual);
    const route = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("music-app-credentials"));
        if (!user?.token.length) {
            route.replace("/auth");
        }
    }, []);

    return (
        <div className={classes.albums}>
            <h1>{song?.Album_Name}</h1>
            <div className={classes.albumsMain}>
                <Card
                    title={song?.Album_Name}
                    url={`${process.env.media_url}/${!isDutch ? song?.Album_Image : song?.Album_Image.replace("eng", "nl")}`}
                />
                <div className={classes.albumsMainPlaylist}>
                    {songs?.map((albumSong, i) => (
                        <MusicTracker key={i} albumSong={albumSong} />
                    ))}
                </div>
            </div>
            <MusicPlayer />
        </div>
    );
}

export default React.memo(AlbumPage);
