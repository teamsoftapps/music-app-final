import React, { forwardRef } from "react";
import classes from "./Card.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector, shallowEqual } from "react-redux";
// import axios from "axios";
// import { setSongs, setSong } from "../../store/musicReducer";

const postSelector = (state) => state.music;
const Card = forwardRef(({ album, url, disableFetch }, ref) => {
    const { user } = useSelector(postSelector, shallowEqual);

    const route = useRouter();
    // const dispatch = useDispatch();

    function handleClick() {
        if (!user) {
            route.replace("/login");
            return;
        }
        if (disableFetch) return;
        route.push(`/album/${album?.Album_Name.replaceAll(" ", "-")}`);

        // try {
        // const { data } = await axios.get(`${process.env.base_url}/songs/${album?.Album_Name}`);
        // dispatch(setSongs(data));
        // dispatch(setSong(data[0]));
        // route.push(`/album/${album?.Album_Name.replaceAll(" ", "-")}`);
        // } catch (err) {
        //     console.log({ err });
        // }
    }

    return (
        <div ref={ref} className={classes.card} onClick={handleClick} style={disableFetch && { cursor: "auto" }}>
            <div className={classes.cardImage} style={{ width: 280, height: 280 }}>
                <Image src={url} alt="" width={280} height={280} />
            </div>
            <h3>{album?.Album_Name}</h3>
        </div>
    );
});

export default React.memo(Card);
