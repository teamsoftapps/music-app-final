import React, { useEffect, useState } from "react";
import classes from "./HistoryPage.module.css";
import { useRouter } from "next/router";
import Head from "next/head";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { MusicNote } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

const postSelector = (state) => state.music;

function HistoryPage({ history, userEmail }) {
    const { user } = useSelector(postSelector, shallowEqual);
    const route = useRouter();

    const convertTime = (d) => {
        return new Date(d).toLocaleString();
    };

    // const redirectMe = () => {
    //     route.push(`/`);
    // };

    return (
        <div className={classes.albums}>
            <Head>
                <title>History</title>
                <meta name="description" content="history" />
            </Head>
            <br />
            <h4 style={{ color: "white", textAlign: "center" }}>LAST 20 PLAYED SONGS</h4>
            <h1>History</h1>
            <div className={classes.tabWrapper}>
                {user?.email === userEmail ? (
                    history ? (
                        history.map((item, index) => {
                            return (
                                <div
                                    className={`${classes.musicTrack}`}
                                    key={index}
                                    onClick={() => {
                                        route.push(`/album/${item.albumName.replaceAll(" ", "-")}`);
                                    }}
                                >
                                    <div className={classes.musicTrackLeft}>
                                        <IconButton className={classes.songTune}>
                                            <MusicNote />
                                        </IconButton>
                                        <span className={classes.nameWrapper}>
                                            <h4>{item.songName}</h4>
                                            <p className={classes.nameP}>{item.albumName}</p>
                                        </span>
                                    </div>
                                    <div className={classes.musicTrackRight}>
                                        <h3>{convertTime(item.createdAt)}</h3>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <h4 style={{ color: "grey", textAlign: "center" }}>Loading...</h4>
                    )
                ) : (
                    <h4 style={{ color: "grey", textAlign: "center" }}>Loading...</h4>
                )}
            </div>
        </div>
    );
}
// Nothing

export default React.memo(HistoryPage);