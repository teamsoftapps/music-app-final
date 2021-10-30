import React from "react";
import Card from "../../components/card/Card";
import classes from "./HomePage.module.css";
import { useSelector, shallowEqual } from "react-redux";
import Footer from "../../components/footer/Foote";
import FlipMove from "react-flip-move";

const postSelector = (state) => state.music;

const HomePage = ({ albums }) => {
    const { language } = useSelector(postSelector, shallowEqual);

    return (
        <div className={classes.homePage}>
            <br />
            <h4 style={{ color: "white", textAlign: "center" }}>STREAMING</h4>
            <FlipMove className={classes.cards}>
                {albums?.map((album) => {
                    const url = `${process.env.media_url}/${
                        language.title === "eng" ? album?.Album_Image : album?.Album_Image.replace("eng", "nl")
                    }`;

                    return <Card key={album?._id + language.title} album={album} url={url} />;
                })}
            </FlipMove>
            <Footer />
        </div>
    );
};

export default HomePage;
