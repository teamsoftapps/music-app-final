const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            reactStrictMode: true,
            images: { domains: ["localhost:5000", "localhost"] },
            env: {
                base_url: "http://localhost:5000/api",
                media_url: "http://localhost:5000",
            },
        };
    }

    return {
        reactStrictMode: true,
        images: { domains: ["music-appps.herokuapp.com"] },
        env: {
            base_url: "https://music-appps.herokuapp.com/api",
            media_url: "https://music-appps.herokuapp.com",
        },
    };
};
