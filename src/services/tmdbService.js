const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

if (!TMDB_API_KEY) {
  console.error('TMDB API Key is missing. Please set REACT_APP_TMDB_API_KEY in your .env file.');
}

const makeRequest = async (endpoint) => {
  try {
    const separator = endpoint.includes('?') ? '&' : '?';
    const response = await fetch(`${TMDB_BASE_URL}${endpoint}${separator}api_key=${TMDB_API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`TMDB API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('TMDB API request failed:', error);
    throw error;
  }
};

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return 'https://via.placeholder.com/500x750/cccccc/666666?text=No+Image';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const getPopularMovies = async (page = 1) => {
  try {
    const data = await makeRequest(`/movie/popular?page=${page}`);
    return {
      movies: data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster: getImageUrl(movie.poster_path),
        backdrop: getImageUrl(movie.backdrop_path, 'w1280'),
        releaseDate: movie.release_date,
        rating: movie.vote_average,
        voteCount: movie.vote_count,
        genres: movie.genre_ids
      })),
      totalPages: data.total_pages,
      totalResults: data.total_results,
      currentPage: data.page
    };
  } catch (error) {
    console.error('Failed to fetch popular movies:', error);
    throw error;
  }
};

export const getTrendingMovies = async (timeWindow = 'day') => {
  try {
    const data = await makeRequest(`/trending/movie/${timeWindow}`);
    return data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster: getImageUrl(movie.poster_path),
      backdrop: getImageUrl(movie.backdrop_path, 'w1280'),
      releaseDate: movie.release_date,
      rating: movie.vote_average,
      voteCount: movie.vote_count
    }));
  } catch (error) {
    console.error('Failed to fetch trending movies:', error);
    throw error;
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    if (!query.trim()) {
      return { movies: [], totalPages: 0, totalResults: 0, currentPage: 1 };
    }
    
    const data = await makeRequest(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`);
    return {
      movies: data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster: getImageUrl(movie.poster_path),
        backdrop: getImageUrl(movie.backdrop_path, 'w1280'),
        releaseDate: movie.release_date,
        rating: movie.vote_average,
        voteCount: movie.vote_count
      })),
      totalPages: data.total_pages,
      totalResults: data.total_results,
      currentPage: data.page
    };
  } catch (error) {
    console.error('Failed to search movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const [movieData, creditsData] = await Promise.all([
      makeRequest(`/movie/${movieId}`),
      makeRequest(`/movie/${movieId}/credits`)
    ]);
    
    // Find director from crew
    const director = creditsData.crew.find(person => person.job === 'Director');
    
    // Get top cast members
    const cast = creditsData.cast.slice(0, 10).map(person => person.name);
    
    return {
      id: movieData.id,
      title: movieData.title,
      overview: movieData.overview,
      poster: getImageUrl(movieData.poster_path),
      backdrop: getImageUrl(movieData.backdrop_path, 'w1280'),
      releaseDate: movieData.release_date,
      runtime: movieData.runtime,
      rating: movieData.vote_average,
      voteCount: movieData.vote_count,
      genres: movieData.genres,
      productionCompanies: movieData.production_companies,
      budget: movieData.budget,
      revenue: movieData.revenue,
      tagline: movieData.tagline,
      status: movieData.status,
      originalLanguage: movieData.original_language,
      originalTitle: movieData.original_title,
      homepage: movieData.homepage,
      director: director ? director.name : 'N/A',
      cast: cast
    };
  } catch (error) {
    console.error('Failed to fetch movie details:', error);
    throw error;
  }
};

export const getMovieCredits = async (movieId) => {
  try {
    const data = await makeRequest(`/movie/${movieId}/credits`);
    return {
      cast: data.cast.slice(0, 10).map(person => ({
        id: person.id,
        name: person.name,
        character: person.character,
        profilePath: getImageUrl(person.profile_path, 'w185')
      })),
      crew: data.crew.slice(0, 5).map(person => ({
        id: person.id,
        name: person.name,
        job: person.job,
        department: person.department,
        profilePath: getImageUrl(person.profile_path, 'w185')
      }))
    };
  } catch (error) {
    console.error('Failed to fetch movie credits:', error);
    throw error;
  }
};

export const getSimilarMovies = async (movieId) => {
  try {
    const data = await makeRequest(`/movie/${movieId}/similar`);
    return data.results.slice(0, 6).map(movie => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster: getImageUrl(movie.poster_path),
      releaseDate: movie.release_date,
      rating: movie.vote_average
    }));
  } catch (error) {
    console.error('Failed to fetch similar movies:', error);
    throw error;
  }
};

export const getMovieVideos = async (movieId) => {
  try {
    const data = await makeRequest(`/movie/${movieId}/videos`);
    return data.results
      .filter(video => video.site === 'YouTube')
      .map(video => ({
        id: video.id,
        key: video.key,
        name: video.name,
        type: video.type,
        site: video.site,
        youtubeUrl: `https://www.youtube.com/watch?v=${video.key}`,
        thumbnailUrl: `https://img.youtube.com/vi/${video.key}/mqdefault.jpg`
      }));
  } catch (error) {
    console.error('Failed to fetch movie videos:', error);
    throw error;
  }
};

export const getGenres = async () => {
  try {
    const data = await makeRequest('/genre/movie/list');
    return data.genres;
  } catch (error) {
    console.error('Failed to fetch movie genres:', error);
    throw error;
  }
};

export const discoverMovies = async (options = {}) => {
  try {
    const {
      page = 1,
      genre = '',
      year = '',
      sortBy = 'popularity.desc',
      minRating = ''
    } = options;
    
    let endpoint = `/discover/movie?page=${page}&sort_by=${sortBy}`;
    
    if (genre) endpoint += `&with_genres=${genre}`;
    if (year) endpoint += `&year=${year}`;
    if (minRating) endpoint += `&vote_average.gte=${minRating}`;
    
    const data = await makeRequest(endpoint);
    return {
      movies: data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster: getImageUrl(movie.poster_path),
        backdrop: getImageUrl(movie.backdrop_path, 'w1280'),
        releaseDate: movie.release_date,
        rating: movie.vote_average,
        voteCount: movie.vote_count,
        genreIds: movie.genre_ids
      })),
      totalPages: data.total_pages,
      totalResults: data.total_results,
      currentPage: data.page
    };
  } catch (error) {
    console.error('Failed to discover movies:', error);
    throw error;
  }
};

const tmdbService = {
  getPopularMovies,
  getTrendingMovies,
  searchMovies,
  getMovieDetails,
  getMovieCredits,
  getSimilarMovies,
  getMovieVideos,
  getGenres,
  discoverMovies,
  getImageUrl
};

export default tmdbService;