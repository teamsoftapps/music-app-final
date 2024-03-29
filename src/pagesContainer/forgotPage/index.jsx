import { Button } from "@material-ui/core";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import api from "./../../../services/api";
import classes from "./ForgotPage.module.css";
import Image from "next/image";

const postSelector = (state) => state.music;

const ForgotPage = () => {
  // console.log("Auth ForgotPage >>>>>>>>");

  const router = useRouter();

  const { language, user } = useSelector(postSelector, shallowEqual);

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        console.log(data?.data?.id, "isko mn nikiaal ln ?");
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
    if (user) {
      router.replace("/");
    } else {
      router.replace("/forgot");
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
          {language.title === "nl" ? "Wachtwoord Vergeten" : "Forgot Password"}
        </title>
      </Head>

      <h1>
        {language.title === "nl"
          ? "Wachtwoord opnieuw instellen"
          : "Reset Password"}
      </h1>

      {/* {loading && <h3>Loading..</h3>} */}

      {loading && (
        <div className={classes.loading}>
          <h1 style={{ fontSize: "2rem" }}>Loading...</h1>
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
                  ? "Vul email adres in"
                  : "Enter Email Address"
              }
            />
          </div>
        </div>
      </div>

      <Button type="submit" variant="contained">
        {language.title === "nl" ? "Doorgaan" : "Continue"}
      </Button>

      {/* <div
        style={{
          position: "fixed",
          top: "50%",
          right: "44vw",
          left: "44vw",

          // left: 0,
          // width: "100%",
          // height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 100,
        }}
      >
        <ClipLoader color="red" loading={loading} size={"10vw"} />
      </div> */}

      <br />

      <p>
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
      </p>
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
