import { Button, FormControlLabel, Typography } from "@material-ui/core";
import Checkbox from "@mui/material/Checkbox";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import api from "./../../../services/api";
import styles from "./Signup.module.css";
import { codes } from '../../data/data';
import Image from "next/image";

const postSelector = (state) => state.music;

const SignupPage = () => {
  // console.log("Auth SignupPage >>>>>>>>");





  const router = useRouter();

  const { email: userEmail, access_code } = router.query;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkBox, setCheckBox] = useState(false);
  const [premiumAccessCode, setPremiumAccessCode] = useState('');


  const { language, user } = useSelector(postSelector, shallowEqual);

  useEffect(() => {
    setEmail(userEmail !== "" ? userEmail : "");
    setVerificationCode(access_code !== "" ? access_code : "");
  }, [userEmail, access_code]);

  // console.log("Codes==>", codes)




  useEffect(() => {
    if (codes.includes(verificationCode)) {
      setPremiumAccessCode('PREMIUM');
      return;
    } else if (verificationCode == 'premium' || verificationCode == 'PREMIUM' || verificationCode == 'Premium') {
      setPremiumAccessCode('PREMIUM');
      return;
    } else if (verificationCode == 'ldtrial' || verificationCode == 'LDTRIAL' || verificationCode == 'Ldtrial') {
      setPremiumAccessCode('LDTRIAL');
      return;
    } else {
      setPremiumAccessCode(verificationCode);
      return;
    }

  }, [verificationCode]);




  // useEffect(() => {
  //   if (user) {
  //     router.replace("/");
  //   } else {
  //     router.replace("/signup");
  //   }

  //   // if(!user){
  //   //   router.replace(`/signup?email=${email}&&access_code=${access_code}`)
  //   // }

  // }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      let payload = {
        email: email.toLowerCase(),
        password,
        code: premiumAccessCode.toUpperCase(),
      };

      const { data } = await api.post("/api/signup", payload);

      if (data) {
        if (typeof window !== "undefined") {
          // Perform localStorage action

          localStorage.setItem("success", data?.message);
        }

        setLoading(false);

        router.push("/login");
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

  const signupTextEng = "Sign Up";
  const signupTextNl = "Aanmelden";

  const codePromiseText =
    language.title === "nl"
      ? " Ik beloof dat dit account alleen door mij zal worden gebruikt en niet om de inhoud met anderen te delen."
      : " I promise this account will only be used by me, and not to share any of the content with others.";

  return (
    <form
      autoComplete="off"
      onSubmit={(e) => handleSubmit(e)}
      className={styles.auth}
    >
      <Head>
        <title>
          {language.title === "nl"
            ? "Mulder muziekstreaming"
            : "Mulder Music Streaming"}{" "}
          | {language.title === "nl" ? signupTextNl : signupTextEng}
        </title>
      </Head>

      <h1>{language.title === "nl" ? signupTextNl : signupTextEng}</h1>

      {loading && <h3>Loading..</h3>}
      {error && <h3 style={{ color: "red" }}>{error}</h3>}

      <div className={styles.input}>
        <div style={{ display: "flex", alignItems: "center" }}>

          <div>
            <Image src='/images/email2.png' alt="email" width={100} height={100} />
          </div>
          <div style={{ flex: 1, marginLeft: -80 }}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

      <div className={styles.input}>

        <div style={{ display: "flex", alignItems: "center" }}>

          <div>
            <Image src='/images/password2.png' alt="email" width={100} height={100} />
          </div>
          <div style={{ flex: 1, marginLeft: -80 }}>
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
                language.title === "nl" ? "Voer wachtwoord in" : "Enter Password"
              }
            />
          </div>
        </div>
      </div>

      <div className={styles.input}>


        <div style={{ display: "flex", alignItems: "center" }}>

          <div>
            <Image src='/images/person2.png' alt="email" width={100} height={100} />
          </div>
          <div style={{ flex: 1, marginLeft: -80 }}>
            <input
              value={verificationCode}
              type="text"
              onChange={(e) => {
                setVerificationCode(e.target.value);
              }}
              required
              minLength={6}
              maxLength={36}
              placeholder={
                language.title === "nl"
                  ? "Voer toegangscode in"
                  : "Enter Access Code"
              }
            />
          </div>
        </div>
      </div>

      <br />

      <FormControlLabel
        style={{ display: "flex", color: '#fff', justifyContent: "center", alignItems: "center" }}
        color="#fff"
        control={
          <Checkbox
            color="default"
            value={checkBox}
            onClick={() => setCheckBox(!checkBox)}
            style={{ marginTop: -25 }}
          />
        }
        label={<Typography style={{ color: "#fff" }}>{codePromiseText}</Typography>}
      />

      <Button type="submit" variant="contained">
        {language.title === "nl" ? signupTextNl : signupTextEng}
      </Button>

      <br />

      <p style={{ color: '#fff' }}>
        <span style={{ color: '#fff' }} onClick={() => router.push("/login")}>
          {language.title === "nl"
            ? "Heb je al een account? Nu inloggen"
            : "Already have an account? Now Login"}
        </span>
      </p>
      <br />
      <a target="_blank" href="https://janmulder.us/store/?album=Streaming">
        {language.title === "nl"
          ? "Door je aan te melden, ga je akkoord met onze algemene voorwaarden."
          : "By Signing up, you are agree to follow our terms & conditions."}
      </a>
    </form>
  );
};

export default SignupPage;

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
