const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            reactStrictMode: true,
            images: {
                domains: ["http://localhost:5000/", "musicfilesforheroku.s3.us-west-1.amazonaws.com"],
            },
            env: {
                base_url: "http://localhost:5000/api",
                media_url: "https://musicfilesforheroku.s3.us-west-1.amazonaws.com/uploads",
            },
            httpAgentOptions: {
                keepAlive: true,
            },
        };
    }

    return {
        reactStrictMode: true,
        images: { domains: ["music-apppps.herokuapp.com", "musicfilesforheroku.s3.us-west-1.amazonaws.com"] },
        // images: { domains: ["localhost", "musicfilesforheroku.s3.us-west-1.amazonaws.com"] },
        env: {
            base_url: "https://music-apppps.herokuapp.com/api",
            media_url: "https://musicfilesforheroku.s3.us-west-1.amazonaws.com/uploads",
            // base_url: "https://music-appps.herokuapp.com/api",
            // media_url: "https://music-appps.herokuapp.com",
            httpAgentOptions: {
                keepAlive: true,
            },
        },
    };
};
