import axios from "axios";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: "en-US",
    include_adult: false,
  },
});

export const IMG = {
  poster: (path) => path ? `https://image.tmdb.org/t/p/w342${path}` : null,
  backdrop: (path) => path ? `https://image.tmdb.org/t/p/w1280${path}` : null,
};

export default tmdb;
