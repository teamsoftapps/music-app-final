import { IconButton } from "@material-ui/core";
import { Lock, MusicNote, MoreHoriz, BarChart } from "@material-ui/icons";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import api from "./../../../services/api";
import { setFavourites, setSong, setSongs } from "./../../store/musicReducer";
import classes from "./MusicTrack.module.css";
import { Menu, MenuItem } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import UseAnimations from "react-useanimations";
import loading2 from "react-useanimations/lib/loading2";
import { useRouter } from "next/router";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const postSelector = (state) => state.music;

const MusicTracker = ({
  // singleSong,
  // currentTime,
  // setCurrentTime,
  songs,
  songName,
  // setSongName,
  trial,
  setSongArray,
  setSingleSong,
  // selected,
  // screenRefresh,
  // setScreenRefresh,
  songPlaying,
  caller,
  songsLength,
}) => {
  const { song, favourites } = useSelector(postSelector, shallowEqual);
  const dispatch = useDispatch();
  const router = useRouter();
  const { language, user } = useSelector(postSelector, shallowEqual);
  const [myCommutativeLength, setMyCommutativeLength] = useState(0); // myCommutativeLength not used
  const [locked, setLocked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [open, setOpen] = useState(false);
  const [subscriptionSongs, setSubscriptionSongs] = useState(null);
  const [selectedSongName, setSelectedSongName] = useState("");
  const [text, setText] = useState("Favourites Updated");

  useEffect(() => {
    console.log("Song Name: ", songName);
    localStorage.setItem("selectedSongName", songName);
    setSelectedSongName(songName);
  }, [songName]);

  //  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [menuPosition, setMenuPosition] = useState({ left: 0, top: 0 });

  const subscriptionSongsArr = subscriptionSongs?.map((obj) => obj.songs);

  let lockedSongs = false;

  console.log(song, "song from music track");
  function subscriptionCheck(albumSong, i) {
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
  }

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
    // Not used
    // if (locked) return;
    if (lockedSongs) return;

    dispatch(setSong(albumSong));

    // dispatch(setIsPlaying(false));
  }

  function calculateSeconds(hms) {
    // myCommutativeLength not used
    var a = hms.split(":");
    let seconds = a[0] * 60 + +a[1];
    if (a.length > 2) {
      seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
    }
    return seconds;
  }

  function setMyCommutativeLengthFunction() {
    // myCommutativeLength not used
    let count = 0;

    songs.map((song, index) => {
      if (index < i) {
        count += calculateSeconds(song.Song_Length);
      }
    });

    setMyCommutativeLength(count);
  }

  const [selectedSongIndex, setSelectedSongIndex] = useState(null);

  function songJump(albumSong, i) {
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

  // const handleChangeSong = () => {
  // console.log("clicked!!");
  // handleSingleSong();
  // };

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
      if (!id || typeof id != "string") {
        return;
      }
      const { data } = await api.get(`/api/favourites/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      console.log("handleLike API data >>>>>>>>>>>>>>>", data);

      dispatch(setFavourites(data?.favourites));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    dispatch(setSongs(songs));
    // setMyCommutativeLengthFunction(i); // myCommutativeLength not used

    if (trial && i !== 1 && i % 5 !== 0) {
      setLocked(true);
    }
    // handleLike(albumSong?._id);

    if (localStorage.getItem("subscriptionSongDetails")) {
      setSubscriptionSongs(
        JSON.parse(localStorage.getItem("subscriptionSongDetails"))
      );
    }
    const storedSelectedSongName = localStorage.getItem("selectedSongName");
    if (storedSelectedSongName) {
      setSelectedSongName(storedSelectedSongName);
    }
  }, []);

  // const [anchorEl, setAnchorEl] = useState(null);

  // const handleMenuClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  // };
  const menuRef = useRef(null);

  useEffect(() => {
    const closeMenuOnOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // setIsMenuOpen(false);
        setMenuOpenStates(new Array(songs.length).fill(false));
      }
    };

    document.addEventListener("mousedown", closeMenuOnOutsideClick);

    return () => {
      document.removeEventListener("mousedown", closeMenuOnOutsideClick);
    };
  }, []);

  // Three dot (more) menu

  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const handleMenuClick = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // };

  const handleAddToPlaylistClick = (i) => {
    setMenuOpenStates(new Array(songs.length).fill(false));
    console.log("Song Details from Music Track: ", songs[i]);
    router.push({
      pathname: "/playlist/add-to-playlist",
      query: {
        songID: JSON.stringify(songs[i]._id),
        songName: JSON.stringify(songs[i].Song_Name),
      },
    });
  };

  const handleCreateNewPlaylistClick = (i) => {
    setMenuOpenStates(new Array(songs.length).fill(false));
    console.log("Song Details from Music Track: ", songs[i]);
    // router.push('/playlist/create-playlist');
    // localStorage.setItem('selectedSongForNewPlaylist', JSON.stringify(songs[i]));
    router.push({
      pathname: "/playlist/create-playlist",
      query: {
        songID: JSON.stringify(songs[i]._id),
        songName: JSON.stringify(songs[i].Song_Name),
      },
    });
  };

  const removePlaylistSong = async (song_id) => {
    try {
      const body = {
        songId: song_id,
      };
      const playlist_id = localStorage.getItem("playlistid");
      let token;
      // console.log("idhar aya")
      if (typeof window !== "undefined") {
        token = JSON.parse(localStorage.getItem("music-app-credentials"));
      }

      if (!playlist_id || typeof playlist_id != "string") {
        return;
      }
      const { data } = await api.put(
        `/api/playlists/${playlist_id}/remove-song`,
        body,
        {
          // step 1
          headers: {
            authorization: `Bearer ${token?.token}`,
          },
        }
      );

      console.log(data);
      setText(data.message);
      setOpen(true);
      setTimeout(() => {
        router.back();
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveFromPlaylistClick = (i) => {
    setMenuOpenStates(new Array(songs.length).fill(false));

    console.log(
      "Remove from playlist clicked for song with id: ",
      songs[i]._id
    );
    // console.log(localStorage.getItem("playlistid"), " playlist id ")
    removePlaylistSong(songs[i]._id);
  };

  // Selection

  // function handleChangeSong(albumSong, i) {
  //   if (!lockedSongs) return;
  //   let songArray;
  //   if (typeof window !== "undefined") {
  //     songArray = localStorage.getItem("songArray");
  //   }
  //   songArray = JSON.parse(songArray);
  //   const index = songArray.findIndex((o) => {
  //     return o.Song_Name === albumSong.Song_Name;
  //   });
  //   const songName = index !== -1 ? songArray[index].Song_Name : '';
  //   setSelectedSongName(songName);
  //   localStorage.setItem('selectedSongName', songName);
  // };

  // function test() {
  //   console.log("Test run...");
  // }

  // function screenRefreshCheck(albumSong, i) {
  //   if (screenRefresh) {
  //     let songArray;
  //     if (typeof window !== "undefined") {
  //       songArray = localStorage.getItem("songArray");
  //     }
  //     songArray = JSON.parse(songArray);
  //     // const index = songArray.findIndex((o) => {
  //     //   return o.Song_Name === albumSong.Song_Name;
  //     // });
  //     // const songName = index !== -1 ? songArray[0].Song_Name : '';
  //     const songName = songArray[0].Song_Name;
  //     localStorage.setItem('selectedSongName', songName);
  //     setScreenRefresh(false);
  //   }
  // }

  // useEffect(() => {
  //   let songArray;
  //   if (typeof window !== "undefined") {
  //     songArray = localStorage.getItem("songArray");
  //   }
  //   songArray = JSON.parse(songArray);
  //   const songName = songArray[0].Song_Name;
  //   localStorage.setItem('selectedSongName', songName);
  //   setScreenRefresh(false);
  // }, [screenRefresh]);

  const [menuOpenStates, setMenuOpenStates] = useState([]);
  // const [isadmin,setisadmin]= useState(true)

  // Initialize the menu states array in the useEffect
  useEffect(() => {
    setMenuOpenStates(new Array(songs.length).fill(false));
  }, [songs]);

  // Update the handleMenuClick function to update the specific menu state
  const handleMenuClick = (index) => {
    const newMenuStates = [...menuOpenStates];
    newMenuStates[index] = !newMenuStates[index];
    setMenuOpenStates(newMenuStates);
  };

  const currentPath = router.asPath;
  var isAlbumPage = currentPath.includes("/album");
  let songs_length = songs.length;
  if (!isAlbumPage) {
    let fetchedIsAdmin = localStorage.getItem("isadmin");
    if (fetchedIsAdmin === "true") {
      fetchedIsAdmin = true;
    } else {
      fetchedIsAdmin = false;
    }

    console.log(fetchedIsAdmin, "is admin from music track");
  } else {
    songs_length = songs.length - 1;
  }

  return (
    <div>
      {songs?.map((albumSong, i) =>
        // songs.length !== i ? (
        songs_length !== i ? (
          // isAlbumPage ?  songs.length  - 1 :  songs.length  !== i ? (
          // {/* <div key={albumSong._id} onClick={() => handleChangeSong(index)}> */ }
          <div key={albumSong._id}>
            {/* {test()} */}
            {subscriptionCheck(albumSong, i)}
            {/* {screenRefreshCheck(albumSong, i)} */}
            {/* <div onClick={handleChangeSong}> */}
            <div
              ref={albumSong?._id === song?._id ? trackRef : null}
              //${albumSong?._id === songs[i]?._id ? classes.musicTrackActive : classes.musicTrack}
              // className={`${classes.musicTrack}
              className={`${classes.musicTrack} ${selectedSongName === albumSong?.Song_Name
                ? classes.musicTrackActive
                : classes.musicTrack
                }
          
          ${!lockedSongs ? classes.showCursor : null}`}
              style={{ cursor: locked && "not-allowed" }}
            >
              <div className={classes.musicTrackLeft}>
                <IconButton className={classes.songTune}>
                  {/* {selectedSongName === albumSong?.Song_Name ? {songPlaying===true?<BarChart />: <Lock/>}: < MusicNote />} */}
                  {selectedSongName === albumSong?.Song_Name ? (
                    songPlaying ? (
                      <UseAnimations
                        animation={loading2}
                        fillColor="#FFFFFF"
                        strokeColor="#201009"
                        size={32}
                        wrapperStyle={{ padding: "1px" }}
                      />
                    ) : (
                      <BarChart />
                    )
                  ) : (
                    <MusicNote />
                  )}
                  {/* <MusicNote /> */}
                </IconButton>
                {caller === "album" && lockedSongs && (
                  <IconButton
                    className={classes.songTune}
                    onClick={() => handleLike(albumSong?._id)}
                  >
                    {favourites?.some((item) => item?._id === songs[i]?._id) ? (
                      <FavoriteIcon style={{ transition: "all 0.3s ease" }} />
                    ) : (
                      <FavoriteBorderIcon
                        style={{ transition: "all 0.3s ease" }}
                      />
                    )}
                  </IconButton>
                )}

                <h4
                  onClick={() => {
                    songJump(albumSong, i);
                  }}
                >
                  {" "}
                  {albumSong?.Song_Name}
                </h4>
              </div>
              {/* <Alert className={classes.alert} severity="error">Not Available In Trial Period</Alert> */}
              <div className={classes.musicTrackRight}>
                {!lockedSongs && (
                  <span className={classes.locked}>
                    <Lock />
                  </span>
                )}

                <h3>{albumSong?.Song_Length}</h3>

                {/* <IconButton className={classes.songTune} onClick={handleMenuClick}> */}
                <IconButton className={classes.songTune}>
                  <MoreHoriz onClick={() => handleMenuClick(i)} />
                </IconButton>
                {/*
          <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
              horizontal: 'left', // Set anchorOrigin to left
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right', // Set transformOrigin to right
            }}
            PaperProps={{
              style: {
                backgroundColor: '#171107', // Set background color to black
                border: '1px solid black', // Add border
                borderRadius: '8px', // Add rounded corners
              },
            }}
            >
            <MenuItem onClick={handleMenuClose} style={{ backgroundColor: "#171107", border: '1px solid black', borderRadius: '8px', borderColor: 'white', margin: '3px' }}>
              <Typography variant="body2" color="white" >
                Add to playlist
                </Typography>
            </MenuItem>
            <MenuItem onClick={handleMenuClose} style={{ backgroundColor: "#171107", border: '1px solid black', borderRadius: '8px', borderColor: 'white', margin: '3px' }}>
            <Typography variant="body2" color="white" >
            Create a new playlist
            </Typography>
            </MenuItem>
          </Menu> */}

                {/* <div className={classes.popuptrigger}>
                {isMenuOpen && (
                    <div ref={menuRef} className={classes.popupmenu}>
                    <button onClick={handleMenuItemClick}>Add to playlist</button>
                    <button onClick={handleMenuItemClick}>Create a new playlist</button>
                    </div>
                    )}
                  </div> */}
                <div className={classes.popuptrigger}>
                  {menuOpenStates[i] && (
                    <div ref={menuRef} className={classes.popupmenu}>
                      <button
                        onClick={() => handleAddToPlaylistClick(i)}
                        style={{ fontWeight: "bold" }}
                      >
                        {language.title === "nl" ? "Toevoegen aan Playlist" : "Add to playlist"}
                      </button>
                      <button
                        onClick={() => handleCreateNewPlaylistClick(i)}
                        style={{ fontWeight: "bold" }}
                      >
                        {language.title === "nl" ? "Nieuwe Playlist" : "Create a new playlist"}
                      </button>
                      {caller === "playlist" &&
                        lockedSongs &&
                        !fetchedIsAdmin &&
                        songsLength > 1 && (
                          <button
                            onClick={() => handleRemoveFromPlaylistClick(i)}
                            style={{ fontWeight: "bold" }}
                          >{language.title === "nl" ? "Verwijderen uit playlist" : "Remove from playlist"}

                          </button>
                        )}
                    </div>
                  )}
                </div>
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
                  {text}
                </Alert>
              </Snackbar>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};

// export default React.memo(MusicTracker, (prevState, currentState) => {
//   if (prevState.albumSong?._id !== currentState.albumSong?._id) return false;
//   return true;
// });
export default MusicTracker;
