const Advertisement = () => {
    return (
        <div style={{ height: "100%" }}>
            <div style={{ padding: "5px", color: "#fff", vertical-align: "middle", display: "table" }}>
            <iframe 
            src="https://player.vimeo.com/video/659963617?h=d0cd07c6bd" 
            height="150" 
            frameborder="0" 
            allow="autoplay; fullscreen; picture-in-picture" 
            style="float: left;"
            allowfullscreen=""
            >
            </iframe>
            <span style={{ display: "table-cell", vertical-align: "middle" }}>
                Mulder plays a Christmas organ improvisation during (pre-COVID) European Tour.
            </span>
            </div>
            {/* <h2 style={{ color: "white", textAlign: "center" }}></h2> */}
            {/* <video>
                <source src="" type="video/mp4" />
            </video> */}
            {/* <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/4C15fGYzTcQ"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe> */}
        </div>
    );
};

export default Advertisement;
