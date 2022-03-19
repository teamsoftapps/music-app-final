import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import classes from "./HomePage.module.css";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import Footer from "../../components/footer/Foote";
import FlipMove from "react-flip-move";
import downarrow from "../../../public/images/downarrownew.png";
import uparrow from "../../../public/images/uparrownew.png";
import Image from "next/image";
import Advertisement from "../../components/advertisment/Advertisment";
import { useRouter } from "next/router";
import axios from "axios";
import { setFavourites } from "../../store/musicReducer";


const postSelector = (state) => state.music;

const HomePage = ({ albums }) => {


    let albumArray = [];

    albums?.forEach(element => {
        let { index } = element;
        albumArray[index - 1] = element;
    });


    // console.log(albumArray)
    const [openAdd, setOpenAdd] = useState(false);
    const { language, user } = useSelector(postSelector, shallowEqual);
    const route = useRouter()
    const dispatch = useDispatch()
    // console.log(user)
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("music-app-credentials"));

        if (!user?.token.length) return route.replace("/login");

        const { token } = JSON.parse(localStorage.getItem('music-app-credentials'))

        const fetchFavourites = async () => {
            try {
                const url = process.env.base_url;
                const { data } = await axios.get(`${url}/getFavourites`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                // tempArr.push(data?.favourites)
                dispatch(setFavourites(data?.favourites))
            } catch (error) {
                console.log(error)
            }
        }
        fetchFavourites()

    }, []);

    const handleAdd = () => {
        if (openAdd === false) {
            setOpenAdd(true);
        } else {
            setOpenAdd(false);
        }
        console.log(openAdd);
    };

    return (
        <div className={classes.homePage}>
            <br />
            <h4 style={{ color: "white", textAlign: "center" }}>STREAMING</h4>
            {/* Code for Advertisement (start) */}
            <div className={classes.addcontainer}>
                <h3 className={classes.addheading} onClick={() => handleAdd()}>
                    Exclusive Video
                </h3>

                {openAdd === false ? (
                    <Image src={downarrow} width={16} height={16} className={classes.arrows} onClick={() => handleAdd()} />
                ) : (
                    <Image src={uparrow} width={16} height={16} className={classes.arrows} onClick={() => handleAdd()} />
                )}
                {openAdd === true && (
                    <div className={classes.addwrapper}>
                        <Advertisement />
                    </div>
                )}
            </div>

            {/* Code for Advertisement (end) */}
            <FlipMove className={classes.cards}>
                {albumArray?.map((album, index) => {
                    const url = `${process.env.media_url}/${language.title === "eng" ? album?.Album_Image : album?.Album_Image.replace("eng", "nl")
                        }`;

                    return (
                        <Card
                            key={album?._id + language.title}
                            album={album}
                            url={url}
                            index={index}
                            trial={user?.hasOwnProperty("expiresIn")}
                        />
                    );
                })}
            </FlipMove>
            {/* https://githubmemory.com/repo/joshwcomeau/react-flip-move/issues/256 */}
            {/* Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. */}
            <Footer />
        </div>
    );
};

export default HomePage;
