import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import classes from "./AuthPage.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { setUser } from "../../store/musicReducer";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Head from "next/head";

const postSelector = (state) => state.music;
function AuthPage({ isSignIn }) {
    const { language } = useSelector(postSelector, shallowEqual);

    const router = useRouter();
    const dispatch = useDispatch();

    const [email, setEmail] = useState(router.query.email ? router.query.email : "");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [accessCode, setAccessCode] = useState(router.query.access_code ? router.query.access_code : "");

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("music-app-credentials"));
        if (user?.token.length > 30) {
            router.replace("/");
        }
        setEmail(router.query?.email);
        setAccessCode(router.query?.access_code);
    }, []);

    async function handleSubmit(e) {
        setLoading(true);
        e.preventDefault();
        const payload = isSignIn ? { email, password } : { email, password, code: accessCode };

        const url = process.env.base_url + (!isSignIn ? "/signup" : "/signin");

        try {
            const { data } = await axios.post(url, payload);
            setLoading(false);

            localStorage.setItem("music-app-credentials", JSON.stringify(data));
            dispatch(setUser(data));
            router.push("/");
        } catch (err) {
            setLoading(false);
            console.log({ err });
            setError(err?.response?.data);

            setTimeout(() => {
                setError("");
            }, 3000);
        }
    }

    const loginTextEng = isSignIn ? "Login" : "Sign Up";
    const loginTextNl = isSignIn ? "Inloggen" : "Maak uw account aan";

    return (
        <form onSubmit={handleSubmit} className={classes.auth}>
            <Head>
                <title>Mulder Music Streaming | {language.title === "nl" ? loginTextNl : loginTextEng} </title>
            </Head>

            <h1> {language.title === "nl" ? loginTextNl : loginTextEng}</h1>
            {loading && <h3>Loading..</h3>}
            {error && <h3 style={{ color: "red" }}>{error}</h3>}

            <div className={classes.input}>
                <label htmlFor="">Email</label>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    required
                    placeholder={language.title === "nl" ? "Uw emailadres" : "Your Email Address"}
                />
            </div>
            <div className={classes.input}>
                <label htmlFor="">{language.title === "nl" ? "Wachtwoord" : "Password"}</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    required
                    minLength={6}
                    maxLength={36}
                    placeholder={language.title === "nl" ? "Wachtwoord" : "Your Password"}
                />
            </div>
            {!isSignIn && (
                <div className={classes.input}>
                    <label htmlFor="">{language.title === "nl" ? "Toegangscode" : "Access Code"}</label>
                    <input
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                        type="text"
                        required
                        minLength={10}
                        maxLength={10}
                        placeholder={language.title === "nl" ? "Toegangscode" : "Access Code"}
                    />
                </div>
            )}
            <Button type="submit" variant="contained">
                {loginTextEng}
            </Button>
            <br />
            <p>
                {!isSignIn ? (
                    <span onClick={() => router.push("/login")}>
                        {language.title === "nl" ? "Heeft u al een account? Inloggen." : "Already have an account"}
                    </span>
                ) : (
                    <span onClick={() => router.push("/signup")}>
                        {language.title === "nl" ? "Account aanmaken" : "Create Your Account"}
                    </span>
                )}
            </p>
            {!isSignIn && (
                <>
                    <br />
                    {/* <span>Forgot your password</span> */}
                    {language.title === "nl" ? (
                        <p>Door u aan te melden gaat u akkoord met onze terms & conditions.</p>
                    ) : (
                        <p>
                            By Signing up, you are agree to follow our <span>Terms of service</span>
                        </p>
                    )}
                </>
            )}
        </form>
    );
}

export default AuthPage;

// I thought to already provide the Dutch translation for the text labels in the Sign up and Login screens. I hope the following format is OK (first the English, then the Dutch equivalent)
// "Sign Up", "Maak uw account aan"
// "Email", "Email"
// "Your email address", "Uw emailadres"
// "Password", "Wachtwoord"
// "Access Code", "Toegangscode"
// "Already have an account", "Heeft u al een account?" Inloggen."
// "By signing up, you are agree to follow our Terms and Conditions.", "Door u aan te melden gaat u akkoord met onze terms & conditions."
// "Login", "Inloggen"
// "Create your account", "Account aanmaken"
