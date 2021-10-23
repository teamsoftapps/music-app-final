import React from "react";
import Card from "../../components/card/Card";
import classes from "./HomePage.module.css";
import { useSelector, shallowEqual } from "react-redux";
import Footer from "../../components/footer/Foote";

const postSelector = (state) => state.music;

const HomePage = ({ albums }) => {
    const { language } = useSelector(postSelector, shallowEqual);

    return (
        <div className={classes.homePage}>
            <h4 style={{ color: "white", textAlign: "center" }}>STREAMING</h4>
            <div className={classes.cards}>
                {albums?.map((album, index) => (
                    <Card
                        key={index}
                        album={album}
                        url={`${process.env.media_url}/${
                            language.title === "eng" ? album?.Album_Image : album?.Album_Image.replace("eng", "nl")
                        }`}
                    />
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
