import { Button } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import classes from "./AuthPage.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { setUser } from "../../store/musicReducer";
import { useDispatch } from "react-redux";

function AuthPage({ isSignIn }) {
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

            if (!isSignIn) {
                router.push("/login");
            } else {
                localStorage.setItem("music-app-credentials", JSON.stringify(data));
                dispatch(setUser(data));
                router.push("/");
            }
        } catch (err) {
            setLoading(false);
            console.log({ err });
            setError(err?.response?.data);

            setTimeout(() => {
                setError("");
            }, 3000);
        }
    }

    const loginText = isSignIn ? "Login" : "Sign Up";

    return (
        <form onSubmit={handleSubmit} className={classes.auth}>
            <h1> {loginText}</h1>
            {loading && <h3>Loading..</h3>}
            {error && <h3 style={{ color: "red" }}>{error}</h3>}

            <div className={classes.input}>
                <label htmlFor="">Email</label>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" required placeholder="Your Email address" />
            </div>
            <div className={classes.input}>
                <label htmlFor="">Password</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    required
                    minLength={6}
                    maxLength={36}
                    placeholder="Your Password"
                />
            </div>
            {!isSignIn && (
                <div className={classes.input}>
                    <label htmlFor="">Access Code</label>
                    <input
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                        type="text"
                        required
                        minLength={10}
                        maxLength={10}
                        placeholder="Your Password"
                    />
                </div>
            )}
            <Button type="submit" variant="contained">
                {loginText}
            </Button>
            <br />
            <p>
                {!isSignIn ? (
                    <span onClick={() => router.push("/login")}>Already have an account</span>
                ) : (
                    <span onClick={() => router.push("/signup")}> Create Your Account</span>
                )}
            </p>
            {!isSignIn && (
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
