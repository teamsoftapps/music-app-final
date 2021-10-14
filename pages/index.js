import HomePage from "../src/pagesContainer/homePage/HomePage";
import axios from "axios";

const index = ({ albums }) => <HomePage albums={albums} />;

export default index;

export async function getStaticProps() {
    const { data } = await axios.get(`http://localhost:5000/api/albums`);

    return {
        props: {
            albums: data,
            revalidate: 1800,
        },
    };
}
