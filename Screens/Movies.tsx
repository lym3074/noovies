import React, { useEffect, useState } from "react";
import styled from "styled-components/native"
import { ActivityIndicator, StyleSheet, useColorScheme } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions } from "react-native";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur";
import Swiper from "react-native-swiper";
import Slide from "../components/slide";

const Container = styled.ScrollView``;
const Loader = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const API_KEY = 'ef0d1a8e7f2e44edcc57e73fdd30ad39';
const {height: SCREEN_HEIGHT} = Dimensions.get("screen");
const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
    
    const [loading, setLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);

    const getTrending = async () => {
        const {results} = await (
            await fetch(
                `https://api.themoviedb.org/3/movie/trending?api_key=${API_KEY}`
            )
        ).json();

        setTrending(results);
    }

    const getUpcoming = async () => {
        const {results} = await (
            await fetch(
                `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=${API_KEY}`
            )
        ).json();

        setUpcoming(results);
    }

    const getNowPlaying = async () => {
        const {results} = await (
            await fetch(
                `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${API_KEY}`
            )
        ).json();

        setNowPlaying(results);
        setLoading(false);
    };

    const getDat = async () => {
        await Promise.all([getNowPlaying(), getTrending(), getUpcoming()])
        setLoading(false);
    }

    useEffect(() => {
        getNowPlaying();
    }, []);
    
    return (loading ? 
    <Loader >
        <ActivityIndicator />
    </Loader> 
    :
    <Container>
        <Swiper
            horizontal
            showsButtons={false}
            autoplay
            autoplayTimeout={3.5}
            showsPagination={false}
            loop
            containerStyle={{width: "100%", height: SCREEN_HEIGHT/4}}
        >
            {nowPlaying.map(movie => (
                <Slide
                    backdropPath={movie.backdrop_path}
                    voteAverage={movie.vote_average}
                    posterPath={movie.poster_path}
                    originalTitle={movie.original_title}
                    overview={movie.overview}
                    key={movie.id} 
                />
            ))}
            
        </Swiper>
    </Container>
    );
}

export default Movies;