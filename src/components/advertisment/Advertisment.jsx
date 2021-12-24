import classes from "./Advertisment.module.css";

const Advertisement = () => {
    return (
        <div className={classes.item} style={{ height: "100%" }}>
            {/* <iframe 
            src="https://player.vimeo.com/video/659963617?h=d0cd07c6bd" 
            height="150" 
            frameborder="0" 
            allow="autoplay; fullscreen; picture-in-picture" 
            style="float: left;"
            allowfullscreen=""
            >
            </iframe> */}
            {/* <h2 style={{ color: "white", textAlign: "center" }}></h2> */}
            {/* <video>
                <source src="" type="video/mp4" />
            </video> */}
            <div>
            <iframe
                width="300"
                height="150"
                src="https://player.vimeo.com/video/659963617?h=d0cd07c6bd"
                title="Mulder Christmas Improvisation"
                frameborder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowfullscreen
            ></iframe>
            <span>Mulder plays Christmas organ improvisation during (pre-COVID) European Tour.</span>
            </div>
        </div>
    );
};

export default Advertisement;
