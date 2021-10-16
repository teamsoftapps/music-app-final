import React from "react";
import Card from "../../components/card/Card";
// import Banner from "./banner/Banner";
import classes from "./HomePage.module.css";
import { useSelector, shallowEqual } from "react-redux";

const postSelector = (state) => state.music;

const HomePage = ({ albums }) => {
    const { isDutch } = useSelector(postSelector, shallowEqual);

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
