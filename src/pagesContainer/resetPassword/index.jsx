import { Button } from "@material-ui/core";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import api from "./../../../services/api";
import classes from "./ResetPassword.module.css";

const postSelector = (state) => state.music;

const ResetPassword = () => {
  // console.log("ResetPassword >>>>>>>>");

  const { language } = useSelector(postSelector, shallowEqual);

  const router = useRouter();

  const [resetPasswordVerificationCode, setResetPasswordVerificationCode] =
    useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const body = {
        resetPasswordVerificationCode,
        password,
      };

      let userID;

      if (typeof window !== "undefined") {
        // Perform localStorage action
        userID = localStorage.getItem("userID");
      }

      let res = await api.patch(`/api/reset-password/${userID}`, body);

      // console.log("reset password>>>>>>>>>>>>>", res);

      if (res) {
        if (typeof window !== "undefined") {
          // Perform localStorage action
          localStorage.removeItem("userID");

          localStorage.setItem("type", "reset");
        }

        setLoading(false);

        router.push("/success");
      }
    } catch (err) {
      setLoading(false);

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

  return (
    <form autoComplete="off" onSubmit={handleSubmit} className={classes.auth}>
      <Head>
        <title>
          {language.title === "nl"
            ? "Mulder muziekstreaming"
            : "Mulder Music Streaming"}{" "}
          |{" "}
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

      {error && <h3 style={{ color: "red" }}>{error?.message}</h3>}

      <p>
        {language.title === "nl"
          ? "Je hebt zojuist een code per e-mail ontvangen. Voer het hieronder in en stel het gewenste wachtwoord in."
          : "You just received a code via email. Please enter it below and set your desired password."}
      </p>

      <div className={classes.input}>
        <label htmlFor="">
          {language.title === "nl" ? "Verificatie code" : "Verification Code"}
        </label>
        <input
          // disabled={!isSignIn ? true : false}
          type="text"
          onChange={(e) => {
            setResetPasswordVerificationCode(e.target.value);
          }}
          value={resetPasswordVerificationCode}
          required
          minLength={7}
          maxLength={10}
          placeholder={
            language.title === "nl" ? "Verificatie code" : "Verification Code"
          }
        />
      </div>

      <div className={classes.input}>
        <label htmlFor="">
          {language.title === "nl" ? "Nieuw Paswoord" : "New Password"}
        </label>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          required
          minLength={6}
          maxLength={36}
          placeholder={
            language.title === "nl"
              ? "Uw Nieuwe Wachtwoord"
              : "Your New Password"
          }
        />
      </div>

      <Button type="submit" variant="contained">
        {language.title === "nl" ? "Indienen" : "Submit"}
      </Button>

      <div
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
      </div>
      <br />
    </form>
  );
};

export default ResetPassword;
