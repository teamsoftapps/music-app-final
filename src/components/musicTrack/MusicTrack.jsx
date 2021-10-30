import React, { useCallback } from "react";
import { MusicNote } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import classes from "./MusicTrack.module.css";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setIsPlaying, setSong } from "../../store/musicReducer";

const postSelector = (state) => state.music;

function MusicTracker({ albumSong }) {
    const { song } = useSelector(postSelector, shallowEqual);

    const dispatch = useDispatch();

    const trackRef = useCallback((node) => {
        if (node) {
            node.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, []);

    function songHandler() {
        dispatch(setSong(albumSong));
        // dispatch(setIsPlaying(false));
    }

    return (
        <div
            ref={albumSong?._id === song?._id ? trackRef : null}
            onClick={songHandler}
            className={`${classes.musicTrack} ${albumSong?._id === song?._id ? classes.musicTrackActive : null}`}
        >
            <div className={classes.musicTrackLeft}>
                <IconButton className={classes.songTune}>
                    <MusicNote />
                </IconButton>
                {/* {albumSong?._id === song?._id && song?.Song_Lyrics ? (
                    <marquee behavior="scroll" direction="left" scrollamount="8">
                        {albumSong?.Song_Lyrics}
                    </marquee>
                ) : ( */}
                <h4>{albumSong?.Song_Name}</h4>
                {/* )} */}
            </div>
            <div className={classes.musicTrackRight}>
                <h3>{albumSong?.Song_Length}</h3>
            </div>
        </div>
    );
}

export default React.memo(MusicTracker, (prevState, currentState) => {
    if (prevState.albumSong?._id !== currentState.albumSong?._id) return false;
    return true;
});
