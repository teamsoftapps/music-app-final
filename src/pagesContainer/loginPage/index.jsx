import { Button } from "@material-ui/core";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/musicReducer";
import ExtendSubscription from "../extendSubscriptionpage";
import api from "./../../../services/api";
import classes from "./LoginPage.module.css";
import Image from "next/image";

const postSelector = (state) => state.music;

const LoginPage = () => {
  // console.log("LoginPage >>>>>>>>");

  const router = useRouter();

  const { language } = useSelector(postSelector, shallowEqual);

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Perform localStorage action

      setMessage(localStorage.getItem("success"));

      localStorage.removeItem("userEmail");

      setTimeout(() => {
        localStorage.removeItem("success");

        setMessage("");
      }, 3000);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Perform localStorage action
      if (localStorage.getItem("music-app-credentials")) {
        router.replace("/");
      }

      if (localStorage.getItem("trial-info")) {
        router.replace("/extend-subscription");
      }
    }
  }, []);

  // console.log({ email, accessCode });
  // console.log(router.query.email ? router.query.email : "", router.query.access_code ? router.query.access_code : "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const payload = { email, password };

      const { data } = await api.post("/api/signin", payload);

      if (typeof window !== "undefined") {
        // Perform localStorage action
        localStorage.setItem(
          "music-app-credentials",
          JSON.stringify(data?.data?.user)
        );
      }

      dispatch(setUser(data?.data?.user));

      setLoading(false);

      router.replace("/");
    } catch (err) {
      setLoading(false);

      console.error(
        "err?.response?.data?.message >>>>>>>>>>",
        err?.response?.data?.message
      );

      if (
        err?.response?.data?.message === "Your trial period has been expired!"
      ) {
        const trialObj = {
          expired: true,
          message: err?.response?.data?.message,
          email: err?.response?.data?.data?.user,
        };

        if (typeof window !== "undefined") {
          // Perform localStorage action
          localStorage.setItem("trial-info", JSON.stringify(trialObj));
        }

        router.push("/extend-subscription");
      } else {
        setError(err?.response?.data?.message);

        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  };

  const loginTextEng = "Login";
  const loginTextNl = "Log in";

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
          | {language.title === "nl" ? loginTextNl : loginTextEng}{" "}
        </title>
      </Head>

      {message && (
        <h1 style={{ color: "white", fontSize: "30px", margin: "20px 0" }}>
          {message}
        </h1>
      )}

      <h1>{language.title === "nl" ? loginTextNl : loginTextEng}</h1>

      {loading && <h3>Loading..</h3>}
      {error && <h3 style={{ color: "red" }}>{error}</h3>}

      <div className={classes.input}>
        {/* <label htmlFor="">{language.title === "nl" ? "E-mail" : "Email"}</label> */}

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
              // disabled={!isSignIn ? true : false}
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
      </div>
      {/* Email */}
      {/* Disable conditions on the basis of /signup and /signup?uduiwe */}

      <div className={classes.input}>
        {/* <label htmlFor="">
          {language.title === "nl" ? "Wachtwoord" : "Password"}
        </label> */}
        <div style={{ display: "flex", alignItems: "center" }}>

          <div>
            <Image src='/images/password2.png' alt="email" width={100} height={100} />
          </div>
          <div style={{ flex: 1, marginLeft: -80 }}>
            <input
              value={password}
              style={{ flex: 1 }}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              minLength={6}
              maxLength={36}
              placeholder={
                language.title === "nl" ? "Voer wachtwoord in" : "Enter Password"
              }
            />
          </div>
        </div>
      </div>
      <div className={classes.login_btn_div}>
        {loading ? (
          <Button
            // disabled={!isSignIn && !checkBox}
            disabled={true}
            type="submit"

          // variant="contained"
          // style={{ opacity: "0.9" }}
          >
            Loading...
          </Button>
        ) : (
          <Button type="submit" variant="contained">
            {language.title === "nl" ? loginTextNl : loginTextEng}
          </Button>
        )}
        <br />
        <p className={classes.forgot_p_tag}>
          {/* <span
            onClick={() => {
              router.push("/subscriptions");
            }}
          >
            {language.title === "nl"
              ? "Koop een abonnement"
              : "Buy a Subscription"}
          </span>
          <span
            onClick={() => {
              router.push("/premium-code");
            }}
          >
            {language.title === "nl"
              ? "Ik Heb Premium Code"
              : "I've Premium Code"}
          </span> */}
          {/* <span
            onClick={() => {
              router.push("/signup?email=asdasd&access_code=87asd6");
            }}
          >
            {language.title === "nl" ? "Aanmelden" : "Signup"}
          </span> */}
          {/* <span onClick={() => extendSubscription()}>
            {language.title === "nl"
              ? "Abonnement verlengen"
              : "Extend Subscription"}
          </span> */}
          <span
            style={{ color: '#CCAA6B' }}
            onClick={() => {
              router.push("/forgot");
            }}
          >
            {language.title === "nl"
              ? "Wachtwoord vergeten"
              : "Forgot Password"}
            ?
          </span>
        </p>
      </div>
      {/* <p>
        <span
          onClick={() => {
            router.push("/signup");
          }}
        >
          {language.title === "nl"
            ? "Geen account! Nieuwe aanmaken"
            : "No Account! Create new one"}
        </span>
      </p> */}
    </form >
  );
};

export default LoginPage;

// Sign up form: add the following checkbox (below Access Code field) that is required in order to register:
// I promise this account will only be used by me, and not to share any of the content with others.
// Dutch translation: Ik ben de exclusieve gebruiker van deze account en beloof de muziek niet te delen met derden.
// 4) Sign up form: Please link the Terms & Conditions (both English & Dutch

// I thought to already provide the Dutch translation for the text labels in the Sign up and Login screens. I hope the following format is OK (first the English, then the Dutch equivalent)
// "Sign Up", "Aanmelden"
// "Email", "Email"
// "Your email address", "Uw emailadres"
// "Password", "Wachtwoord"
// "Access Code", "Toegangscode"
// "Already have an account", "Heeft u al een account?" Inloggen."
// "By signing up, you are agree to follow our Terms and Conditions.", "Door u aan te melden gaat u akkoord met onze terms & conditions."
// "Login", "Log in"
// "Create your account", "Account aanmaken"
