import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import classes from "./DeletePlaylistModal.module.css";
import api from "../../../services/api";
import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { shallowEqual, useSelector } from "react-redux";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-container": {
    scrollBehavior: "smooth",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    margin: theme.spacing(0),
    backgroundColor: "#ccaa6b",

    width: "100%",
    height: "100%",
    overflow: "auto",

    "&::-webkit-scrollbar": {
      width: 12,
      backgroundColor: "black",
    },
    "&::-webkit-scrollbar-track": {
      WebkitBoxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
      borderRadius: "10px",
      backgroundColor: "black",
    },
    "&::-webkit-scrollbar-thumb": {
      WebkitBoxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
      borderRadius: "10px",
      backgroundColor: "#876727f7",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#555",
      borderRadius: "100px",
    },
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
    borderRadius: "100px",
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        m: 0,
        py: 1,
        px: 2,
        width: "100%",
        fontSize: "1rem",
        fontWeight: "600",
        backgroundColor: "#ccaa6b",
        color: "#000000",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      {...other}
    >
      {children}
      {onClose && (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={
            {
              // color: "black",
            }
          }
        >
          <CloseIcon color="#000000" />
        </IconButton>
      )}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
const postSelector = (state) => state.music;

const LyricsDialogs = ({
  setOpenDeletePlaylistModal,
  openDeletePlaylistModal,
  handleCloseDeletePlaylistModal,
  handleOpenDeletePlaylistModal,
  lyrics,
}) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { language, user } = useSelector(postSelector, shallowEqual);
  const [snackbarMessage, setSnackbarMessage] = useState(
    "Please go to the previous page"
  );
  const router = useRouter();
  const deletePlaylist = async () => {
    try {
      const playlist_id = localStorage.getItem("playlistid");

      if (!playlist_id || typeof playlist_id != "string") {
        return;
      }

      let token;
      if (typeof window !== "undefined") {
        token = JSON.parse(localStorage.getItem("music-app-credentials"));
      }

      const { data } = await api.delete(`/api/playlists/${playlist_id}`, {
        headers: {
          authorization: `Bearer ${token?.token}`,
        },
      });
      console.log(data);
      setSnackbarMessage(data.message);
      router.back();
      console.log("yahan snackbar ");
    } catch (err) { }
  };

  function onConfirm() {
    console.log("Confirm Delete");
    deletePlaylist();
    setOpenSnackbar(true);
  }
  function onCancel() {
    handleCloseDeletePlaylistModal();
    console.log("Cancel Delete");
  }

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  return (
    <div className={classes.lyrics_dialog}>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={openDeletePlaylistModal}
        style={{ borderRadius: "100px" }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleCloseDeletePlaylistModal}
        >

          {language.title === "nl" ? "Playlist verwijderen" : "Delete Playlist Confirmation"}

        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div style={{ color: "black", width: "100%", marginTop: "10px" }}>
            {language.title === "nl" ? "Weet u zeker dat u de playlist wilt verwijderen?" : "Are you sure you want to delete the playlist?"}

          </div>
          <div
            className={classes.buttonContainer}
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <button
              style={{
                color: "black",
                width: "30%",
                height: "30px",
                fontSize: "15px",
                margin: "5px",
                flex: "auto",
              }}
              onClick={onConfirm}
            >{language.title === "nl" ? "Ja" : "Yes"}
            </button>
            <button
              style={{
                color: "black",
                width: "30%",
                height: "30px",
                fontSize: "15px",
                margin: "5px",
                flex: "auto",
              }}
              onClick={onCancel}
            >{language.title === "nl" ? "Nee" : "Cancel"}

            </button>
          </div>
          {/* </div> */}
        </DialogContent>
      </BootstrapDialog>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage || "Please go back to previous page."}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LyricsDialogs;
