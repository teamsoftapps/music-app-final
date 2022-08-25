import HomePage from "../src/pagesContainer/homePage/HomePage";
import axios from "axios";
// import Loader from "react-loader-spinner";

const index = ({ albums }) => <HomePage albums={albums} />;
// const [isLoading, setLoading] = useState(false);

export default index;

export async function getStaticProps() {
  // setLoading(true);
  const { data } = await axios.get(`${process.env.base_url}/albums`);

  return {
    props: {
      albums: data,
      revalidate: 20,
    },
  };
}
