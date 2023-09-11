const API_KEY = 'ef0d1a8e7f2e44edcc57e73fdd30ad39';
const BASE_URL = 'https://api.themoviedb.org/3';

interface BaseResponse {
    page: number;
    total_results: number;
    total_pages: number;
};



export interface Movie {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface MovieResponse extends BaseResponse {
    results: Movie[]
}

const trending = () => (
    fetch(`${BASE_URL}/movie/popular?language=en-US&page=1&api_key=${API_KEY}`)
    .then(res => res.json())
)
    
const upcoming = () => (
    fetch(`${BASE_URL}/movie/upcoming?language=en-US&page=1&api_key=${API_KEY}`)
    .then(res => res.json())
)

const nowPlaying = () => (
    fetch(`${BASE_URL}/movie/now_playing?language=en-US&page=1&api_key=${API_KEY}`)
    .then(res => res.json())
)

export const moviesAPI = {trending, upcoming, nowPlaying}