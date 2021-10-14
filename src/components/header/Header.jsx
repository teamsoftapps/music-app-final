import React, { useEffect } from "react";
import classes from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { Button, IconButton } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { useSelector, shallowEqual } from "react-redux";
import { useRouter } from "next/router";

const postSelector = (state) => state.music;

const Header = () => {
    const { user } = useSelector(postSelector, shallowEqual);

    const handleLogout = () => {
        localStorage.removeItem("music-app-credentials");
        window.location.href = "/";
    };

    return (
        <header className={classes.header}>
            <div className={classes.headerTop}>
                <div className={classes.search}>
                    <IconButton>
                        <Search />
                    </IconButton>
                    <input type="text" placeholder="Search for the songs, albums etc.." />
                </div>
                <div className={classes.headerActions}>
                    <IconButton>
                        <Image src="/images/notification.svg" alt="" width={20} height={20} />
                    </IconButton>
                    <IconButton>
                        <Image src="/images/bell.svg" alt="" width={20} height={20} />
                    </IconButton>
                    {user && (
                        <Button variant="contained" onClick={handleLogout}>
                            Logout
                        </Button>
                    )}
                </div>
            </div>
            <div className={classes.headerMain}>
                <div className={classes.headerMainImage}>
                    <Image src="/images/logo.svg" alt="" width={750} height={250} layout="intrinsic" />
                </div>
                <nav className={classes.headerNavigation}>
                    <ul>
                        {nav.map(({ route, title }, i) =>
                            user && title === "LOGIN" ? null : (
                                <li key={i}>
                                    <Link href={route}>{title}</Link>
                                </li>
                            ),
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;

const nav = [
    {
        title: "HOME",
        route: "/",
    },
    {
        title: "CD STORE",
        route: "/",
    },
    {
        title: "SHEET MUSIC",
        route: "/",
    },
    {
        title: "BIOGRAPHY",
        route: "/",
    },
    {
        title: "NEW & EVENTS",
        route: "/",
    },
    {
        title: "GUESTBOOK",
        route: "/",
    },
    {
        title: "LOGIN",
        route: "/auth",
    },
];
