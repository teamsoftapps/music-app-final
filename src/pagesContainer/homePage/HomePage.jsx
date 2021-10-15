import React from "react";
import Card from "../../components/card/Card";
// import Banner from "./banner/Banner";
import classes from "./HomePage.module.css";

const HomePage = ({ albums }) => {
    return (
        <div className={classes.homePage}>
            <div className={classes.cards}>
                {albums?.map((album, index) => (
                    <Card key={index} album={album} url={`${process.env.media_url}/${album?.Album_Image}`} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
