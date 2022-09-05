import Footer from "./../../src/components/footer";

const index = () => {
  return (
    <>
      <div
        style={{
          justifyContent: "center",
          textAlign: "center",
          padding: "10.5rem",
        }}
      >
        <h3>wait your email is verifying </h3>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Footer />
      </div>
    </>
  );
};

export default index;
