import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import style from "../../../styles/global.module.scss";
import Card from "../../components/card/Card";
import Card1 from "./../../components/card1/Card1";
import LyricsModal from "../../components/lyricsModal/LyricsModal";
import MusicTracker from "../../components/musicTrack/MusicTrack";
import { Typography } from "@mui/material";
import {
  setAlbum,
  setFavouriteId,
  setSong,
  setSongs,
} from "../../store/musicReducer";
import classes from "./AlbumPage.module.css";
import { Height } from "@material-ui/icons";
const postSelector = (state) => state.music;

const AlbumPage = ({ songs, album }) => {
  console.log("AlbumPage >>>>>>>>");

  // console.log("Songs: ", songs);
  // console.log("Album: ", album);

  const { song, language, user, favouriteId } = useSelector(
    postSelector,
    shallowEqual
  );

  // console.log(songs);

  const route = useRouter();
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(0);
  const [songName, setSongName] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [pic, setPic] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [file, setFile] = useState("");
  const [singleSong, setSingleSong] = useState("");
  const [songArray, setSongArray] = useState([]);
  const [time, setTime] = useState(1000);
  const [showLyrics, setShowLyrics] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loadingForAlbum, setLoadingForAlbum] = useState(false);
  const [songPlay, setSongPlay] = useState(false);
  const [lockedSongs, setLockedSongs] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [selected, setSelected] = useState(false);
  const [screenRefresh, setScreenRefresh] = useState(false);
  const [songHr, setSongHr] = useState(0);
  const [songMin, setSongMin] = useState(0);
  const [songHrShow, setSongHrShow] = useState(false);
  const [songPlaying, setSongPlaying] = useState(false);

  const toggleSwitch = () => {
    setIsOn(prevState => !prevState);
  };
  // seperate each song file
  // console.log(pic)

  const songFileArray = songs.map((ele, ind) => {
    let fileName = process.env.media_url.concat(ele.Song_File);
    return {
      fileName,
      length: ele.Song_Length,
    };
  });
  const onPauseSong = () => {
    setSongPlaying(false);
  };
  const onPlaySong = () => {
    setSongPlaying(true);
  };
  const onEndSong = () => {
    let currentSongIndex;

    if (typeof window !== "undefined") {
      // Perform localStorage action
      currentSongIndex = localStorage.getItem("currentSongIndex");
    }

    currentSongIndex++;
    if (currentSongIndex < songArray.length) {
      if (typeof window !== "undefined") {
        // Perform localStorage action
        localStorage.setItem("currentSongIndex", currentSongIndex);
      }

      setSingleSong(
        `${process.env.media_url}/${songArray[currentSongIndex].Song_File}`
      );
    } else {
      if (typeof window !== "undefined") {
        // Perform localStorage action
        localStorage.setItem("currentSongIndex", 0);
      }

      setSongName(songArray[0].Song_Name);
      setAlbumName(songArray[0].Album_Name);
      // console.log(
      //   "img",
      //   process.env.media_url.concat(songArray[0].Album_Image)
      // );
      setPic(process.env.media_url.concat(songArray[0].Album_Image));
      setSingleSong(`${process.env.media_url}/${songArray[0]?.Song_File}`);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    console.log(song?.Song_Length);
    setScreenRefresh(true);

    if (song && song.Song_Length) {
      const timeComponents = song.Song_Length.split(":");

      if (timeComponents.length === 2) {
        // Format: MM:SS
        setSongHrShow(false);
        const [minutes, seconds] = timeComponents;
        setSongMin(parseInt(minutes, 10));
      } else if (timeComponents.length === 3) {
        // Format: HH:MM:SS
        setSongHrShow(true);
        const [hours, minutes, seconds] = timeComponents;
        setSongHr(parseInt(hours, 10));
        setSongMin(parseInt(minutes, 10));
      }
    }

  }, [song]);

  useEffect(() => {
    // console.log(`${process.env.media_url}/${songArray[0]?.Song_File}`)
    setSingleSong(`${process.env.media_url}/${songArray[0]?.Song_File}`);
  }, [songArray]);

  useEffect(() => {
    let currentSongIndex;

    if (typeof window !== "undefined") {
      // Perform localStorage action
      currentSongIndex = localStorage.getItem("currentSongIndex");
    }

    setAlbumName(songArray[currentSongIndex]?.Album_Name);
    setSongName(songArray[currentSongIndex]?.Song_Name);
    setLyrics(songArray[currentSongIndex]?.Song_Lyrics);

    setPic(
      `${process.env.media_url}/`.concat(
        songArray[currentSongIndex]?.Album_Image
      )
    );
  }, [singleSong]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Perform localStorage action
      localStorage.setItem("currentSongIndex", 0);
    }

    // console.log(`${process.env.media_url}/${songs[0].Song_File}`);
    // songs?.some((s) => {
    //     if (s?._id === favouriteId) {
    //         let calcSecs = calculateSeconds(s?.Song_Length)
    //         console.log(calcSecs)
    //         setCurrentTime(calcSecs)
    //     }
    // })
    // console.log(songs)

    let user;

    if (typeof window !== "undefined") {
      // Perform localStorage action
      user = JSON.parse(localStorage.getItem("music-app-credentials"));
    }

    if (user?.hasOwnProperty("expiresIn")) {
      let tempArr = songs.filter((ele, i) => {
        if (i === 1) return ele;
        if (i !== 1 && i % 5 === 0) {
          return ele;
        }
      });

      let stringifyArray = JSON.stringify(tempArr);

      if (typeof window !== "undefined") {
        // Perform localStorage action
        localStorage.setItem("songArray", stringifyArray);
      }

      setSongArray(tempArr);
      setSingleSong(`${process.env.media_url}/${tempArr[0].Song_File}`);
    } else {
      let stringifyArray = JSON.stringify(songs);

      if (typeof window !== "undefined") {
        // Perform localStorage action
        localStorage.setItem("songArray", stringifyArray);
      }

      if (favouriteId) {
        let index = songs.findIndex((o) => o._id === favouriteId);
        let arr1 = songs.slice(index, songs.length);
        let arr2 = songs.slice(0, index);
        const finalArr = [...arr1, ...arr2];
        setSongArray(finalArr);
        setSingleSong(`${process.env.media_url}/${finalArr[0].Song_File}`);
      } else {
        setSongArray(songs);
        setSingleSong(`${process.env.media_url}/${songs[0]?.Song_File}`);
      }
    }

    setSongName(songs[0]?.Song_Name);
    setLyrics(songs[0]?.Song_Lyrics);

    if (!user?.token) return route.replace("/login");

    if (!songs?.length) return route.replace("/");

    // console.log("album page album >>>>>>>>>>>>>>", album);
    // console.log("album page songs >>>>>>>>>>>>>>", songs);

    dispatch(setSongs(songs));
    dispatch(setAlbum(album));

    if (isMobile) {
      dispatch(setSong(songs[songs.length - 1]));
    } else {
      // dispatch(setSong(songs[0]));
      dispatch(setSong(songs[songs.length - 1]));
    }

    return () => {
      if (typeof window !== "undefined") {
        // Perform localStorage action
        localStorage.removeItem("counter");
      }

      dispatch(setFavouriteId(""));
    };
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

  const [selectedSongIndex, setSelectedSongIndex] = useState(null);
  const handleChangeSong = (index) => {
    setSelectedSongIndex(index);
    setSelected(true);
    console.log(selected);
  };

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

      <div
        style={{
          position: "fixed",
          top: "50%",
          right: "44vw",
          left: "44vw",
          // left: 0,
          // width: "100%",
          // height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 100,
        }}
      >
        <ClipLoader color="red" loading={loadingForAlbum} size={"10vw"} />
      </div>
      <h4 style={{ color: "white", textAlign: "center" }}>{language.title === "nl" ? "STREAMEN" : "STREAMING"}</h4>
      <h1>{song?.Album_Name} </h1>
      {songHrShow ? (
        <h3>
          ({songHr} hr. {songMin !== 0 && `${songMin} min.)`}
        </h3>
      ) : (
        songMin !== 0 && <h3>({songMin} min.)</h3>
      )}


      {/* ----------Lyrics Mode Switch---------- */}

      <div className={classes.lyricsToggleButtonContainer}>
        <div className={classes.lyricsToggleButtonMain} style={{ display: 'flex', alignItems: 'center' }}>
          <label className={`switch ${isOn ? 'on' : 'off'} ${classes.lyricsToggleButtonLabel}`}>
            <input className={classes.lyricsToggleButtonInput} type="checkbox" checked={isOn} onChange={toggleSwitch} />
            <span className={`${classes.lyricsToggleButtonBackground} ${isOn ? classes.isOn : ''}`}>
              <span className={`${classes.lyricsToggleButtonText} ${isOn ? classes.isOn : ''}`}>
                {/* {isOn ? 'ON' : 'OFF'} */}
                {isOn ? (language.title === "nl" ? "AAN" : "ON") : (language.title === "nl" ? "UIT" : "OFF")}
              </span>
              <span className={`${classes.lyricsToggleButtonPointer} ${isOn ? classes.isOn : ''}`}></span>
            </span>
          </label>
          <p className={classes.lyricsModeParagraph}>
            {/* <b>
              Lyrics Mode <span className={classes.redTextColor}>(new feature!)</span>
            </b> */}
            <b>{language.title === "nl" ? "Liedteksten" : "Lyrics Mode"}
              {" "}
              <span className={classes.redTextColor}>
                {language.title === "nl" ? "(nieuw!)" : "(new feature!)"}
              </span>
            </b>
          </p>
        </div>
      </div>


      {/* ----------Lyrics Modal---------- */}
      <LyricsModal
        open={open}
        setOpem={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
        lyrics={lyrics}
      />

      {/* ----------Music list and Lyrics View---------- */}

      {/* <div className={classes.albumsMain}> */}
      <div className={`${classes.albumsMain} ${isOn ? classes.isOn : ''}`}>
        <Card1
          title={song?.Album_Name}
          url={`${process.env.media_url}/${language.title === "eng"
            ? song?.Album_Image
            : song?.Album_Image && song?.Album_Image.replace("eng", "nl")
            }`}
          disableFetch
        />
        <div style={{
          flex: '1'
        }}>
          {!isOn ? <div>
            <div className={classes.albumsMainPlaylist}>
              {/* {songs?.map((albumSong, i) =>
                songs.length - 1 !== i ? ( */}
              {/* <div key={albumSong._id} onClick={() => handleChangeSong(i)} > */}
              {/* <Fragment key={i}> */}
              <Fragment >
                <MusicTracker
                  singleSong={singleSong}
                  currentTime={currentTime}
                  setCurrentTime={setCurrentTime}
                  // albumSong={albumSong}
                  // order={i}
                  songs={songs}
                  songName={songName}//
                  setSongName={setSongName}
                  trial={user?.hasOwnProperty("expiresIn")}
                  setSongArray={setSongArray}
                  setSingleSong={setSingleSong}
                  selected={selected}//
                  screenRefresh={screenRefresh}//
                  setScreenRefresh={setScreenRefresh}//
                  songPlaying={songPlaying}//
                  caller="album"//
                />
                {/* <div className={classes.lyricsStyle}>Lyrics</div> */}
              </Fragment>
              {/* </div> */}
              {/* ) : null
              )} */}
            </div>
          </div> :
            <div className={classes.lyricsViewMain}>
              <div className={classes.lyricsViewTextContainer} >
                <div style={{ padding: '20px' }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: '1rem',
                    }}
                  >
                    {(() => {
                      const lyricsInString = JSON.stringify(lyrics);
                      const lyricsArray = lyricsInString.replace(/"/g, '').split('\\r\\n');

                      if (lyricsArray.length === 1 && lyricsArray[0] === '') {
                        return (
                          <p>No lyrics to display</p>
                        );
                      } else {
                        return (
                          lyricsArray.map((text, index) => (
                            <p key={index} style={{ color: 'unset', textAlign: 'justify', fontSize: '1.2rem' }}>
                              {text}
                            </p>
                          ))
                        );
                      }
                    })()}

                  </Typography>
                </div>
                <div style={{ flex: '1' }}>
                  <div style={{ position: 'relative' }}>
                    <button className={classes.lyricsViewCloseButton} checked={isOn} onClick={toggleSwitch}>
                      <span style={{ marginRight: '5px' }}>&#9660;</span>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
      <div className={style.music}>
        <div className={classes.hoverStyling}>
          <img src={pic}></img>
        </div>
        <div className={style.infoDiv}>
          <p className={style.Album_Name}>{albumName}</p>
          {/* <br></br> */}
          <p>{songName}</p>
          {/* {lyrics !== "" && (
            <p
              style={{
                fontSize: "12px",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => setOpen(true)}
            >
              Show Lyrics
            </p>
          )} */}
        </div>
        <div className={style.trash}></div>
        <div className={style.trash}></div>
        <div className={style.trash}></div>
        <div className={style.trash}></div>
        <div className={style.trash}></div>
        <AudioPlayer
          className={style.player}
          progressJumpStep={3000}
          src={singleSong}
          onEnded={(e) => onEndSong()}
          autoPlay={true}
          onPause={(e) => onPauseSong()}
          onPlay={(e) => onPlaySong()}
        />
      </div>;

      {/* <MusicPlayer currentTime={currentTime} setCurrentTime={setCurrentTime} songs={songs} trial={user?.hasOwnProperty("expiresIn")} songName={songName} setSongName={setSongName} setLyrics={setLyrics} lyrics={lyrics} /> */}
    </div >
  );
};
// Nothing

export default React.memo(AlbumPage);
