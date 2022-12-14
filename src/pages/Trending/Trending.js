import axios from "axios";
import { useEffect, useState } from "react";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import "./trending.css";

const Trending = () => {
    const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );

    setContent(data.results);
  };

  useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {content &&
          content.map((con) => (
            <SingleContent
              key={con.id}
              id={con.id}
              poster={con.poster_path}
              title={con.title || con.name}
              date={con.first_air_date || con.release_date}
              media_type={con.media_type}
              vote_average={con.vote_average}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Trending;
