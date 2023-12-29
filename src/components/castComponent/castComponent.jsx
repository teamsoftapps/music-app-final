// CastButton component
import React, { useCallback } from 'react';
import { useCast } from 'react-chromecast';
import CastIcon from '@mui/icons-material/Cast';

export default function CastButton() {
    const cast = useCast({
        // initialize_media_player: "CC1AD845",
        // initialize_media_player: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
        initialize_media_player: "DEFAULT_MEDIA_RECEIVER_APP_ID",
        auto_initialize: true,
    });
    const handleClick = useCallback(async () => {
        if (cast.castReceiver) {
            await cast.handleConnection();
        }
    }, [cast.castReceiver, cast.handleConnection]);
    return (
        <button onClick={handleClick} style={{ "backgroundColor": "transparent", "border": "none" }}><CastIcon /></button>
    );
}