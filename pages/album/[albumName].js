import AlbumPage from "../../src/pagesContainer/albumPage/AlbumPage";
import api from "../../services/api";

const index = ({ songs, album }) => {
;

console.log(songs ,"mn album page se songs hn ")
  return <AlbumPage songs={songs} album={album} />;
};

export default index;

export const getStaticPaths = async () => {
  const { data } = await api.get(`/api/albums`);

  const paths = data.map((curObj) => {
    return {
      params: {
        albumName: curObj.Album_Name.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };

};

export async function getStaticProps(context) {
  const { albumName } = context.params;

  console.log("albumName >>>>>>>>>>>>>>>", typeof albumName);
  if(!albumName){
    return
  }

  const { data } = await api.get(`/api/songs/${albumName}`);

 

  return {
    props: {
      songs: data[0],
      album: data[1],
    },
    revalidate: 1800,
  };
}
