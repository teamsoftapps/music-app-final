import { Button } from "@material-ui/core";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import api from "./../../../services/api";
import classes from "./CreateNewPlaylistPage.module.css";
import Image from "next/image";

const postSelector = (state) => state.music;

const CreateNewPlaylistPage = () => {
    // console.log("Auth ForgotPage >>>>>>>>");

    const router = useRouter();

    const { language, user } = useSelector(postSelector, shallowEqual);

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    const handleSubmit = async (e) => {
        setLoading(true);

        e.preventDefault();

        try {
            const body = {
                email,
            };

            let { data } = await api.post(`/api/forgot-password`, body);
            console.log("forgot data==>", data?.data?.id);

            if (data) {
                // if (typeof window !== "undefined") {
                //   // Perform localStorage action
                localStorage.setItem("userID", data?.data?.id);
            }

            setLoading(false);

            router.push("/reset-password");
            // }
        } catch (err) {
            setLoading(false);
            // router.push("/reset-password");
            console.error(
                "err?.response?.data?.message >>>>>>>>>>",
                err?.response?.data?.message
            );

            setError(err?.response?.data?.message);

            setTimeout(() => {
                setError("");
            }, 3000);
        }
    };

    useEffect(() => {
        if (!user) {
            router.replace("/login");
        }
    }, [user]);

    return (
        <form
            autoComplete="off"
            onSubmit={(e) => handleSubmit(e)}
            className={classes.auth}
        >
            <Head>
                <title>
                    {language.title === "nl"
                        ? "Mulder muziekstreaming"
                        : "Mulder Music Streaming"}{" "}
                    |{" "}
                    {language.title === "nl" ? "NULL" : "Create a New Playlist"}
                </title>
            </Head>

            <h1>
                {language.title === "nl"
                    ? "Wachtwoord opnieuw instellen"
                    : "Create a New Playlist"}
            </h1>

            {loading && (
                <div className={classes.loading}>
                    <h1 style={{ fontSize: "2.5rem" }}>Loading...</h1>
                </div>
            )}

            {error && <h3 style={{ color: "red" }}>{error}</h3>}

            <div className={classes.input}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div>
                        <Image src='/images/email2.png' alt="email" width={100} height={100} />
                    </div>
                    <div style={{ flex: 1, marginLeft: -80 }}>
                        <input
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            // disabled={loading ? true : false}
                            type="email"
                            required
                            placeholder={
                                language.title === "nl"
                                    ? "NULL"
                                    : "Enter Playlist Name"
                            }
                        />
                    </div>
                </div>
            </div>

            <br />

            <label className="custom-file-upload">
                Choose File
                <input
                    type="file"
                    name="myImage"
                    onChange={(event) => {
                        console.log(event.target.files[0]);
                        setSelectedImage(event.target.files[0]);
                    }}
                />
            </label>
            <div>
                {selectedImage && (
                    <div>
                        <img
                            alt="not found"
                            width={"250px"}
                            src={URL.createObjectURL(selectedImage)}
                        />
                        <br />
                        <button onClick={() => setSelectedImage(null)}>Remove</button>
                    </div>
                )}

            </div>

            {/* <div>
                {selectedImage && (
                    <div>
                        <img
                            alt="not found"
                            width={"250px"}
                            src={URL.createObjectURL(selectedImage)}
                        />
                        <br />
                        <button onClick={() => setSelectedImage(null)}>Remove</button>
                    </div>
                )}

                <br />
                <br />

                <input
                    type="file"
                    name="myImage"
                    onChange={(event) => {
                        console.log(event.target.files[0]);
                        setSelectedImage(event.target.files[0]);
                    }}
                />
            </div> */}

            {/* <div className={classes.input}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div>
                        <Image src='/images/email2.png' alt="email" width={100} height={100} />
                    </div>
                    <div style={{ flex: 1, marginLeft: -80 }}>
                        <input
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            // disabled={loading ? true : false}
                            type="email"
                            required
                            placeholder={
                                language.title === "nl"
                                    ? "Vul email adres in"
                                    : "Enter Email Address"
                            }
                        />
                    </div>
                </div>
            </div> */}

            {/* <Button type="submit" variant="contained">
                {language.title === "nl" ? "Doorgaan" : "Continue"}
            </Button>
            <br /> */}
            {/* <p>
                <span className={classes.linkBoxWrapper}>
                    <span
                        style={{ color: "#fff", textDecoration: "underline" }}
                        onClick={() => {
                            router.push("/login");
                        }}
                    >
                        {language.title === "nl" ? "Terug naar Inloggen" : "Back to Login"}
                    </span>
                </span>
            </p> */}
        </form>
    );
};

export default CreateNewPlaylistPage;

