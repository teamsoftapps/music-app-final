import React, { useEffect } from "react";
import Head from "next/head";
import Header from "../components/header/Header";
import Footer from "../components/footer/Foote";
import classes from "./Layout.module.css";
import { setUser } from "../store/musicReducer";
import { useDispatch } from "react-redux";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const Layout = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("music-app-credentials"));
        dispatch(setUser(user));
    }, []);

    return (
        <div>
            <Head>
                <title>Music App</title>
                <meta name="description" content="Music App." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={classes.layout}>
                <Header />
                <main className={classes.layoutMain}>{children}</main>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
