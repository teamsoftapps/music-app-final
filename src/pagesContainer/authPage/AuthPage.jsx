import { Button } from "@material-ui/core";
import React, { useRef, useState } from "react";
import classes from "./AuthPage.module.css";
import axios from "axios";

function AuthPage() {
    const [isSignIn, setIsSignIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const password = passwordRef.current.value;
        const email = passwordRef.current.value;
        const payload = { email, password };

        const url = !isSignIn ? "https://music-appps.herokuapp.com/api" + "/signup" : "/signin";

        try {
            const { data } = await axios.post(url, payload);
            console.log({ data });
            setLoading(false);

            if (isSignIn) {
                localStorage.setItem("music-app-credentials", JSON.stringify(data));
                window.location.href = "/";
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

    const loginText = isSignIn ? "Login" : "Sign Up";
    return (
        <form onSubmit={handleSubmit} className={classes.auth}>
            <h1> {loginText}</h1>
            {/* {!isSignIn && (
                <>
                    <div className={classes.input}>
                        <label htmlFor="">First Name</label>
                        <input type="text" required placeholder="Your First Name" />
                    </div>
                    <div className={classes.input}>
                        <label htmlFor="">Last Name </label>
                        <input type="text" required placeholder="Your Last Name" />
                    </div>
                </>
            )} */}

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
            <Button type="submit" variant="contained">
                {loginText}
            </Button>

            <p>
                Have an accedd code?
                <span onClick={() => setIsSignIn((prevState) => !prevState)}>
                    {!isSignIn ? "Already have an account" : "Create Your Account"}
                </span>
            </p>
            {isSignIn && (
                <>
                    <span>Forgot your password</span>
                    <p>
                        By logging in, you agree to our following <span>Privacy Policy</span>
                        and,
                        <span>Terms of service</span>
                    </p>
                </>
            )}
        </form>
    );
}

export default AuthPage;
