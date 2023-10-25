import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FlipMove from "react-flip-move";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import downarrow from "./../../../public/images/downarrownew.png";
import uparrow from "./../../../public/images/uparrownew.png";
import api from "./../../../services/api";
import Advertisement from "./../../components/advertisment/Advertisment";
import Card from "./../../components/card/Card";
import Footer from "./../../components/footer";
import { setFavourites } from "./../../store/musicReducer";
import classes from "./HomePage.module.css";
import PlaylistCard from "../../components/playlistCard/PlaylistCard";
import axios from "axios";

// / ye ha home page

const postSelector = (state) => state.music;

// const HomePage = ({ albums,playlists }) => {
const HomePage = ({ albums, playlists }) => {
  // console.log("playlists from index ", playlists)
  const [fetchedPlaylists, setFetchedPlaylists] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  // added function

  const fetchPlaylists = async () => {
    try {
      // const playlistid = localStorage.getItem('playlistid');

      // console.log(playlistid, "fetched from local steroage")
      let token;
      // console.log("idhar aya")
      if (typeof window !== "undefined") {
        token = JSON.parse(localStorage.getItem("music-app-credentials"));
      }
      // todo abhi hard quoted
      // const {data} = await api.get("/api/playlists/635bd8fdcb397b3a044d9867", {    // step 1
      // const {data} = await api.get(`/api/playlists/`, {    // step 1
      // const {data} = await api.get(`/api/playlists/${user.subscriptionID}`, {    // step 1
      // const {data} = await api.get(`/api/playlists/64dfabdf0f5eba1e101b3d00}`, {    // step 1
      const { data } = await api.get(`/api/playlists`, {
        // step 1
        headers: {
          authorization: `Bearer ${token?.token}`,
        },
      });
      setFetchedPlaylists(data);
      setIsFetching(true);
      console.log(data, " fetched playlists from homepage");
    } catch (err) {
      console.log(err, "error in fetching");
    }
  };

  useEffect(() => {
    console.log(
      localStorage.getItem("music-app-credentials"),
      " user credintials  "
    );
    fetchPlaylists();
  }, []);

  // console.log(process.env.base_url, "base url ")

  const playlistsOrder = [
    {
      Playlist_Image: "/images/Icons-01.png",
      Playlist_Image_nl: "/images/Icons-01.png",
      Playlist_Name: "You Favourites",
      Singer_Name: "Mulder",
      Song_Desc:
        "Music performed by Ian Mulder & The London Symphony Orchestra.\n...",
      index: 1,
      __v: 0,
      _id: "61710878ef45b9107c721284",
    },
    {
      Playlist_Image: "/images/Icons-02.png",
      Playlist_Image_nl: "/images/Icons-02.png",
      Playlist_Name: "Inspirational Music",
      Singer_Name: "Mulder",
      Song_Desc:
        "Music performed by Ian Mulder & the London Symphony Orchestra\n...",
      index: 2,
      __v: 0,
      _id: "61710878ef45b9107c721286",
    },
    {
      Playlist_Image: "/images/Icons-03.png",
      Playlist_Image_nl: "/images/Icons-03.png",
      Playlist_Name: "Mulder's Original",
      Singer_Name: "Mulder",
      Song_Desc:
        "Music performed by Ian Mulder & the London Symphony Orchestra\n...",
      index: 2,
      __v: 0,
      _id: "61710878ef45b9107c721286",
    },
    {
      Playlist_Image: "/images/Icons-04.png",
      Playlist_Image_nl: "/images/Icons-04.png",
      Playlist_Name: "Calm/Studying Music",
      Singer_Name: "Mulder",
      Song_Desc:
        "Music performed by Ian Mulder & the London Symphony Orchestra\n...",
      index: 2,
      __v: 0,
      _id: "61710878ef45b9107c721286",
    },

    // ... Add more album objects here
  ];

  const route = useRouter();

  const { language, user } = useSelector(postSelector, shallowEqual);

  const dispatch = useDispatch();

  const [openAdd, setOpenAdd] = useState(false);
  const [albumsOrder, setAlbumsOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [subsData, setSubsData] = useState(null);
  const [subscriptionAlbum, setSubscriptionAlbum] = useState(null);

  let albumArray = [];
  // let playlistsArray =[]

  albums?.forEach((element) => {
    // console.log(element)
    let { index } = element;
    albumArray[index - 1] = element;
  });

  // playlists?.forEach((element) => {
  //   // console.log(element)
  //   let { index } = element;
  //   playlistsArray[index - 1] = element;
  // });

  // console.log(albumArray)

  const fetchSubscription = async () => {
    try {
      const { data } = await api.get(
        `/admin/subscriptions/${user.subscriptionID}`
      );

      if (data) {
        setSubsData(data);

        localStorage.setItem(
          "subscriptionSongDetails",
          JSON.stringify(data?.data?.subscription?.songDetail)
        );

        setSubscriptionAlbum(data?.data?.subscription?.songDetail);
      }
    } catch (err) {
      console.error(
        "err?.response?.data?.message >>>>>>>>>>",
        err?.response?.data?.message
      );

      // setError("error");

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const fetchFavourites = async () => {
    try {
      let token;

      if (typeof window !== "undefined") {
        // Perform localStorage action
        // ({ token } = JSON.parse(localStorage.getItem("music-app-credentials")));
        token = JSON.parse(localStorage.getItem("music-app-credentials"));
      }
      // get favourates
      const { data } = await api.get(`/api/getFavourites`, {
        headers: {
          authorization: `Bearer ${token?.token}`,
        },
      });

      // tempArr.push(data?.favourites)

      dispatch(setFavourites(data?.favourites));

      console.log("Get favourites: ", data);
    } catch (err) {
      console.error("err?.response?.data >>>>>>>>>>", err?.response?.data);

      setError(err?.response?.data);

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  console.log("user", user);

  useEffect(() => {
    let abortController = new AbortController();

    if (!user) {
      route.replace("/login");
    } else {
      fetchSubscription();
      fetchFavourites();
    }

    return () => {
      abortController.abort();
    };
  }, [user]);

  const handleAdd = () => {
    if (!openAdd) {
      setOpenAdd(true);
    } else {
      setOpenAdd(false);
    }
    // console.log(openAdd);
  };

  let theOrder = [];

  albumArray.map((data, ind) => {
    //  console.log(data.index)
    // ind=ind+1;
    // console.log(ind)
    // if(data.index===ind){
    //   for(let i=0; i<=data.length;i++){
    //     // theOrder[i]=data;
    //     theOrder.push(data)
    //     // console.log(data)
    //   }
    //   console.log(theOrder);
    // }
    if (data.Album_Name === "Love Divine 1") {
      theOrder[0] = data;
      console.log("Get album: ", data);
    }
    if (data.Album_Name === "Love Divine 2") {
      theOrder[1] = data;
    }
    if (data.Album_Name === "Love Divine 3") {
      theOrder[2] = data;
    }
    if (data.Album_Name === "Love Divine 4") {
      theOrder[3] = data;
    }
    if (data.Album_Name === "Love Divine 5") {
      theOrder[4] = data;
    }
    if (data.Album_Name === "Love Divine 6") {
      theOrder[5] = data;
    }
    if (data.Album_Name === "Love Divine 7") {
      theOrder[6] = data;
    }
    if (data.Album_Name === "Christmas") {
      theOrder[7] = data;
    }
    if (data.Album_Name === "Ecossaise Christmas") {
      theOrder[8] = data;
    }
    if (data.Album_Name === "Ian Mulder's Favourite Hymns") {
      theOrder[9] = data;
    }
    if (data.Album_Name === "The Omnipotent") {
      theOrder[10] = data;
    }
    if (data.Album_Name === "Ocean of Dreams 2") {
      theOrder[11] = data;
    }
    if (data.Album_Name === "The Piano Dreamer") {
      theOrder[12] = data;
    }
    if (data.Album_Name === "Sounds of Silence") {
      theOrder[13] = data;
    }
    if (data.Album_Name === "Ocean of Dreams") {
      theOrder[14] = data;
    }
    if (data.Album_Name === "Grandezza") {
      theOrder[15] = data;
    }
    if (data.Album_Name === "Ian Mulder in Concert") {
      theOrder[16] = data;
    }
    if (data.Album_Name === "Ecossaise 2") {
      theOrder[17] = data;
    }
    if (data.Album_Name === "Ecossaise 1") {
      theOrder[18] = data;
    }
    if (data.Album_Name === "Coming to America") {
      theOrder[19] = data;
    }
  });

  // console.log(albumsOrder)

  useEffect(() => {
    setAlbumsOrder(theOrder);
  }, []);

  console.log("albumsOrder >>>>>>>>>", albumsOrder);

  return (
    <div className={classes.homePage}>
      {/* {loading && <h3>Loading..</h3>} */}

      {/* {error && <h3 style={{ color: "red" }}>{error}</h3>} */}

      <br />
      <h4 style={{ color: "white", textAlign: "center" }}>
        {language.title === "nl" ? "STREAMEN" : "STREAMING"}
      </h4>
      {/* Code for Advertisement (start) */}

      <div className={classes.addcontainer}>
        <div className={classes.addcontainerInner}>
          <h3 className={classes.addheading} onClick={() => handleAdd()}>
            Exclusive Video
          </h3>

          {!openAdd ? (
            <div>
              <Image
                src={downarrow}
                width={16}
                height={16}
                className={classes.arrows}
                onClick={() => handleAdd()}
              />
            </div>
          ) : (
            <div>
              <Image
                src={uparrow}
                width={16}
                height={16}
                className={classes.arrows}
                onClick={() => handleAdd()}
              />
            </div>
          )}
        </div>
        {openAdd && (
          <div className={classes.addwrapper}>
            <Advertisement />
          </div>
        )}
      </div>

      <hr className={classes.separationLine}></hr>

      {/* Playlist card addition */}

      <div className={classes.playlistsMain}>
        <div className={classes.homePagePlaylistsText}>
          <p>
            <b>Playlists</b>
          </p>
        </div>
        {/* <FlipMove className={classes.cards}> */}
        <div className={classes.playlistsList}>
          {fetchedPlaylists?.result?.length > 0 &&
            fetchedPlaylists?.result?.map((playlist, index) => {
              // {playlists.result?.length > 0 &&
              //   playlists.result?.map((playlist, index) => {
              {
                /* {playlistsOrder?.length > 0 &&
            playlistsOrder?.map((playlist, index) => { */
              }
              const url = playlist?.Playlist_Image; // Temporary
              // const url = `${process.env.media_url}/${language.title === "eng" ? playlist?.Playlist_Image : playlist?.Playlist_Image.replace("eng", "nl") }`;
              //  console.log(playlist._id, "isko redux mn daalo")

              return (
                <PlaylistCard
                  songs={playlist?.songs}
                  playlist_id={playlist._id}
                  // key={playlist?._id + language.title}
                  key={playlist?._id}
                  playlist={playlist}
                  // url={`${apiUrl}/${url}`}
                  url={url}
                  index={index}
                  trial={user?.hasOwnProperty("expiresIn")}
                  // user={user}
                  setLoading={setLoading}
                  subscriptionAlbum={subscriptionAlbum} // No subscription playlist currently available so this code is not changed
                />
              );
            })}
        </div>
      </div>

      {/* Playlist card addition */}

      {/* <div className={classes.playlistsMain}>
        <div className={classes.homePagePlaylistsText} >
          <p><b>Playlists</b></p>
        </div>
        <div className={classes.playlistsList}>
          <div className={classes.playlistBoxes} onClick={() => route.push(`/playlist/yourfavourites`)}>
            <div className={classes.playlistItem} >
              <div className={classes.playlistItemImage} style={{
                transformOrigin: 'center center',
                transition: 'transform 1.5s ease',
              }}
                onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
                onMouseLeave={(e) => (e.target.style.transform = 'scale(1) ')}
              ><Image priority src="/images/Icons-01.png" alt="" width={70} height={70} /></div>
              <div className={classes.playlistItemText} >Your Favourites</div>
            </div>
          </div>
          <div className={classes.playlistBoxes}>
            <div className={classes.playlistItem}>
              <div className={classes.playlistItemImage}><Image priority src="/images/Icons-02.png" alt="" width={70} height={70} /></div>
              <div className={classes.playlistItemText}>Inspirational Music</div>
            </div>
          </div>
          <div className={classes.playlistBoxes}>
            <div className={classes.playlistItem}>
              <div className={classes.playlistItemImage}><Image priority src="/images/Icons-03.png" alt="" width={70} height={70} /></div>
              <div className={classes.playlistItemText}>Mulder's Originals</div>
            </div>
          </div>
          <div className={classes.playlistBoxes}>
            <div className={classes.playlistItem}>
              <div className={classes.playlistItemImage}><Image priority src="/images/Icons-04.png" alt="" width={70} height={70} /></div>
              <div className={classes.playlistItemText}>Calm/Studying Music</div>
            </div>
          </div>
        </div>
      </div> */}
      <hr className={classes.separationLine}></hr>

      {/* Code for Advertisement (end) */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          right: "44vw",
          left: "44vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 100,
        }}
      >
        {/* <ClipLoader color="red" loading={loading} size={"10vw"} /> */}
        {loading && (
          <div className={classes.loading}>
            <h1 style={{ fontSize: "2.5rem" }}>Loading...</h1>
          </div>
        )}
      </div>

      <FlipMove className={classes.cards}>
        {albumsOrder?.length > 0 &&
          albumsOrder?.map((album, index) => {
            const url = `${process.env.media_url}/${
              language.title === "eng"
                ? album?.Album_Image
                : album?.Album_Image.replace("eng", "nl")
            }`;

            if (!isFetching) {
              return null;
            }

            return (
              <Card
                // key={album?._id + language.title}
                key={album?._id + album?.Album_Name}
                album={album}
                url={url}
                index={index}
                trial={user?.hasOwnProperty("expiresIn")}
                setLoading={setLoading}
                subscriptionAlbum={subscriptionAlbum}
              />
            );
          })}
      </FlipMove>

      {/* *********** MY WORK ************* */}
      {/* <FlipMove className={classes.cards}>
        {albumsOrder.length > 0 && (
          <Card
            albumsOrder={albumsOrder}
            setLoading={setLoading}
            trial={user?.hasOwnProperty("expiresIn")}
          />
        )}
      </FlipMove> */}

      {/* https://githubmemory.com/repo/joshwcomeau/react-flip-move/issues/256 */}
      {/* Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. */}
      <Footer />
    </div>
  );
};

export default HomePage;
