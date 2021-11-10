import React, { useCallback, useEffect, useState } from "react";
import { MusicNote } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import classes from "./MusicTrack.module.css";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setIsPlaying, setSong, setSongs } from "../../store/musicReducer";
import { isMobile } from "react-device-detect";

const postSelector = (state) => state.music;

function MusicTracker({ albumSong, order, songs, currentTime, setCurrentTime }) {
    const { song } = useSelector(postSelector, shallowEqual);

    const dispatch = useDispatch();

    const [myCommutativeLength, setMyCommutativeLength] = useState(0);

    useEffect(() => {
        dispatch(setSongs(songs));
        setMyCommutativeLengthFunction();
    });

    const trackRef = useCallback((node) => {
        if (node) {
            node.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, []);

    function songHandler() {
        dispatch(setSong(albumSong));
        // dispatch(setIsPlaying(false));
    }

    function calculateSeconds(hms) {
        var a = hms.split(":");
        let seconds = a[0] * 60 + +a[1];
        if (a.length > 2) {
            seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
        }
        return seconds;
    }

    function setMyCommutativeLengthFunction() {
        let count = 0;
        songs.map((song, i) => {
            if (i < order) {
                count += calculateSeconds(song.Song_Length);
            }
        });
        setMyCommutativeLength(count);
    }

    function songJump() {
        document.getElementById("audioPlayer").currentTime = myCommutativeLength;
        setCurrentTime(myCommutativeLength);
    }

    return (
        <div
            ref={albumSong?._id === song?._id ? trackRef : null}
            onClick={isMobile ? songJump : songHandler}
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
