const API_KEY = 'ef0d1a8e7f2e44edcc57e73fdd30ad39';
const BASE_URL = 'https://api.themoviedb.org/3'

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