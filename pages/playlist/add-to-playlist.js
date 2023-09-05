import AddToPlaylistPage from "../../src/pagesContainer/addToPlaylistPage/AddToPlaylistPage";
import Footer from "./../../src/components/footer";

const playlistsOrderData = [
    {
        Playlist_Image: "/images/Icons-01.png",
        Playlist_Image_nl: "/images/Icons-01.png",
        Playlist_Name: "You Favourites",
        Singer_Name: "Mulder",
        Song_Desc: "Music performed by Ian Mulder & The London Symphony Orchestra.\n...",
        index: 1,
        __v: 0,
        _id: "61710878ef45b9107c721284"
    },
    {
        Playlist_Image: "/images/Icons-02.png",
        Playlist_Image_nl: "/images/Icons-02.png",
        Playlist_Name: "Inspirational Music",
        Singer_Name: "Mulder",
        Song_Desc: "Music performed by Ian Mulder & the London Symphony Orchestra\n...",
        index: 2,
        __v: 0,
        _id: "61710878ef45b9107c721286"
    },
    {
        Playlist_Image: "/images/Icons-03.png",
        Playlist_Image_nl: "/images/Icons-03.png",
        Playlist_Name: "Mulder's Original",
        Singer_Name: "Mulder",
        Song_Desc: "Music performed by Ian Mulder & the London Symphony Orchestra\n...",
        index: 2,
        __v: 0,
        _id: "61710878ef45b9107c721286"
    },
    {
        Playlist_Image: "/images/Icons-04.png",
        Playlist_Image_nl: "/images/Icons-04.png",
        Playlist_Name: "Calm/Studying Music",
        Singer_Name: "Mulder",
        Song_Desc: "Music performed by Ian Mulder & the London Symphony Orchestra\n...",
        index: 2,
        __v: 0,
        _id: "61710878ef45b9107c721286"
    },

    // ... Add more album objects here
];

const index = ({ playlistsOrder }) => {
    return (
        <>
            <AddToPlaylistPage playlistsOrder={playlistsOrderData} />
            {/* <Footer /> */}
        </>
    );
};

export default index;

// This code block will be used when API's start functioning

// export const getStaticPaths = async () => {
//     const { data } = await api.get(`/api/albums`);

//     const paths = data.map((curObj) => {
//         return {
//             params: {
//                 albumName: curObj.Album_Name.toString(),
//             },
//         };
//     });

//     return {
//         paths,
//         fallback: false,
//     };
// };

// export async function getStaticProps(context) {
//     const { albumName } = context.params;

//     const { data } = await api.get(`/api/songs/${albumName}`);

//     return {
//         props: {
//             songs: data[0],
//             album: data[1],
//         },
//         revalidate: 1800,
//     };
// }