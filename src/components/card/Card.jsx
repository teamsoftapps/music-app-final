import { Lock } from "@material-ui/icons";
import Alert from "@mui/material/Alert";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { forwardRef, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import classes from "./Card.module.css";
// import axios from "axios";
// import { setSongs, setSong } from "./../../store/musicReducer";

const postSelector = (state) => state.music;

const Card = forwardRef(
  (
    { subscriptionAlbum, album, url, index, trial, disableFetch, setLoading },
    ref
  ) => {
    // console.log("Card component >>>>>>>>");

    const route = useRouter();
    const { user } = useSelector(postSelector, shallowEqual);
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState(false);
    console.log("yahan aa rha ha ");

    // const [subscriptionAlbum, setSubscriptionAlbum] = useState(null);
    // const [albumName,setAlbumName]=useState(false)
    // const [liked, setLiked] = useState(false);
    // const [trial, setTrial] = useState(false)
    // const [loading, setLoading] = useState(false);

    let albumName = false;

    // const dispatch = useDispatch();
    // console.log(index, expiry)
    // console.log(album)
    // if (subscriptionAlbum){
    //   console.log("CARD-PAGE-ALBUM", subscriptionAlbum);
    // }

    subscriptionAlbum?.forEach((elem, index) => {
      if (album?.Album_Name === elem.album) {
        console.log("cardElem", elem,);
        albumName = true;
      }
    });

    function handleClick() {
      if (!user) {
        route.replace("/login");
        return;
      }

      if (disableFetch) return;

      setLoading(true);
      if (user?.hasOwnProperty("expiresIn")) {
        let uri = album?.Album_Name;
        let encoded = encodeURIComponent(uri);
        msg ? route.push(`/album/${encoded}`) : handleExpireAlert();
      } else {
        let uri = album?.Album_Name;
        let encoded = encodeURIComponent(uri);
        route.push(`/album/${encoded}`);
      }
    }

    const handleExpireAlert = () => {
      setError(true);

      setTimeout(() => {
        setError(false);
      }, 3000);
    };




    console.log("trial card", trial, albumName);

    return (
      <>
        <div
          ref={ref}
          className={classes.card}
          onClick={() => handleClick()}
          style={disableFetch && { cursor: "auto" }}
          disabled={(trial && index === 0) || !albumName}
        >
          {error && (
            <Alert className={classes.alert} severity="error">
              Not Available In Trial Period
            </Alert>
          )}

          {trial && index === 0 && (
            <span className={classes.locked}>
              <span>
                <Lock />
              </span>
            </span>
          )}

          {!albumName && (
            <span className={classes.locked}>
              <span>
                <Lock />
              </span>
            </span>
          )}

          {/* {trial && index !== 0 ? (
                <span className={classes.locked}>
                    <span>
                        <Lock />
                    </span>
                </span>
            ) : (
                <span className={classes.locked}>
                    <span style={{ marginTop: "4px" }}>
                        <FavoriteBorderIcon />
                    </span>
                </span>
            )} */}

          <div
            className={classes.cardImage}
            style={{ width: 280, height: 280 }}
          >
            <Image src={url} alt={url} width={280} height={280} />
          </div>
          <h3>{album?.Album_Name}</h3>
        </div>
      </>
    );
  }
);

Card.displayName = "Card";

export default React.memo(Card);
