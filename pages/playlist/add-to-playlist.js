import AddToPlaylistPage from "../../src/pagesContainer/addToPlaylistPage/AddToPlaylistPage";
import Footer from "./../../src/components/footer";
import { useState, useEffect } from "react";
import api from "./../../services/api";

// const playlistsOrderData = [
//   {
//     Playlist_Image: "/images/Icons-01.png",
//     Playlist_Image_nl: "/images/Icons-01.png",
//     Playlist_Name: "You Favourites",
//     Singer_Name: "Mulder",
//     Song_Desc:
//       "Music performed by Ian Mulder & The London Symphony Orchestra.\n...",
//     index: 1,
//     __v: 0,
//     _id: "61710878ef45b9107c721284",
//   },
//   {
//     Playlist_Image: "/images/Icons-02.png",
//     Playlist_Image_nl: "/images/Icons-02.png",
//     Playlist_Name: "Inspirational Music",
//     Singer_Name: "Mulder",
//     Song_Desc:
//       "Music performed by Ian Mulder & the London Symphony Orchestra\n...",
//     index: 2,
//     __v: 0,
//     _id: "61710878ef45b9107c721286",
//   },
//   {
//     Playlist_Image: "/images/Icons-03.png",
//     Playlist_Image_nl: "/images/Icons-03.png",
//     Playlist_Name: "Mulder's Original",
//     Singer_Name: "Mulder",
//     Song_Desc:
//       "Music performed by Ian Mulder & the London Symphony Orchestra\n...",
//     index: 2,
//     __v: 0,
//     _id: "61710878ef45b9107c721286",
//   },
//   {
//     Playlist_Image: "/images/Icons-04.png",
//     Playlist_Image_nl: "/images/Icons-04.png",
//     Playlist_Name: "Calm/Studying Music",
//     Singer_Name: "Mulder",
//     Song_Desc:
//       "Music performed by Ian Mulder & the London Symphony Orchestra\n...",
//     index: 2,
//     __v: 0,
//     _id: "61710878ef45b9107c721286",
//   },

//   // ... Add more album objects here
// ];

const index = () => {
  const [fetchedPlaylists, setFetchedPlaylists] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  let userPlaylists;

  const fetchPlaylists = async () => {
    try {
      let token;

      if (typeof window !== "undefined") {
        token = JSON.parse(localStorage.getItem("music-app-credentials"));
      }
     

      const { data } = await api.get(`/api/playlists`, {
        // step 1
        headers: {
          authorization: `Bearer ${token?.token}`,
        },
      });
      userPlaylists = data.result?.filter(
        (playlist) => playlist?.Is_Created_By_Admin === false
      );
      setFetchedPlaylists(userPlaylists);
      console.log(userPlaylists, "user playlists");
      setIsFetching(true);
      console.log(data, "fetched playlists ");
    } catch (err) {
      console.log(err, "error");
    }
  };
  useEffect(() => {
    console.log(
      localStorage.getItem("music-app-credentials"),
      "user credintials"
    );
    fetchPlaylists();
  }, []);

  if (!isFetching) {
    return null;
  }

  return (
    <>
      <AddToPlaylistPage playlistsOrder={fetchedPlaylists} />
    </>
  );
};

export default index;

