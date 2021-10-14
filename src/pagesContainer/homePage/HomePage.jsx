import React from "react";
import Card from "../../components/card/Card";
// import Banner from "./banner/Banner";
import classes from "./HomePage.module.css";

const HomePage = ({ albums }) => {
    return (
        <div className={classes.homePage}>
            {/* <Banner /> */}
            <div className={classes.cards}>
                {albums?.map((album, index) => {
                    console.log(album?.Album_Image);
                    return <Card key={index} album={album} url={`https://music-appps.herokuapp.com/${album?.Album_Image}`} />;
                })}
            </div>
        </div>
    );
};

export default HomePage;
