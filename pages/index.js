import HomePage from "../src/pagesContainer/homePage/HomePage";
import api from "./../services/api";
export async function getStaticProps() {
  const  albums = await api.get("api/albums");
  return {
    props: {
      albums: albums.data,
      revalidate: 1800,
    },
  };
}

const index = ({ albums}) =>{ 
return<HomePage albums={albums}/>};  
export default index;
