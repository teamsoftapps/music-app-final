import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    songs: [
        {
            title: "On Eagle's Wings",
            url: "On Eagle's Wings",
            isPlaying: false,
        },
        {
            title: "Island Of Peace",
            url: "Island Of Peace",
            isPlaying: false,
        },
        {
            title: "Celtic Sunrise",
            url: "Celtic Sunrise",
            isPlaying: false,
        },
        {
            title: "Rainbow Of Hope",
            url: "Rainbow Of Hope",
            isPlaying: false,
        },
        {
            title: "You're The One",
            url: "You're The One",
            isPlaying: false,
        },
        {
            title: "Happy Hearts",
            url: "Happy Hearts",
            isPlaying: false,
        },
        {
            title: "Musica Minore",
            url: "Musica Minore",
            isPlaying: false,
        },
        {
            title: "The Piano Dreamer",
            url: "The Piano Dreamer",
            isPlaying: false,
        },
        {
            title: "Beauty & The Beast",
            url: "Beauty & The Beast",
            isPlaying: false,
        },
        {
            title: "Daydreamer",
            url: "Daydreamer",
            isPlaying: false,
        },
        {
            title: "Sailing Sunny Seas",
            url: "Sailing Sunny Seas",
            isPlaying: false,
        },
        {
            title: "Rendezvous",
            url: "Rendezvous",
            isPlaying: false,
        },
        {
            title: "Silent Tears",
            url: "Silent Tears",
            isPlaying: false,
        },
        {
            title: "Meditation",
            url: "Meditation",
            isPlaying: false,
        },
        {
            title: "Love Theme",
            url: "Love Theme",
            isPlaying: false,
        },
        {
            title: "The Final Encore",
            url: "The Final Encore",
            isPlaying: false,
        },
    ],
    song: {
        title: "Beauty & The Beast",
        url: "Beauty & The Beast",
        isPlaying: false,
    },
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
            const currentIndex = state.songs.findIndex((song) => song.title === payload.title);
            if (currentIndex <= 0) return;
            state.song = state.songs[currentIndex - 1];
        },
        setNextSong: (state, { payload }) => {
            const currentIndex = state.songs.findIndex((song) => song.title === payload.title);
            if (currentIndex < 0 || currentIndex === state.songs.length - 1) return;
            state.song = state.songs[currentIndex + 1];
        },
    },
});

// Action creators are generated for each case reducer function
export const { setSongs, setSong, setNextSong, setPreviousSong, setIsPlaying, setUser } = counterSlice.actions;

export default counterSlice.reducer;
