import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { shallowEqual, useSelector } from "react-redux";
import api from "./../../../services/api";
import classes from "./CreateNewPlaylistPage.module.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const postSelector = (state) => state.music;

const CreateNewPlaylistPage = () => {
    console.log("Create new playlist page >>>>>>>>");
    const canvasRef = useRef(null);
    const router = useRouter();
    const { language, user } = useSelector(postSelector, shallowEqual);
    let parsedSongID = null;
    let parsedSongName = null;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedPlaylistImage, setSelectedPlaylistImage] = useState(null);
    const [changeImage, setChangeImage] = useState(null);
    const [selectedSongName, setSelectedSongName] = useState(null);
    const [selectedSongID, setSelectedSongID] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [playlistName, setPlaylistName] = useState("");
    const [croppedImageDataURL, setCroppedImageDataURL] = useState(null);
    const [snackbarMessage, setSnackbarMessage] = useState("");

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
    const cropImage = (image) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const aspectRatio = 1;
        const size = Math.min(image.width, image.height);
        canvas.width = size;
        canvas.height = size;
        const x = (image.width - size) / 2;
        const y = (image.height - size) / 2;
        ctx.drawImage(image, x, y, size, size, 0, 0, size, size);
        const dataURL = canvas.toDataURL('image/jpeg');
        return dataURL;
    };
    const handleImageChange = async (event) => {
        setChangeImage(event.target.files[0]);
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const image = new Image();
                image.src = e.target.result;
                image.onload = async () => {
                    const croppedDataURL = cropImage(image);
                    if (file.size <= 1 * 1000 * 1024) {
                        setCroppedImageDataURL(croppedDataURL);
                        setSelectedPlaylistImage(file);
                    } else {
                        setOpenSnackbar(true);
                        setSnackbarMessage("File with maximum size of 1MB is allowed");
                        console.log("File with maximum size of 1MB is allowed");
                    }
                };
            };
            reader.readAsDataURL(file);
        }
    };
    const handleGoBack = () => {
        setLoading(true);
        router.back();
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(playlistName, selectedSongID);
        if (!playlistName || !selectedSongID || !selectedPlaylistImage) {
            if (!playlistName) {
                setSnackbarMessage("Please enter playlist name.");
                setOpenSnackbar(true);
            }
            if (!selectedSongID) {
                setSnackbarMessage("Please go to album or playlist page.");
                setOpenSnackbar(true);
            }
            if (!selectedPlaylistImage) {
                setSnackbarMessage("Please select an image.");
                setOpenSnackbar(true);
            }
            return;
        }
        return;             //----------This return will be removed once Post API start working.----------
        setLoading(true);
        let token;
        if (typeof window !== "undefined") {
            ({ token } = JSON.parse(localStorage.getItem("music-app-credentials")));
        }
        try {
            const body = {
                playlistName,
                selectedSongID,
                selectedPlaylistImage
            };
            let { data } = await api.post(`/api/create-new-playlist`, body, {
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
                    {language.title === "nl" ? "NULL" : "Create a New Playlist"}
                </title>
            </Head>
            <h1>
                {language.title === "nl"
                    ? "NULL"
                    : "Create a New Playlist"}
            </h1>
            <div>
                {selectedSongName !== null && (
                    <div>
                        <p>{`"${selectedSongName}" will be automatically added to the playlist.`}</p>
                    </div>
                )}
            </div>
            {loading && (
                <div className={classes.loading}>
                    <h1 style={{ fontSize: "2.5rem" }}>Loading...</h1>
                </div>
            )}
            {error && <h3 style={{ color: "red" }}>{error}</h3>}
            <div className={classes.input}>
                <div style={{ display: "flex", alignItems: "center" }}>

                    <div style={{ flex: 1, marginLeft: 0 }}>
                        <input
                            value={playlistName}
                            onChange={(e) => {
                                setPlaylistName(e.target.value);
                            }}
                            required
                            placeholder={
                                language.title === "nl"
                                    ? "NULL"
                                    : "Enter Playlist Name"
                            }
                        />
                    </div>
                </div>
            </div>
            <br />
            <label className="custom-file-upload" style={{ display: "block", width: "100%" }}>
                {selectedPlaylistImage ? <span>Change Image</span> : <span>Choose Image</span>}
                <input
                    key={changeImage}
                    type="file"
                    name="myImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                />
                <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            </label>
            <div>
                {croppedImageDataURL && (
                    <div>
                        <img alt="not found" width={"250px"} src={croppedImageDataURL} />
                        <br />
                    </div>
                )}
            </div>
            <div>
                <button>Submit Playlist</button>
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

export default CreateNewPlaylistPage;

