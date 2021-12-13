const Advertisement = () => {
    return (
        <div style={{ height: "100%" }}>
            {/* <h2 style={{ color: "white", textAlign: "center" }}></h2> */}
            {/* <video>
                <source src="" type="video/mp4" />
            </video> */}
            <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/4C15fGYzTcQ"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
        </div>
    );
};

export default Advertisement;
