import React, { useEffect } from "react";
import Head from "next/head";
import Header from "../components/header/Header";
import Footer from "../components/footer/Foote";
import classes from "./Layout.module.css";
import { setUser } from "../store/musicReducer";
import { useDispatch } from "react-redux";

const Layout = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("music-app-credentials"));
        dispatch(setUser(user));
    }, []);

    return (
        <>
            <Head>
                <title>Mulder Music Streaming</title>
                <meta name="description" content="Mulder Music Streaming." />
                {/* <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" /> */}
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={classes.layout}>
                <Header />
                <main className={classes.layoutMain}>{children}</main>
                <Footer />
            </div>
        </>
    );
};

export default Layout;
