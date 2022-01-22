import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
// import classes from "./SideDrawer.module.css";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import { MusicNote, Lock, Heart } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    playlistDrawerHeading: {
        textAlign: "center",
        color: "#382b11",
        margin: "20px 0px",
    },
    playlistInnerWrap: {
        padding: "0px 2vw",
    },
    innerWrapInner: {
        display: "flex",

        backgroundColor: "#382b11",
        borderRadius: "4px",
        width: "100%",
        flexDirection: "row",
        margin: "5px 0px",
    },
    innerWrapname: {
        display: "flex",
    },
    playlistTextInner: {
        color: "#fff !important",
        margin: "10px 0px",
    },
    playlistWrap: {
        display: "flex",
    },
    playlistText: {
        color: "#fff !important",
        margin: "0px 6px",
        fontWeight: "bold",
    },
});

export default function TemporaryDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            // sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            // className={classes.drawerWrap}
        >
            <h1 className={classes.playlistDrawerHeading}>Your Playlist</h1>
            <List className={classes.playlistInnerWrap}>
                {["King of Kings", "Prince of Peace", "Lord of Lords", "Bread of Life"].map((text, index) => (
                    <ListItem button key={text}>
                        {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                        <div className={classes.innerWrapInner}>
                            <div className={classes.innerWrapname}>
                                <ListItemIcon className={classes.playlistTextInner}>{<MusicNote />}</ListItemIcon>
                                <ListItemText primary={text} className={classes.playlistTextInner} />
                            </div>
                        </div>
                    </ListItem>
                ))}
            </List>
            {/* <Divider /> */}
            {/* <List>
                {["All mail", "Trash", "Spam"].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List> */}
        </Box>
    );

    return (
        <div className={classes.mainWrap}>
            {["right"].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>
                        <div className={classes.playlistWrap}>
                            <div className={classes.playlistText}>Playlist</div>
                            <div className={classes.playlistText}>
                                <QueueMusicIcon />
                            </div>
                        </div>
                    </Button>
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
