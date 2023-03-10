import { IconButton } from "@material-ui/core";
import { Lock, MusicNote } from "@material-ui/icons";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React, { useCallback, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import api from "./../../../services/api";
import { setFavourites, setSong, setSongs } from "./../../store/musicReducer";
import classes from "./MusicTrack.module.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const postSelector = (state) => state.music;

const MusicTracker = ({
  albumSong,
  order,
  songs,
  currentTime,
  setCurrentTime,
  trial,
  setSongName,
  setSongArray,
  setSingleSong,
}) => {
  const { song, user, favourites, favouriteId } = useSelector(
    postSelector,
    shallowEqual
  );

  const dispatch = useDispatch();

  const [myCommutativeLength, setMyCommutativeLength] = useState(0);
  const [locked, setLocked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [open, setOpen] = useState(false);
  const [subscriptionSongs, setSubscriptionSongs] = useState(null);
  // const [eachAlbumSongs,setEachAlbumSongs]=useState(null)

  // useEffect(()=>{
  //     if (typeof window !== "undefined") {
  //       setEachAlbumSongs(JSON.parse(localStorage.getItem("songArray")))
  //     }
  // },[eachAlbumSongs])

  const subscriptionSongsArr = subscriptionSongs?.map((obj) => obj.songs);

  // let unlockedSongs=false;
  let lockedSongs = false;

  // console.log("subscriptionSongsArr >>>>>>>>>>", subscriptionSongsArr);
  // console.log("albumSongName====>", albumSong.Song_Name);
  // console.log("Subscription-Songs====>",subscriptionSongs)
  // eachAlbumSongs && console.log("Each_Album_Songs===>",eachAlbumSongs)

  subscriptionSongsArr &&
    subscriptionSongsArr[0]?.map((elem, index) => {
      if (elem.Song_Name === albumSong.Song_Name) {
        lockedSongs = true;
      }
      //  else{
      //   lockedSongs=false;
      //  }
    });

  subscriptionSongs?.forEach((elem) => {
    //  console.log("Subscrition-Songs..",elem?.songs[0])
    if (elem?.songs[0] === "all") {
      lockedSongs = true;
    }
  });

  // eachAlbumSongs && eachAlbumSongs.forEach((elem)=>{
  //    if(elem?.Song_Name===albumSong?.Song_Name){
  //      unlockedSongs =true;
  //    }
  // })

  // console.log("Locked Songs====>", lockedSongs);

  // if (typeof window !== "undefined") {
  //   localStorage.setItem("Locked Songs", lockedSongs);
  // }

  function handleClick() {
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const trackRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  function songHandler() {
    // if (locked) return;
    if (lockedSongs) return;

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
    // console.log("songJump >>>>>>>>>>>>>");

    // if (locked) return;
    if (!lockedSongs) return;

    let songArray;

    if (typeof window !== "undefined") {
      // Perform localStorage action
      songArray = localStorage.getItem("songArray");
    }

    songArray = JSON.parse(songArray);

    const index = songArray.findIndex((o) => {
      return o.Song_Name === albumSong.Song_Name;
    });

    const arr1 = songArray.slice(index, songArray.length);
    const arr2 = songArray.slice(0, index);
    songArray = [...arr1, ...arr2];

    // console.log("songArray >>>>>>>>>>>>", songArray);

    if (typeof window !== "undefined") {
      // Perform localStorage action
      localStorage.setItem("currentSongIndex", 0);
      localStorage.setItem("songArray", JSON.stringify(songArray));
    }

    // console.log("songArray[0] >>>>>>>>>>>>>", songArray[0]);

    setSingleSong(songArray[0]?.Song_File);
    setSongArray(songArray);
  }

  const handleChangeSong = () => {
    // console.log("clicked!!");
    // handleSingleSong();
  };

  const handleLike = async (id) => {
    // console.log("handleLike id >>>>>>>>>>>>>>>>>>>", id);

    setOpen(true);

    // console.log(
    //   `localStorage.getItem("music-app-credentials") >>>>>>>>>>>>>>>>`,
    //   localStorage.getItem("music-app-credentials")
    // );

    let token;

    if (typeof window !== "undefined") {
      // Perform localStorage action
      ({ token } = JSON.parse(localStorage.getItem("music-app-credentials")));
    }

    // if (locked === true) {
    //   setLiked(false);
    // } else setLiked(!liked);

    if (lockedSongs === true) {
      setLiked(false);
    } else setLiked(!liked);

    try {
      const { data } = await api.get(`/api/favourites/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      // console.log("handleLike API data >>>>>>>>>>>>>>>", data);

      dispatch(setFavourites(data?.favourites));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    dispatch(setSongs(songs));
    setMyCommutativeLengthFunction();

    if (trial && order !== 1 && order % 5 !== 0) {
      setLocked(true);
    }

    // handleLike(albumSong?._id);

    if (localStorage.getItem("subscriptionSongDetails")) {
      setSubscriptionSongs(
        JSON.parse(localStorage.getItem("subscriptionSongDetails"))
      );
    }
  }, []);

  return (
    <div onClick={handleChangeSong}>
      <div
        ref={albumSong?._id === song?._id ? trackRef : null}
        // onClick={isMobile ? songJump : songHandler}
        // onClick={isMobile ? songJump : songJump}
        className={`${classes.musicTrack} ${
          albumSong?._id === song?._id ? classes.musicTrackActive : null
        } ${!lockedSongs ? classes.showCursor : null}`}
        style={{ cursor: locked && "not-allowed" }}
        // disabled={lockedSongs}
        // disabled={(trial && index === 0) || !lockedSongs}
      >
        <div className={classes.musicTrackLeft}>
          <IconButton className={classes.songTune}>
            <MusicNote />
          </IconButton>
          {lockedSongs && (
            <IconButton
              className={classes.songTune}
              onClick={() => handleLike(albumSong?._id)}
            >
              {favourites?.some((item) => item?._id === songs[order]?._id) ? (
                <FavoriteIcon style={{ transition: "all 0.3s ease" }} />
              ) : (
                <FavoriteBorderIcon style={{ transition: "all 0.3s ease" }} />
              )}
            </IconButton>
          )}
          {/* {albumSong?._id === song?._id && song?.Song_Lyrics ? (
              <marquee behavior="scroll" direction="left" scrollamount="8">
              {albumSong?.Song_Lyrics}
              </marquee>
          ) : ( */}
          <h4 onClick={songJump}>{albumSong?.Song_Name}</h4>
          {/* )} */}
        </div>
        <div></div>
        {/* <Alert className={classes.alert} severity="error">Not Available In Trial Period</Alert> */}
        <div className={classes.musicTrackRight}>
          {!lockedSongs && (
            <span className={classes.locked}>
              <Lock />
            </span>
          )}

          <h3>{albumSong?.Song_Length}</h3>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={1000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Favourites Updated!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default React.memo(MusicTracker, (prevState, currentState) => {
  if (prevState.albumSong?._id !== currentState.albumSong?._id) return false;
  return true;
});
