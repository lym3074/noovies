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
};

export interface TV {
    backdrop_path:string
    first_air_date: string
    genre_ids: object
    id: number
    name: string
    origin_country: object
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string
    vote_average: number
    vote_count: number
}

export interface TVResponse extends BaseResponse {
    results: TV[]
};

export const moviesAPI = {
    trending: () => (
        fetch(`${BASE_URL}/movie/popular?language=en-US&page=1&api_key=${API_KEY}`)
        .then(res => res.json())
    ),
    upcoming: () => (
        fetch(`${BASE_URL}/movie/upcoming?language=en-US&page=1&api_key=${API_KEY}`)
        .then(res => res.json())
    ),
    nowPlaying: () => (
        fetch(`${BASE_URL}/movie/now_playing?language=en-US&page=1&api_key=${API_KEY}`)
        .then(res => res.json())
    ),
    search: ({queryKey}) => {
        const [_,query] = queryKey;
        return (
            fetch(`${BASE_URL}/search/movie?language=en-US&page=1&api_key=${API_KEY}&query=${query}`)
            .then(res => res.json())
        )
    }
}

export const tvAPI = {
    trending: () => (
        fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`)
        .then(res => res.json())
    ),
    airingToday: () => (
        fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`)
        .then(res => res.json())
    ),
    topRated: () => (
        fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`)
        .then(res => res.json())
    ),
    search: ({queryKey}) => {
        const [_,query] = queryKey;
        return (
            fetch(`${BASE_URL}/search/tv?language=en-US&page=1&api_key=${API_KEY}&query=${query}`)
            .then(res => res.json())
        )
    }
}