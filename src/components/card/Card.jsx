import React from "react";
import classes from "./Card.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSongs, setSong } from "../../store/musicReducer";

const postSelector = (state) => state.music;
const Card = ({ album, url }) => {
    const { user } = useSelector(postSelector, shallowEqual);

    const route = useRouter();
    const dispatch = useDispatch();

    const handleClick = async () => {
        if (!user) {
            route.replace("/auth");
            return;
        }

        try {
            const { data } = await axios.get(`https://music-appps.herokuapp.com/api/songs/${album?._id}`);
            dispatch(setSongs(data));
            dispatch(setSong(data[0]));
            route.push("/album");
            console.log({ data });
        } catch (err) {
            console.log({ err });
        }
    };

    return (
        <div className={classes.card} onClick={handleClick}>
            <div className={classes.cardImage} style={{ width: 240, height: 280 }}>
                <Image src={url} alt="" width={240} height={280} />
            </div>
            <h3>{album?.Album_Name}</h3>
        </div>
    );
};

export default React.memo(Card);
