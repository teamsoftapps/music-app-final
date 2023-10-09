import { Drawer, List, ListItem } from "@material-ui/core";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import api from "./../../../services/api";
import {
  setLanguageMode,
  setSong,
  setSongs,
  setUser,
} from "./../../store/musicReducer";
import SideDrawer from "./../sideDrawer/SideDrawer";
import classes from "./Header.module.css";

const postSelector = (state) => state.music;

function Header() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [sideBar, setShowSidebar] = useState(false);
  const [expireDays, setExpireDays] = useState(0);
  const [checkCredentials, setCheckCredentials] = useState(null);
  const { user, language } = useSelector(postSelector, shallowEqual);
  const [userInfo, setUserInfo] = useState(user);

  const dispatch = useDispatch();

  const getLocationInfo = async () => {
    const { data } = await axios.get("https://api.db-ip.com/v2/free/self");
    if (data.countryCode === "NL") {
      dispatch(
        setLanguageMode({
          title: "nl",
          src: "nl-2.jpg",
        })
      );
      router.push(`${router.route}?lang=nl`);
    } else {
      router.push(router.route);
    }
  };

  const fetchExpiringDays = async () => {
    try {
      const { data } = await api.get(`/api/expiring-days/${user.email}`);

      if (data) {
        // console.log("API ExpiringDays Data >>>>>>>>", data);
        console.log("expiring api =====>", data?.data?.days);
        setExpireDays(data);
        localStorage.setItem("Expiring-Days-Api", JSON.stringify(data));
        if (data?.data?.days === null) {
          router.push("/extend-subscription");
        }
      }

      if (user) {
        setUserInfo({ ...user, expiringDays: data?.data?.days });
      }
    } catch (err) {
      console.error(
        "err?.response?.data?.message >>>>>>>>>>",
        err?.response?.data?.message
      );

      if (
        err?.response?.data?.message === "Your Subscription has been expired!"
      ) {
        if (typeof window !== "undefined") {
          // Perform localStorage action
          localStorage.removeItem("songArray");
          localStorage.removeItem("Expiring-Days-Api");
          localStorage.removeItem("subscriptionSongDetails");
          localStorage.removeItem("music-app-credentials");

          dispatch(setSong({}));
          dispatch(setSongs([]));
          dispatch(setUser(null));

          const trialObj = {
            expired: true,
            message: err?.response?.data?.message,
            email: err?.response?.data?.data?.user,
          };

          localStorage.setItem("trial-info", JSON.stringify(trialObj));

          router.replace("/extend-subscription");
        }
      } else {
        setError(err?.response?.data?.message);

        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchExpiringDays();
    }
  }, [user]);

  useEffect(() => {
    getLocationInfo();

    if (window.innerWidth < 992) {
      setShowSidebar(true);
    }

    window.addEventListener("resize", () => {
      setOpen(false);
      if (window.innerWidth < 992) {
        setShowSidebar(true);
      }
      if (window.innerWidth > 991) {
        setShowSidebar(false);
      }
    });
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  useEffect(() => {
    if (userInfo?.expiresIn || userInfo?.expiresIn === 0) {
      window.onbeforeunload = function () {
        if (typeof window !== "undefined") {
          // Perform localStorage action
          localStorage.removeItem("music-app-credentials");
        }

        // return "Do you really want to close?"; //prompts user
      };
    }

    let credentialsExist;

    if (typeof window !== "undefined") {
      // Perform localStorage action
      credentialsExist = localStorage.getItem("music-app-credentials");
    }

    setCheckCredentials(credentialsExist);
  }, [user]);

  // minor

  function handleToggle() {
    setOpen((preSrate) => !preSrate);
  }

  const handleSubscription = () => {
    // let body = {
    // }
    // try{
    //     let res =
    //     console.log(res)
    // }
    // catch(err){
    // console.error(err);
    // }
  };

  return (
    <header className={`${classes.header} ${classes.headerActive}`}>
      <div className={classes.headerTop}>
        {sideBar && (
          <div className={classes.headerLogo}>
            {userInfo?.expiresIn === undefined ? (
              <div
                className={classes.playlistMobile}
                // onClick={() => console.log("clicked")}
              >
                <SideDrawer />
              </div>
            ) : null}

            <Link href="/">
              <a>
                <Image
                  src={`/images/${
                    language.title === "nl" ? "logo_dutch" : "logo"
                  }.svg`}
                  alt={language.title}
                  width={200}
                  height={50}
                  layout="fixed"
                />
              </a>
            </Link>
            {user && (
              <>
                {
                  // userInfo?.expiresIn &&
                  userInfo?.expiresIn >= 0 ? (
                    <div className={classes.timer}>
                      <p>
                        Your Subscription Expires{" "}
                        {userInfo?.expiresIn === 0
                          ? "Today"
                          : `In ${userInfo?.expiresIn} Days`}{" "}
                      </p>
                    </div>
                  ) : (
                    // userInfo?.expiringDays &&
                    (userInfo?.expiringDays < 0 ||
                      userInfo?.expiringDays == null ||
                      userInfo?.expiringDays == undefined) && (
                      <div className={classes.timer}>
                        <p>Your Subscription has been Expired! </p>
                      </div>
                    )
                  )
                }
              </>
            )}
          </div>
        )}
      </div>
      {!sideBar && (
        <div className={classes.headerMain}>
          <div className={classes.headerMainImage}>
            {/* <div onClick={() => handleSubscription()} style={{ position: "fixed", left: "30px" }}>
                            Subscription
                        </div> */}
            {userInfo?.expiresIn === undefined && (
              <div className={classes.playlistDesktop}>
                {checkCredentials !== null && <SideDrawer />}
              </div>
            )}
            <Link href="/">
              <a>
                <Image
                  src={`/images/${
                    language.title === "nl" ? "logo_dutch" : "logo"
                  }.svg`}
                  alt=""
                  width={550}
                  height={150}
                  layout="intrinsic"
                />
              </a>
            </Link>
            {user && (
              <>
                {
                  // userInfo?.expiresIn &&
                  userInfo?.expiresIn >= 0 ? (
                    <div className={classes.timer}>
                      <p>
                        {language.title === "nl"
                          ? "Uw proefperiode verloopt."
                          : "Your Subscriptions Expires."}{" "}
                      </p>
                      <p>
                        {user?.expiresIn === 0
                          ? language.title === "nl"
                            ? "Vandaag"
                            : "Today"
                          : `In ${user?.expiresIn} ${
                              language.title === "nl" ? "Dagen" : "Days"
                            }`}
                      </p>
                    </div>
                  ) : (
                    // userInfo?.expiringDays &&
                    userInfo?.expiringDays >= 0 &&
                    userInfo?.expiringDays < 15 && (
                      <div className={classes.timer}>
                        <p>
                          {language.title === "nl"
                            ? "Uw proefperiode verloopt"
                            : "Your Subscription Expires"}{" "}
                          {userInfo?.expiringDays === 0
                            ? language.title === "nl"
                              ? "Vandaag"
                              : "Today"
                            : `In ${userInfo?.expiringDays} ${
                                language.title === "nl" ? "Dagen" : "Days"
                              }`}{" "}
                        </p>
                      </div>
                    )
                  )
                }
              </>
            )}
          </div>
          <nav className={classes.headerNavigation}>
            <ul>
              {nav.map(({ route, title }, i) =>
                user && title === "LOGIN" ? null : (
                  <li key={i}>
                    <Link href={route}>{title}</Link>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
      )}
      {/* {drawer} */}
    </header>
  );
}

export default Header;

const nav = [
  // {
  //     title: "STREAMING",
  //     route: "/",
  // },
  // {
  //     title: "HOME",
  //     route: "/",
  // },
  // {
  //     title: "CD STORE",
  //     route: "/",
  // },
  // {
  //     title: "SHEET MUSIC",
  //     route: "/",
  // },
  // {
  //     title: "BIOGRAPHY",
  //     route: "/",
  // },
  // {
  //     title: "NEW & EVENTS",
  //     route: "/",
  // },
  // {
  //     title: "GUESTBOOK",
  //     route: "/",
  // },
  // {
  //     title: "LOGIN",
  //     route: "",
  // },
];

// const languages = [
//   {
//     title: "nl",
//     src: "nl.jpg",
//   },
//   {
//     title: "eng",
//     src: "usa.jpg",
//   },
// ];
