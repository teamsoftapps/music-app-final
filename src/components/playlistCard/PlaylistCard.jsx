import { Lock } from "@material-ui/icons";
// import Alert from "@mui/material/Alert";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import React, { forwardRef, useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import classes from "./PlaylistCard.module.css";
import { useDispatch } from "react-redux";
import { setPlaylistId } from "../../store/playlistReducer";
import { styled } from "@mui/material/styles";
import DeletePlaylistModal from "../../components/deletePlaylistModal/DeletePlaylistModal";
import Link from "next/link";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

import Snackbar from "@mui/material/Snackbar";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";

const postSelector = (state) => state.music;
// const apiURL = process.env.

const PlaylistCard = forwardRef(
  (
    {
      playlist_id,
      subscriptionAlbum,
      playlist,
      url,
      index,
      trial,
      disableFetch,
      setLoading,
      songs,
    },
    ref
  ) => {
    // console.log("PlaylistCard component >>>>>>>>");

    const apiUrl = process.env.base_url;
    const route = useRouter();
    const { user } = useSelector(postSelector, shallowEqual);
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    // const [open, setopen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSaverity, setSnackbarSaverity] = useState("warning");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    let playlistName = true;
    const dispatch = useDispatch();

    const onCancel = () => {
      setOpenSnackbar(false);

      // console.log("Set open: ", open);
      console.log("Show Dialog on cancel: ", showDialog);

      return;
    };

    const onConfirm = () => { };

    function handleClick(playlistName) {
      console.log("comes here");
      if (!user) {
        route.replace("/login");
        return;
      }

      if (songs.length === 0 && playlist?.Playlist_Name !== "Your Favorites") {
        console.log("show the snackbar here ");
        setOpenSnackbar(true);
        setSnackbarMessage("The playlist is Empty");
        console.log("Show Dialog: ", showDialog);
        return;
      }
      if (disableFetch) return;
      setLoading(true);
      if (user?.hasOwnProperty("expiresIn")) {
        localStorage.setItem("playlistid", `${playlist_id}`);
        dispatch(setPlaylistId(playlist_id));

        msg
          ? route.push(`/playlist/${playlist?.Playlist_Name}`)
          : // route.push(`/playlist/${playlist?.playlist_id}`)
          handleExpireAlert();
      } else {
        // route.push(`/playlist/${playlist?.Playlist_Name}`);
        localStorage.setItem("playlistid", `${playlist_id}`);
        localStorage.setItem("isadmin", `${playlist.Is_Created_By_Admin}`);
        localStorage.setItem("playlistname", `${playlist?.Playlist_Name}`);
        localStorage.setItem("playlistimage", `${playlist?.Playlist_Image}`);
        dispatch(setPlaylistId(playlist._id));
        let uri = playlist?.Playlist_Name;
        let encoded = encodeURIComponent(uri);
        route.push(`/playlist/${encoded}`);
      }
    }

    const handleExpireAlert = () => {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    };

    console.log(playlist, "ye playlist object ha ");
    console.log(
      `${process.env.base_url}/${playlist.Playlist_Image}`,
      "this is url"
    );

    // const customSnackbarClass = {
    //   backgroundColor: "green", // Change this to your desired background color
    //   color: "white", // Change this to your desired text color
    // };
    return (
      <>
        <div
          className={classes.playlistBoxes}
          onClick={() => handleClick(playlist?.Playlist_Name)}
          // onClick={() => route.push(`/playlist/yourfavourites`)}
          style={disableFetch && { cursor: "auto" }}
          ref={ref}
          disabled={(trial && index === 0) || !playlistName}
        >
          {error && (
            <Alert className={classes.alert} severity="error">
              Not Available In Trial Period
            </Alert>
          )}
          <div className={classes.playlistItem}>
            <div
              className={classes.playlistItemImage}
              style={{
                transformOrigin: "center center",
                transition: "transform 1.5s ease",
                position: "relative", // Add this line
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              <Image
                priority
                // <Image className={classes.playlistItemImage} priority
                // src={`${process.env.base_url}/${playlist.Playlist_Image}`}
                src={playlist.Playlist_Image}
                alt=""
                width={70}
                height={70}
              />
              {(trial || !playlistName) && ( // Combine conditions
                <span className={classes.locked}>
                  <span
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <Lock />
                  </span>
                </span>
              )}
            </div>
            <div className={[classes.playlistItemText]}>
              {playlist?.Playlist_Name}
            </div>
          </div>

          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={openSnackbar}
            autoHideDuration={1500}
            onClose={onCancel}
          // classes={{ content: customSnackbarClass }}
          >
            <Alert
              onClose={onCancel}
              // severity={"success" || "warning"}
              // severity={snackbarSaverity}
              severity={"success"}
              sx={{ width: "100%" }}
            >
              {snackbarMessage || "Please go back to previous page."}
            </Alert>
          </Snackbar>
        </div>
      </>
    );
  }
);

PlaylistCard.displayName = "PlaylistCard";

// export default React.memo(PlaylistCard);
export default PlaylistCard;
