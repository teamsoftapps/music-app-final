import React from "react";
import Card from "../../components/card/Card";
import classes from "./HomePage.module.css";
import { useSelector, shallowEqual } from "react-redux";

const postSelector = (state) => state.music;

const HomePage = ({ albums }) => {
    const { language, user } = useSelector(postSelector, shallowEqual);

    return (
        <div className={classes.homePage}>
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
        </div>
    );
};

export default HomePage;
// (abbreviation LD = Love Divine): LD 7, LD 6, The Omnipotent, LD 5, Ocean of Dreams 2, LD 4, LD 3, LD 2, Christmas, LD 1, The Piano Dreamer, Ian Mulder's favourite Hymns, Sounds of Silence, Ian Mulder in Concert, Coming to America, Ocean of Dreams, Grandezza, Ecossaise 2, Ecossaise 1.
