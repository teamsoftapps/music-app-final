import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    songs: [],
    song: {},
};

export const counterSlice = createSlice({
    name: "albums",
    initialState,
    reducers: {
        // authentication
        setUser: (state, { payload }) => {
            state.user = payload;
        },

        // Songs configuration
        setSongs: (state, { payload }) => {
            console.log({ payload });

            state.songs = payload;
        },

        // Song configuration
        setSong: (state, { payload }) => {
            state.song = payload;
        },
        setIsPlaying: (state, { payload }) => {
            state.song = payload;
        },
        setPreviousSong: (state, { payload }) => {
            const currentIndex = state.songs.findIndex((song) => song._id === payload._id);
            if (currentIndex <= 0) return;
            state.song = state.songs[currentIndex - 1];
        },
        setNextSong: (state, { payload }) => {
            const currentIndex = state.songs.findIndex((song) => song._id === payload._id);
            if (currentIndex < 0 || currentIndex === state.songs.length - 1) return;
            state.song = state.songs[currentIndex + 1];
        },
    },
});

// Action creators are generated for each case reducer function
export const { setSongs, setSong, setNextSong, setPreviousSong, setIsPlaying, setUser } = counterSlice.actions;

export default counterSlice.reducer;
