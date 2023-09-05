import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { shallowEqual, useSelector } from "react-redux";
import api from "./../../../services/api";
import classes from "./AddToPlaylistPage.module.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Image from "next/image";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const postSelector = (state) => state.music;

const AddToPlaylistPage = ({ playlistsOrder }) => {
    console.log("Create new playlist page >>>>>>>>", playlistsOrder);
    const canvasRef = useRef(null);
    const router = useRouter();
    const { language, user } = useSelector(postSelector, shallowEqual);
    let parsedSongID = null;
    let parsedSongName = null;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedSongName, setSelectedSongName] = useState(null);
    const [selectedSongID, setSelectedSongID] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [selectedPlaylistID, setSelectedPlaylistID] = useState(null);

    useEffect(() => {
        const fetchDataFromRouterQuery = () => {
            const { songID, songName } = router.query;
            if (songID && songName) {
                parsedSongID = JSON.parse(songID);
                parsedSongName = JSON.parse(songName);
                setSelectedSongName(parsedSongName);
                setSelectedSongID(parsedSongID);
            }
        };
        fetchDataFromRouterQuery();
    }, []);

    const handleGoBack = () => {
        setLoading(true);
        router.back();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Selected Playlist Name:", selectedPlaylist?.Playlist_Name);
        if (!selectedSongID || !selectedPlaylist) {
            if (!selectedSongID) {
                setSnackbarMessage("Please go to album or playlist page.");
                setOpenSnackbar(true);
            }
            if (!selectedPlaylist) {
                setSnackbarMessage("Please select a playlist.");
                setOpenSnackbar(true);
            }
        }
        return;
        setLoading(true);
        let token;
        if (typeof window !== "undefined") {
            ({ token } = JSON.parse(localStorage.getItem("music-app-credentials")));
        }
        try {
            const body = {
                selectedPlaylistID,
                selectedSongID,
            };
            let { data } = await api.post(`/api/add-to-playlist`, body, {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            });
            setLoading(false);
            console.log("API data >>>>>>>>>>>>>>>", data);
        } catch (err) {
            setLoading(false);
            console.error(err);
            console.error(
                "err?.response?.data?.message >>>>>>>>>>",
                err?.response?.data?.message
            );
            setError(err?.response?.data?.message);
            setTimeout(() => {
                setError("");
            }, 3000);
        }
    };

    const handleSelectPlaylist = (playlist) => {
        if (selectedPlaylist === playlist) {
            setSelectedPlaylist(playlist);
            setSelectedPlaylistID(playlist._id);
        } else {
            setSelectedPlaylist(playlist);
            setSelectedPlaylistID(playlist._id);
        }
    };

    useEffect(() => {
        if (!user) {
            router.replace("/login");
        }
    }, [user]);

    useEffect(() => {
        const handlePopstate = () => {
            setLoading(true);
        };
        window.addEventListener('popstate', handlePopstate);
        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, []);

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbar(false);
        setSnackbarMessage("");
    };

    return (
        <form
            autoComplete="off"
            onSubmit={(e) => handleSubmit(e)}
            className={classes.auth}
        >
            <Head>
                <title>
                    {language.title === "nl"
                        ? "Mulder muziekstreaming"
                        : "Mulder Music Streaming"}{" "}
                    |{" "}
                    {language.title === "nl" ? "NULL" : "Add to Playlist"}
                </title>
            </Head>
            <h1>
                {language.title === "nl"
                    ? "NULL"
                    : "Add to Playlist"}
            </h1>
            <div>
                {selectedSongName !== null && (
                    <div>
                        <p>{`Note: "${selectedSongName}" will be added to the selected playlist.`}</p>
                    </div>
                )}
            </div>
            {loading && (
                <div className={classes.loading}>
                    <h1 style={{ fontSize: "2.5rem" }}>Loading...</h1>
                </div>
            )}
            {error && <h3 style={{ color: "red" }}>{error}</h3>}
            <br />
            <h2>
                Please select a playlist.
            </h2>
            <br />
            <div>
                {playlistsOrder?.map((playlist, i) =>
                    playlistsOrder.length !== i ? (
                        <div
                            className={`${classes.playlistItem} ${selectedPlaylist?.Playlist_Name === playlist.Playlist_Name
                                ? classes.selectedPlaylistItem
                                : ""
                                }`}
                            onClick={() => handleSelectPlaylist(playlist)}
                        >
                            <div className={classes.playlistItemImage}>
                                <img
                                    priority
                                    src={playlist.Playlist_Image}
                                    alt=""
                                    width={70}
                                    height={70}
                                    style={{ borderRadius: '10%', border: '1px solid white', }}
                                />
                            </div>
                            <div className={classes.playlistItemText}>
                                {playlist.Playlist_Name}
                            </div>
                        </div>
                    ) : null)}
            </div>
            <div>
                <button>Confirm add to Playlist</button>
            </div>
            <p>
                <span className={classes.linkBoxWrapper}>
                    <span
                        style={{ color: "#fff", textDecoration: "underline" }}
                        onClick={handleGoBack}
                    >
                        {language.title === "nl" ? "NULL" : "Go back to previous screen"}
                    </span>
                </span>
            </p>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="warning"
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage || "Please go back to previous page."}
                </Alert>
            </Snackbar>
        </form>
    );
};

export default AddToPlaylistPage;

