import React, { useCallback, useEffect, useState } from "react";
import { MusicNote, Lock, Heart } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import classes from "./MusicTrack.module.css";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setIsPlaying, setSong, setSongs } from "../../store/musicReducer";
import { isMobile } from "react-device-detect";
import Alert from "@mui/material/Alert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const postSelector = (state) => state.music;

function MusicTracker({ albumSong, order, songs, currentTime, setCurrentTime, trial }) {
    const { song, user } = useSelector(postSelector, shallowEqual);

    // console.log(order)

    const dispatch = useDispatch();

    const [myCommutativeLength, setMyCommutativeLength] = useState(0);
    const [locked, setLocked] = useState(false);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        dispatch(setSongs(songs));
        setMyCommutativeLengthFunction();
        if (trial && order !== 1 && order % 5 !== 0) {
            setLocked(true);
        }
    });

    const trackRef = useCallback((node) => {
        if (node) {
            node.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, []);

    function songHandler() {
        if (locked) return;
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
        if (locked) return;
        document.getElementById("audioPlayer").currentTime = myCommutativeLength;
        setCurrentTime(myCommutativeLength);
    }

    const handleLike = () => {
        if (locked === true) {
            setLiked(false);
        } else setLiked(!liked);
    };

    return (
        <div
            ref={albumSong?._id === song?._id ? trackRef : null}
            // onClick={isMobile ? songJump : songHandler}
            // onClick={isMobile ? songJump : songJump}
            onClick={songJump}
            className={`${classes.musicTrack} ${albumSong?._id === song?._id ? classes.musicTrackActive : null}`}
            style={{ cursor: locked && "not-allowed" }}
        >
            <div className={classes.musicTrackLeft}>
                <IconButton className={classes.songTune}>
                    <MusicNote />
                </IconButton>
                <IconButton className={classes.songTune} onClick={() => handleLike()}>
                    {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                {/* {albumSong?._id === song?._id && song?.Song_Lyrics ? (
                    <marquee behavior="scroll" direction="left" scrollamount="8">
                    {albumSong?.Song_Lyrics}
                    </marquee>
                ) : ( */}
                <h4>{albumSong?.Song_Name}</h4>
                {/* )} */}
            </div>
            <div></div>
            {/* <Alert className={classes.alert} severity="error">Not Available In Trial Period</Alert> */}
            <div className={classes.musicTrackRight}>
                {locked && (
                    <span className={classes.locked}>
                        <Lock />
                    </span>
                )}
                <h3>{albumSong?.Song_Length}</h3>
            </div>
        </div>
    );
}

export default React.memo(MusicTracker, (prevState, currentState) => {
    if (prevState.albumSong?._id !== currentState.albumSong?._id) return false;
    return true;
});
