const API_KEY = 'ef0d1a8e7f2e44edcc57e73fdd30ad39';
const BASE_URL = 'https://api.themoviedb.org/3'

export const getTrending = () => (
    fetch(`${BASE_URL}/movie/popular?language=en-US&page=1&api_key=${API_KEY}`)
    .then(res => res.json())
)
    
export const getUpcoming = () => (
    fetch(`${BASE_URL}/movie/upcoming?language=en-US&page=1&api_key=${API_KEY}`)
    .then(res => res.json())
)
export const getNowPlaying = () => (
    fetch(`${BASE_URL}/movie/now_playing?language=en-US&page=1&api_key=${API_KEY}`)
    .then(res => res.json())
)