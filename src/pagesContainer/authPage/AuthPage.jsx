import { Button } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import classes from "./AuthPage.module.css";
import axios from "axios";
import { useRouter } from "next/router";

function AuthPage({ isSignIn }) {
    const route = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [accessCode, setAccessCode] = useState("");

    const emailRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("music-app-credentials"));
        if (user?.token.length > 30) {
            route.replace("/");
        }
    }, []);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const password = passwordRef.current.value;
        const email = passwordRef.current.value;
        const payload = isSignIn ? { email, password } : { email, password };

        const url = process.env.base_url + (isSignIn ? "/signup" : "/signin");

        console.log({ url, payload });

        try {
            const { data } = await axios.post(url, payload);
            console.log({ data });
            setLoading(false);

            if (isSignIn) {
                localStorage.setItem("music-app-credentials", JSON.stringify(data));
                route.push("/");
            } else {
                setAccessCode(data?._id);
                // setIsSignIn(true);
            }
        } catch (err) {
            setLoading(false);
            console.log({ err });
            setError(err?.response?.data);

            setTimeout(() => {
                setError("");
            }, 3000);
        }
    };

    const loginText = !isSignIn ? "Login" : "Sign Up";
    return (
        <form onSubmit={handleSubmit} className={classes.auth}>
            <h1> {loginText}</h1>
            {loading && <h3>Loading..</h3>}
            {error && <h3 style={{ color: "red" }}>{error}</h3>}

            <div className={classes.input}>
                <label htmlFor="">Email</label>
                <input ref={emailRef} type="email" required placeholder="Your Email address" />
            </div>
            <div className={classes.input}>
                <label htmlFor="">Password</label>
                <input ref={passwordRef} type="password" required minLength={6} maxLength={36} placeholder="Your Password" />
            </div>
            {isSignIn && (
                <div className={classes.input}>
                    <label htmlFor="">Access Code</label>
                    <input
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                        type="text"
                        // required
                        // minLength={24}
                        // maxLength={24}
                        placeholder="Your Password"
                    />
                </div>
            )}
            <Button type="submit" variant="contained">
                {loginText}
            </Button>
            <br />
            <p>
                {isSignIn ? (
                    <span onClick={() => route.push("/login")}>Already have an account</span>
                ) : (
                    <span onClick={() => route.push("/signup")}> Create Your Account</span>
                )}
            </p>
            {isSignIn && (
                <>
                    <br />
                    {/* <span>Forgot your password</span> */}
                    <p>
                        By Signing up, you are agree to follow our <span>Privacy Policy</span>
                        and,
                        <span>Terms of service</span>
                    </p>
                </>
            )}
        </form>
    );
}

export default AuthPage;
