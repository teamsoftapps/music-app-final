import { Button } from "@material-ui/core";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/musicReducer";
import classes from "./ResetPassword.module.css";

const postSelector = (state) => state.music;

const ResetPassword = () => {
  console.log("ResetPassword >>>>>>>>");

  const { language } = useSelector(postSelector, shallowEqual);

  const router = useRouter();
  const dispatch = useDispatch();

  const [accessCode, setAccessCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // console.log({ email, accessCode });
  // console.log(router.query.email ? router.query.email : "", router.query.access_code ? router.query.access_code : "");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const payload = { email, password, code: accessCode };

    const url = `${process.env.base_url}/updatePassword`;

    try {
      const { data } = await axios.post(url, payload);

      console.log(data);

      setLoading(false);

      localStorage.setItem("music-app-credentials", JSON.stringify(data));
      dispatch(setUser(data));

      router.push("/auth/login");
    } catch (err) {
      setLoading(false);
      console.log({ err });
      setError(err?.response?.data);

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.auth}>
      <Head>
        <title>Mulder Music Streaming | </title>
      </Head>

      <h1>
        {language.title === "nl"
          ? "Wachtwoord opnieuw instellen"
          : "Reset Password"}
      </h1>

      {loading && <h3>Loading..</h3>}

      {error && <h3 style={{ color: "red" }}>{error}</h3>}

      <div className={classes.input}>
        <label htmlFor="">
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
            language.title === "nl" ? "Nieuw Wachtwoord" : "Your New Password"
          }
        />
      </div>
      <div className={classes.input}>
        <label htmlFor="">
          {language.title === "nl" ? "Toegangscode" : "Access Code"}
        </label>
        <input
          value={accessCode}
          // disabled={!isSignIn ? true : false}
          onChange={(e) => {
            setAccessCode(e.target.value);
          }}
          type="text"
          required
          minLength={7}
          maxLength={10}
          placeholder={language.title === "nl" ? "Toegangscode" : "Access Code"}
        />
      </div>
      <Button type="submit" variant="contained">
        {language.title === "nl" ? "Indienen" : "Submit"}
      </Button>
      <br />
    </form>
  );
};

export default ResetPassword;
