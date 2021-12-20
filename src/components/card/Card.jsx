import React, { forwardRef, useEffect, useState } from "react";
import classes from "./Card.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector, shallowEqual } from "react-redux";
import Alert from '@mui/material/Alert';
import { Lock } from "@material-ui/icons";

// import axios from "axios";
// import { setSongs, setSong } from "../../store/musicReducer";

const postSelector = (state) => state.music;
const Card = forwardRef(({ album, url, index, trial, disableFetch }, ref) => {

    const [error, setError] = useState(false)
    const { user } = useSelector(postSelector, shallowEqual);
    // const [trial, setTrial] = useState(false)
    const route = useRouter();

    // const dispatch = useDispatch();
    // console.log(index, expiry)



    function handleClick() {

        if (!user) {
            route.replace("/login");
            return;
        }
        if (disableFetch) return;
        if (user?.hasOwnProperty('expiresIn')) {

            index === 0 ? route.push(`/album/${album?.Album_Name.replaceAll(" ", "-")}`) : handleExpireAlert()
        } else {

            route.push(`/album/${album?.Album_Name.replaceAll(" ", "-")}`);
        }

        // try {
        // const { data } = await axios.get(`${process.env.base_url}/songs/${album?.Album_Name}`);
        // dispatch(setSongs(data));
        // dispatch(setSong(data[0]));
        // route.push(`/album/${album?.Album_Name.replaceAll(" ", "-")}`);
        // } catch (err) {
        //     console.log({ err });
        // }
    }

    const handleExpireAlert = () => {
        setError(true)
        setTimeout(() => {
            setError(false);
        }, 2000);
    }




    return (
        <div ref={ref} className={classes.card} onClick={handleClick} style={disableFetch && { cursor: "auto" }} >
            {error && <Alert className={classes.alert} severity="error">Not Available In Trial Period</Alert>}
            {trial && index !== 0 && <span className={classes.locked}>
                <span>

                    <Lock />
                </span>
            </span>}

            <div className={classes.cardImage} style={{ width: 280, height: 280 }}>
                <Image src={url} alt="" width={280} height={280} />
            </div>
            <h3>{album?.Album_Name}</h3>
        </div>
    );
});

export default React.memo(Card);
