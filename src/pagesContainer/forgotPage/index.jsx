import { Button } from "@material-ui/core";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import classes from "./ForgotPage.module.css";
import api from "./../../../services/api";

const postSelector = (state) => state.music;

const ForgotPage = () => {
  console.log("Auth ForgotPage >>>>>>>>");

  const { language } = useSelector(postSelector, shallowEqual);

  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isForget, setIsForget] = useState(false);

  // console.log({ email, accessCode });
  // console.log(router.query.email ? router.query.email : "", router.query.access_code ? router.query.access_code : "");

  const handleSubmit = async (e) => {
    // setLoading(true);
    // e.preventDefault();
    // const payload = { email };
  };

  return (
    <form onSubmit={handleSubmit} className={classes.auth}>
      <Head>
        <title>Mulder Music Streaming | </title>
      </Head>

      <h1>
        {language.title === "nl" ? "Vind Je Account" : "Find Your Account"}
      </h1>

      {loading && <h3>Loading..</h3>}

      {error && <h3 style={{ color: "red" }}>{error}</h3>}

      <div className={classes.input}>
        <label htmlFor="">{language.title === "nl" ? "E-mail" : "Email"}</label>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          // disabled={!isSignIn ? true : false}
          type="email"
          required
          placeholder={
            language.title === "nl" ? "Uw emailadres" : "Your Email Address"
          }
        />
      </div>

      {/* Email */}
      {/* Disable conditions on the basis of /signup and /signup?uduiwe */}

      {/* <div className={classes.input}>
        <label htmlFor="">
          {isForget ? (language.title === "nl" ? "Nieuw" : "New") : ""}{" "}
          {language.title === "nl" ? "Wachtwoord" : "Password"}
        </label>
        <input
          value={password}
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
          minLength={6}
          maxLength={36}
          placeholder={
            isForget
              ? language.title === "nl"
                ? "Nieuw Wachtwoord"
                : "Your New Password"
              : language.title === "nl"
              ? "Wachtwoord"
              : "Your Password"
          }
        />
      </div> */}

      {/* {!isSignIn || isForget ? (
        <div className={classes.input}>
          <label htmlFor="">
            {language.title === "nl" ? "Toegangscode" : "Access Code"}
          </label>
          <input
            value={accessCode}
            // disabled={!isSignIn ? true : false}
            onChange={
              isSignIn
                ? (e) => {
                    setAccessCode(e.target.value);
                  }
                : (e) => {
                    setAccessCode(e.target.value);
                  }
            }
            type="text"
            required
            minLength={7}
            maxLength={10}
            placeholder={
              language.title === "nl" ? "Toegangscode" : "Access Code"
            }
          />
        </div>
      ) : (
        ""
      )} */}
      {/* {!isSignIn && (
        <>
          <br />
          <FormControlLabel
            style={{ display: "block" }}
            control={
              <Checkbox
                color="default"
                value={checkBox}
                onClick={() => setCheckBox(!checkBox)}
              />
            }
            label={codePromiseText}
          />
        </>
      )} */}
      <Button
        // disabled={!isSignIn && !checkBox}
        type="submit"
        variant="contained"
      >
        {language.title === "nl" ? "Indienen" : "Submit"}
      </Button>
      <br />
      {/* <p>
        {!isSignIn ? (
          <span onClick={() => router.push("/auth/login")}>
            {language.title === "nl"
              ? "Heeft u al een account? Inloggen."
              : "Already have an account"}
          </span>
        ) : (
          <>
            <span className={classes.linkBoxWrapper}>
              {isForget ? (
                <span
                  onClick={() => {
                    setIsForget(!isForget);
                    // setAccessCode("");
                    // setPassword("");
                  }}
                >
                  {language.title === "nl"
                    ? "Terug naar Inloggen"
                    : "Back to Login"}
                </span>
              ) : (
                <span
                  onClick={() => {
                    setIsForget(!isForget);
                    setPassword("");
                  }}
                >
                  {language.title === "nl"
                    ? "Wachtwoord vergeten?"
                    : "Forgot Password?"}
                </span>
              )} */}
      {/* <span onClick={() => router.push("/signup")}>
                                {language.title === "nl" ? "Account aanmaken" : "Create Your Account"}
                            </span> */}
      {/* </span>
          </>
        )}
      </p> */}
      {/* {!isSignIn && (
        <>
          <br /> */}
      {/* <span>Forgot your password</span> */}
      {/* {language.title === "nl" ? (
            <a
              target="_blank"
              href="https://janmulder.us/store/?album=Streaming"
            >
              Door u aan te melden gaat u akkoord met onze terms & conditions.
            </a>
          ) : (
            <a
              target="_blank"
              href="https://janmulder.us/store/?album=Streaming"
            >
              By Signing up, you are agree to follow our{" "}
              <span>Terms & conditions.</span>
            </a>
          )}
        </>
      )} */}
    </form>
  );
};

export default ForgotPage;

// Sign up form: add the following checkbox (below Access Code field) that is required in order to register:
// I promise this account will only be used by me, and not to share any of the content with others.
// Dutch translation: Ik ben de exclusieve gebruiker van deze account en beloof de muziek niet te delen met derden.
// 4) Sign up form: Please link the Terms & Conditions (both English & Dutch

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
