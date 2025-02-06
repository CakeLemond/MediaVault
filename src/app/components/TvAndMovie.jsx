import MovieFilter from "./MovieFilter";

const TvAndMovie = ({ genreMovieList, genreTvList, FilmArray, TvArray }) => {
  return (
    <div className="w-full h-screen mt-12 mb-96 ">
      <MovieFilter
        genres={genreMovieList.genres}
        type={"movie"}
        FilmArray={FilmArray}
      />
      <MovieFilter genres={genreTvList.genres} type={"tv"} TvArray={TvArray} />
    </div>
  );
};

export default TvAndMovie;
