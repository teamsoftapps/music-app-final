import PlaylistPage from "../../src/pagesContainer/playlistPage/PlaylistPage";
import api from "../../services/api";


const songsData = [
    {
        Playlist_Image: "images/LoveDivine-eng.jpg",
        Playlist_Name: "Your Favourites",
        Playlist_id: "61710878ef45b9107c721284",
        Song_File: "audio/02 As The Deer Pants - 2. Air.mp3",
        Song_Length: "1:10",
        Song_Lyrics: "As the deer pants for the water,\r\nSo my soul longs after You.\r\nYou alone are my heart's desire\r\nAnd I long to worship You.\r\nYou alone are my strength, my shield,\r\nTo You alone may my spirit yield.\r\nYou alone are my heart's desire\r\nAnd I long to worship You.",
        Song_Name: "As The Deer Pants - 2. Air",
        __v: 0,
        _id: "6173bee440ebae07109d983a"
    },
    {
        Playlist_Image: "images/LoveDivine-eng.jpg",
        Playlist_Name: "Your Favourites",
        Playlist_id: "61710878ef45b9107c721284",
        Song_File: "audio/01 As The Deer Pants - 1. Prelude.mp3",
        Song_Length: "2:30",
        Song_Lyrics: "As the deer pants for the water,\r\nSo my soul longs after You.\r\nYou alone are my heart's desire\r\nAnd I long to worship You.\r\nYou alone are my strength, my shield,\r\nTo You alone may my spirit yield.\r\nYou alone are my heart's desire\r\nAnd I long to worship You.",
        Song_Name: "As The Deer Pants - 1. Prelude",
        __v: 0,
        _id: "6173bee440ebae07109d9839",
    },
    {
        Playlist_Image: "images/LoveDivine-eng.jpg",
        Playlist_Name: "Your Favourites",
        Playlist_id: "61710878ef45b9107c721284",
        Song_File: "audio/14 Deep Love.mp3",
        Song_Length: "5:40",
        Song_Lyrics: "O the deep, deep love of Jesus!\r\nSpread His praise from shore to shore,\r\nHow His love is never-ending,\r\nAnd it changes nevermore;\r\nHow He watches o’er His loved ones,\r\nDied to call them all His own;\r\nHow for them He’s interceding,\r\nWatching o’er them from the throne.\r\nO the deep, deep love of Jesus!\r\nLove of ev’ry love the best:\r\n‘tIs an ocean vast of blessing,\r\n‘tIs a haven sweet of rest.\r\nO the deep, deep love of Jesus!\r\n‘tIs a heav’n of heav’ns to me;\r\nAnd it lifts me up to glory,\r\nWith You evermore to be.",
        Song_Name: "Deep Love",
        __v: 0,
        _id: "6173bee440ebae07109d9846",
    },
];

const playlistData = [
    {
        Playlist_Image: "images/LoveDivine-eng.jpg",
        Playlist_Image_nl: "images/LoveDivine-nl.jpg",
        Playlist_Name: "Your Favourites",
        Singer_Name: "Mulder",
        Song_Desc: "Music performed by Ian Mulder & The London Symphony Orchestra.\nLeader and solo violin: Gordan Nikolitch.\n\nOrchestrations by Jorge Calandrelli, Frédéric Dunis, and Ian Mulder.\n\nRecorded at Lyndhurst Hall, Air Studios, London by Geoff Foster.\nAssistant Engineer: John Prestage.\nRecording console: 96 channel Neve 88R.\n\nMixed at Air Studios, London by Geoff Foster.\nAssistant Engineer: John Prestage.\nMixing console Studio 2: 80 channel SSL 8000G.\n\nIan Mulder plays a Steinway & Sons model D, concert grand piano at Lyndhurst Hall, London.\nIan Mulder is dressed by Tip de Bruin, Amsterdam, NL.\nCover Photography Ely Cathedral: Martin Black, Ely, UK. www.MartinBlack.com.\n\nSheet Music available at: www.LoveDivineCD.com.\n",
        index: 1,
        __v: 0,
        _id: "61710878ef45b9107c721284"
    }
];



const index = ({ songs, playlist }) => {
    return <PlaylistPage songs={songsData} playlist={playlistData} />;
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


