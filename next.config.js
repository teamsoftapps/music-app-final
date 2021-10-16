const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            reactStrictMode: true,
            images: { domains: ["localhost:5000", "localhost", "18.119.12.204"] },
            env: {
                base_url: "http://18.119.12.204/api",
                media_url: "http://18.119.12.204",
            },
        };
    }

    return {
        reactStrictMode: true,
        images: { domains: ["music-appps.herokuapp.com", "18.119.12.204"] },
        env: {
            base_url: "http://18.119.12.204/api",
            media_url: "http://18.119.12.204",
            // base_url: "https://music-appps.herokuapp.com/api",
            // media_url: "https://music-appps.herokuapp.com",
        },
    };
};
