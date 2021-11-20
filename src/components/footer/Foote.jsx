import React, { useEffect } from "react";
import classes from "./Footer.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { setLanguageMode, setSong, setSongs, setUser } from "../../store/musicReducer";

const postSelector = (state) => state.music;
function Footer() {
    const { user, language } = useSelector(postSelector, shallowEqual);
    const router = useRouter();
    const dispatch = useDispatch();

    function handleLogout() {
        localStorage.removeItem("music-app-credentials");
        dispatch(setSong({}));
        dispatch(setSongs([]));
        dispatch(setUser(null));
        router.push(`/?lan=${language.title}`);
    }
    function handleLanguage(lan) {
        const { route } = router;
        router.push(`${route}?lang=${lan.title}`);
        dispatch(setLanguageMode(lan));
    }

    function handleHistory() {
        router.push(`/history/${user.email}`);
    }

    useEffect(() => {
        try {
            let langPath = router.asPath.slice(2).split("&");
            let path = langPath[langPath.length - 1].split("=");
            let lan = path[1];
            let attr = path[0].split("").reverse().join("").slice(0, 4).split("").reverse().join("");
            if (lan && attr === "lang") {
                if (lan === languages[0].title) {
                    handleLanguage(languages[0]);
                } else if (lan === languages[1].title) {
                    handleLanguage(languages[1]);
                }
            }
        } catch (e) {
            console.log(e, "- Footer");
        }
    }, []);

    return (
        <footer className={classes.footer}>
            <div className={classes.footerTop}>
                <Image priority src="/images/logo.svg" alt="" width={200} height={50} />
                <p>Copyright © 1992 - 2021 Miller Music</p>
                <nav className={classes.menu}>
                    <ol className={classes.languageWrapper}>
                        {languages.map((lan, index) => (
                            <li
                                key={index}
                                className={`${classes.menuItem} ${language.title === lan.title ? classes.activeLanguage : ""}`}
                                onClick={() => handleLanguage(lan)}
                            >
                                <Image priority alt="" src={`/images/${lan.src}`} width={50} height={33} />
                            </li>
                        ))}
                    </ol>
                    {user && (
                        <span className={classes.btnWrapper}>
                            <Button className={classes.logoutBtn} onClick={handleLogout}>
                                Logout
                            </Button>
                            <Button className={classes.logoutBtn} onClick={handleHistory}>
                                History
                            </Button>
                        </span>
                    )}
                </nav>
            </div>
            <p className={classes.footerBottom}>Copyright © 1992 - 2021 Miller Music</p>
        </footer>
    );
}

export default Footer;

const languages = [
    {
        title: "nl",
        src: "nl-2.jpg",
    },
    {
        title: "eng",
        src: "usa-2.jpg",
    },
];
