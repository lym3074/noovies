import React, { useEffect, useState } from "react";
import styled from "styled-components/native"
import { ActivityIndicator, ScrollView, StyleSheet, useColorScheme } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions } from "react-native";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur";
import Swiper from "react-native-swiper";
import Slide from "../components/slide";
import Poster from "../components/poster";

const Container = styled.ScrollView``;
const Loader = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const API_KEY = 'ef0d1a8e7f2e44edcc57e73fdd30ad39';
const {height: SCREEN_HEIGHT} = Dimensions.get("screen");

const ListTitle = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: 600;
    margin-left: 30px;
`;

const TrendingScroll = styled.ScrollView`
    margin-top: 20px;
`;

const Movie = styled.View`
    margin-right: 15px;
    align-items: center;
`;

const Title = styled.Text`
    color: white;
    font-weight: 600;
    margin-top: 7px;
    margin-bottom: 5px;
`;
const Votes = styled.Text`
    color: rgba(255,255,255,0.7);
    font-size: 12px;
`;
const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
    
    const [loading, setLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);

    const getTrending = async () => {
        const {results} = await (
            await fetch(
                `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${API_KEY}`
            )
        ).json();
        console.log(results)
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

    const getData = async () => {
        await Promise.all([getNowPlaying(), getTrending(), getUpcoming()])
        setLoading(false);
    }

    useEffect(() => {
        getData();
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
            containerStyle={{width: "100%", height: SCREEN_HEIGHT/4, marginBottom: 30}}
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
        <ListTitle>Trending Movies</ListTitle>
        {/** 스크롤 뷰 자체에 스타일을 주면 끝까지 안간다. */}
        <TrendingScroll
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingLeft: 30}}
        > 
            {trending.map(movie => (
            <Movie key={movie.id}>
                <Poster path={movie.poster_path} />
                <Title>{movie.original_title.slice(0, 13)}
                {movie.original_title.length > 13 && "..."}
                </Title>
                <Votes>⭐️{movie.vote_average}/10</Votes>
            </Movie>))}
        </TrendingScroll>
    </Container>
    );
}

export default Movies;