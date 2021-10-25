import React from "react";
import classes from "./Footer.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { setLanguageMode } from "../../store/musicReducer";

const postSelector = (state) => state.music;
function Footer() {
    const { user, language } = useSelector(postSelector, shallowEqual);
    const router = useRouter();
    const dispatch = useDispatch();

    function handleLogout() {
        localStorage.removeItem("music-app-credentials");
        window.location.href = "/";
    }
    function handleLanguage(lan) {
        const { route } = router;
        router.push(`${route}?lang=${lan.title}`);
        dispatch(setLanguageMode(lan));
        console.log({ lan, language });
    }

    return (
        <footer className={classes.footer}>
            <div className={classes.footerTop}>
                <Image src="/images/logo.svg" alt="" width={200} height={50} />
                <p>Copyright © 1992 - 2021 Miller Music</p>
                <nav className={classes.menu}>
                    <ol>
                        <li className={classes.menuItem}>
                            <div className={classes.DropDown_Main}>
                                <Image alt="" src={`/images/${language.src.replace("-2", "")}`} width={50} height={33} />
                            </div>
                            <ol className={classes.subMenu}>
                                {languages.map((lan, index) => (
                                    <li key={index} className={classes.menuItem} onClick={() => handleLanguage(lan)}>
                                        <Image alt="" src={`/images/${lan.src}`} width={50} height={33} />
                                    </li>
                                ))}
                            </ol>
                        </li>
                    </ol>
                    {user && (
                        <Button className={classes.logoutBtn} onClick={handleLogout}>
                            Logout
                        </Button>
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
