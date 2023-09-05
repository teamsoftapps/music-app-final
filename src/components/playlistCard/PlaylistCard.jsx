import { Lock } from "@material-ui/icons";
import Alert from "@mui/material/Alert";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { forwardRef, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import classes from "./PlaylistCard.module.css";

const postSelector = (state) => state.music;

const PlaylistCard = forwardRef(
    (
        { subscriptionAlbum, playlist, url, index, trial, disableFetch, setLoading },
        ref
    ) => {
        // console.log("PlaylistCard component >>>>>>>>");

        const route = useRouter();
        const { user } = useSelector(postSelector, shallowEqual);
        const [error, setError] = useState(false);
        const [msg, setMsg] = useState(false);

        // let playlistName = false;
        let playlistName = true;

        // subscriptionAlbum?.forEach((elem, index) => {    // No subscription playlist currently available
        //     if (album?.Album_Name === elem.album) {
        //         albumName = true;
        //     }
        // });

        function handleClick(playlistName) {
            if (!user) {
                route.replace("/login");
                return;
            }
            if (disableFetch) return;
            setLoading(true);
            if (user?.hasOwnProperty("expiresIn")) {
                msg ? route.push(`/playlist/${playlist?.Playlist_Name}`) : handleExpireAlert();
            } else {
                route.push(`/playlist/${playlist?.Playlist_Name}`);
            }
        }

        const handleExpireAlert = () => {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 3000);
        };

        return (
            <>
                <div className={classes.playlistBoxes}
                    onClick={() => handleClick(playlist?.Playlist_Name)}
                    // onClick={() => route.push(`/playlist/yourfavourites`)}
                    style={disableFetch && { cursor: "auto" }}
                    ref={ref}
                    disabled={(trial && index === 0) || !playlistName}>
                    {error && (
                        <Alert className={classes.alert} severity="error">
                            Not Available In Trial Period
                        </Alert>
                    )}
                    <div className={classes.playlistItem}>
                        <div
                            className={classes.playlistItemImage}
                            style={{
                                transformOrigin: 'center center',
                                transition: 'transform 1.5s ease',
                                position: 'relative', // Add this line
                            }}
                            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
                            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                        >
                            <Image priority src={playlist?.Playlist_Image} alt="" width={70} height={70} />
                            {(trial || !playlistName) && ( // Combine conditions
                                <span className={classes.locked}>
                                    <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                        <Lock />
                                    </span>
                                </span>
                            )}
                        </div>
                        <div className={classes.playlistItemText}>{playlist?.Playlist_Name}</div>
                    </div>
                </div>

                {/* <div
                    ref={ref}
                    className={classes.card}
                    onClick={() => handleClick(playlist?.Playlist_Name)}
                    style={disableFetch && { cursor: "auto" }}
                    disabled={(trial && index === 0) || !playlistName}
                >
                    {error && (
                        <Alert className={classes.alert} severity="error">
                            Not Available In Trial Period
                        </Alert>
                    )}

                    {trial && index === 0 && (
                        <span className={classes.locked}>
                            <span>
                                <Lock />
                            </span>
                        </span>
                    )}

                    {!playlistName && (
                        <span className={classes.locked}>
                            <span>
                                <Lock />
                            </span>
                        </span>
                    )}

                    <div
                        className={classes.cardImage}
                        style={{ width: 70, height: 70 }}
                    >
                        <Image src={url} alt={url} width={70} height={70} />
                    </div>
                    <h3>{playlist?.Playlist_Name}</h3>
                </div> */}
            </>
        );
    }
);

PlaylistCard.displayName = "PlaylistCard";

export default React.memo(PlaylistCard);
