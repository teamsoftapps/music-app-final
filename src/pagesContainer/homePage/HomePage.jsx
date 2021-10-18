import React, { useEffect } from "react";
import Card from "../../components/card/Card";
// import Banner from "./banner/Banner";
import classes from "./HomePage.module.css";
import { useSelector, shallowEqual } from "react-redux";
import { useRouter } from "next/router";

const postSelector = (state) => state.music;

const HomePage = ({ albums }) => {
    const { isDutch } = useSelector(postSelector, shallowEqual);
    const route = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("music-app-credentials"));
        if (!user) route.replace("/signup");
    }, []);

    return (
        <div className={classes.homePage}>
            <div className={classes.cards}>
                {albums?.map((album, index) => (
                    <Card
                        key={index}
                        album={album}
                        url={`${process.env.media_url}/${!isDutch ? album?.Album_Image : album?.Album_Image.replace("eng", "nl")}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
