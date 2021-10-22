const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            reactStrictMode: true,
            images: { domains: ["localhost:5000", "localhost", "172.31.37.153", "music-appps.herokuapp.com"] },
            env: {
                base_url: "http://music-appps.herokuapp.com/api",
                media_url: "https://music-appps.herokuapp.com",
            },
            httpAgentOptions: {
                keepAlive: true,
            },
        };
    }

    return {
        reactStrictMode: true,
        images: { domains: ["music-appps.herokuapp.com", "3.144.44.95"] },
        env: {
            // base_url: "http://172.31.37.153/api",
            // media_url: "http://172.31.37.153",
            base_url: "https://music-appps.herokuapp.com/api",
            media_url: "https://music-appps.herokuapp.com",
            httpAgentOptions: {
                keepAlive: true,
            },
        },
    };
};
