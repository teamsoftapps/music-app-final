import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  Typography,
} from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import ALBUMIMAGE from "./../../../public/images/album.png";
import MELODYIMAGE from "./../../../public/images/melody.png";
import PRICEIMAGE from "./../../../public/images/price.png";
import PAYPALIMAGE from "./../../../public/images/pay_pal.svg";
import api from "./../../../services/api";
import styles from "./Subscriptions.module.css";

const postSelector = (state) => state.music;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const SubscriptionsPage = () => {
  console.log("Auth SubscriptionsPage >>>>>>>>");

  const { language } = useSelector(postSelector, shallowEqual);

  const router = useRouter();

  console.log("ALBUMIMAGE >>>>>>", ALBUMIMAGE);
  console.log("MELODYIMAGE >>>>>>", MELODYIMAGE);
  console.log("PRICEIMAGE >>>>>>", PRICEIMAGE);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={styles.card_container}>
      <Head>
        <title>
          Mulder Music Streaming |{" "}
          {language.title === "nl" ? "Abonnement" : "Subscription"}
        </title>
      </Head>

      <h1>{language.title === "nl" ? "Abonnement" : "Subscription"}</h1>

      <div className={styles.card}>
        <Card
          sx={{ width: "15rem", marginTop: "2rem", backgroundColor: "#CCB488" }}
        >
          <CardContent>
            <Typography
              color="#382b11"
              gutterBottom
              variant="h5"
              component="div"
            >
              Offer 1
            </Typography>
            <Box className={styles.description} mt="2rem">
              <Box className={styles.text}>
                <Typography variant="body2" color="text.secondary">
                  <Image src={ALBUMIMAGE} width={30} height={30} />
                  <span>Albums</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  5
                </Typography>
              </Box>
              <Box className={styles.text}>
                <Typography variant="body2" color="text.secondary" my="1rem">
                  <Image src={MELODYIMAGE} width={28} height={28} />
                  <span>Songs</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  10
                </Typography>
              </Box>
              <Box className={styles.text}>
                <Typography variant="body2" color="text.secondary">
                  <Image src={PRICEIMAGE} width={30} height={30} />
                  <span>Price</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  $200
                </Typography>
              </Box>
            </Box>
          </CardContent>
          <CardActions className={styles.btn_container}>
            <Button
              className={styles.avail_btn}
              size="small"
              onClick={handleOpen}
            >
              Avail
            </Button>
          </CardActions>
        </Card>
        <Card
          sx={{ width: "15rem", marginTop: "2rem", backgroundColor: "#CCB488" }}
        >
          <CardContent>
            <Typography
              color="#382b11"
              gutterBottom
              variant="h5"
              component="div"
            >
              Offer 2
            </Typography>
            <Box className={styles.description} mt="2rem">
              <Box className={styles.text}>
                <Typography variant="body2" color="text.secondary">
                  <Image src={ALBUMIMAGE} width={30} height={30} />
                  <span>Albums</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  10
                </Typography>
              </Box>
              <Box className={styles.text}>
                <Typography variant="body2" color="text.secondary" my="1rem">
                  <Image src={MELODYIMAGE} width={28} height={28} />
                  <span>Songs</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  20
                </Typography>
              </Box>
              <Box className={styles.text}>
                <Typography variant="body2" color="text.secondary">
                  <Image src={PRICEIMAGE} width={30} height={30} />
                  <span>Price</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  $400
                </Typography>
              </Box>
            </Box>
          </CardContent>
          <CardActions className={styles.btn_container}>
            <Button
              className={styles.avail_btn}
              size="small"
              onClick={handleOpen}
            >
              Avail
            </Button>
          </CardActions>
        </Card>
        <Card
          sx={{ width: "15rem", marginTop: "2rem", backgroundColor: "#CCB488" }}
        >
          <CardContent>
            <Typography
              color="#382b11"
              gutterBottom
              variant="h5"
              component="div"
            >
              Offer 3
            </Typography>
            <Box className={styles.description} mt="2rem">
              <Box className={styles.text}>
                <Typography variant="body2" color="text.secondary">
                  <Image src={ALBUMIMAGE} width={30} height={30} />
                  <span>Albums</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  15
                </Typography>
              </Box>
              <Box className={styles.text}>
                <Typography variant="body2" color="text.secondary" my="1rem">
                  <Image src={MELODYIMAGE} width={28} height={28} />
                  <span>Songs</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  30
                </Typography>
              </Box>
              <Box className={styles.text}>
                <Typography variant="body2" color="text.secondary">
                  <Image src={PRICEIMAGE} width={30} height={30} />
                  <span>Price</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  $600
                </Typography>
              </Box>
            </Box>
          </CardContent>
          <CardActions className={styles.btn_container}>
            <Button
              className={styles.avail_btn}
              size="small"
              onClick={handleOpen}
            >
              Avail
            </Button>
          </CardActions>
        </Card>
      </div>

      <div className={styles.modal}>
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style} className={styles.pay_pal_container}>
            <Typography variant="h5" color="#000000" textAlign="center" mb={2}>
              Payment via PayPal
            </Typography>
            <form action="http://localhost:5000/api/paypal" method="post">
              <Button type="submit">
                <Image src={PAYPALIMAGE} width="100%" height="30px" />
              </Button>
            </form>
            {/* <input type="submit" value="Buy" /> */}
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default SubscriptionsPage;
