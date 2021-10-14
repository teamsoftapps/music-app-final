import React from "react";
import Image from "next/image";
import { Favorite } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import classes from "./MusicTrack.module.css";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setSong } from "../../store/musicReducer";

const postSelector = (state) => state.music;

function MusicTracker({ albumSong }) {
    const { song } = useSelector(postSelector, shallowEqual);

    const dispatch = useDispatch();

    function songHandler() {
        dispatch(setSong(albumSong));
    }

    // function toggleSong() {
    //     dispatch(setIsPlaying({ ...albumSong, isPlaying: !song.isPlaying }));
    // }

    return (
        <div onClick={songHandler} className={`${classes.musicTrack} ${albumSong?._id === song?._id ? classes.musicTrackActive : null}`}>
            <div className={classes.musicTrackLeft}>
                {/* <IconButton onClick={toggleSong}>
                    {song.isPlaying && albumSong.title === song.title ? <PauseRounded /> : <PlayArrow />}
                </IconButton> */}
                <div className={classes.musicTrackImage}>
                    <Image src={"/images/singer.jfif"} alt="" width="75" height="75" layout="responsive" />
                </div>
                <h3>Ian Mulder</h3>
                <h4>{albumSong?.Song_Name}</h4>
            </div>
            <div className={classes.musicTrackRight}>
                <h3>8:04</h3>
                <IconButton>
                    <Favorite />
                </IconButton>
            </div>
        </div>
    );
}

export default React.memo(MusicTracker, (prevState, currentState) => {
    if (prevState.albumSong?._id !== currentState.albumSong?._id) return false;
    return true;
});
