import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    language: {
        title: "eng",
        src: "usa-2.jpg",
    },
    user: null,
    songs: [],
    song: {},
    isPlaying: false,
    playlist: {},
    favourites: null,
    favouriteId: null,
    tokenObj: null,
    playlistid:null
};

export const counterSlice = createSlice({
    name: "playlists",
    initialState,
    reducers: {
        setPlaylistId: (state, { payload }) => {
            state.playlistid = payload;
        },
        // language Mode
        setLanguageMode: (state, { payload }) => {
            state.language = payload;
        },

        // authentication
        setUser: (state, { payload }) => {
            state.user = payload;
        },

        // Songs configuration
        setSongs: (state, { payload }) => {
            state.songs = payload;
        },

        // Song configuration
        setSong: (state, { payload }) => {
            state.song = payload;
        },
        setIsPlaying: (state, { payload }) => {
            state.isPlaying = payload;
        },
        setPreviousSong: (state, { payload }) => {
            const currentIndex = state.songs.findIndex(
                (song) => song._id === payload._id
            );
            if (currentIndex <= 0) return;
            state.song = state.songs[currentIndex - 1];
        },
        setNextSong: (state, { payload }) => {
            const currentIndex = state.songs.findIndex(
                (song) => song._id === payload._id
            );
            if (currentIndex < 0 || currentIndex === state.songs.length - 1) return;
            state.song = state.songs[currentIndex + 1];
        },
        setPlaylist: (state, { payload }) => {
            state.album = payload;
        },
        setFavourites: (state, { payload }) => {
            state.favourites = payload;
        },
        setFavouriteId: (state, { payload }) => {
            state.favouriteId = payload;
        },
        setTokenQuery: (state, { payload }) => {
            state.tokenObj = payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setSongs,
    setSong,
    setNextSong,
    setPreviousSong,
    setIsPlaying,
    setUser,
    setLanguageMode,
    setPlaylist,
    setFavourites,
    setFavouriteId,
    setTokenQuery,
    setPlaylistId,
} = counterSlice.actions;

export default counterSlice.reducer;
