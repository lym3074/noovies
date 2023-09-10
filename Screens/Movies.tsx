import React, { useEffect, useState } from "react";
import styled from "styled-components/native"
import { ActivityIndicator, FlatList, RefreshControl, ScrollView, StyleSheet, View, useColorScheme } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions } from "react-native";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import Poster from "../components/Poster";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";

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

const ListContainer = styled.View`
    margin-bottom: 30px;
`;

const TrendingScroll = styled.FlatList`
    margin-top: 20px;
`;

const Movie = styled.View`
    margin-right: 15px;
    align-items: center;
`;

const HMovie = styled.View`
    padding: 0px 30px;
    flex-direction: row;
    margin-bottom: 30px;
`;

const HColumn = styled.View`
    margin-left: 15px;
    width: 80%;
`;

const Overview = styled.Text`
    color: white;
    width: 80%;
`;

const Release = styled.Text`
    color: white;
    font-size: 12px;
    margin-vertical: 10px;
`;

const ComingsoonTitle = styled(ListTitle)`
    margin-bottom: 30px;
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
    const [refreshing, setRefreshing] =useState(false);
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

    const onRefresh = async() => {
        setRefreshing(true);
        await getData();
        setRefreshing(false);
        console.log("refresh")
    }
    
    return (loading ? 
    <Loader >
        <ActivityIndicator />
    </Loader> 
    :
    <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={upcoming}
        keyExtractor={(item) => item.id + ""}
        ItemSeparatorComponent={() => <View style={{height:20}}></View>}
        ListHeaderComponent={() => (
            <>
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
            <ListContainer>
                <ListTitle>Trending Movies</ListTitle>
                <TrendingScroll 
                    data={trending}
                    horizontal
                    keyExtractor={(item) => item.id + ""}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 20}}
                    ItemSeparatorComponent={() => <View style={{width:20}}></View>}
                    renderItem={({item}) => <VMedia 
                        // key={movie.id}
                        posterPath={item.poster_path} // Key Extracter : 각 리스트 아이템에 어떤 key를 가져야 할 지 알려준다.
                        originalTitle={item.original_title}
                        voteAverage={item.vote_average}
                    />}
                    
                />
            </ListContainer>
            
            <ComingsoonTitle>Comming Soon</ComingsoonTitle>
        </>
        )}
        renderItem={({item}) => (
            <HMedia
                posterPath={item.poster_path}
                originalTitle={item.original_title}
                voteAverage={item.vote_average}
                overview={item.overview}
                releaseDate={item.release_date}
            />
        )}
    />  
    );
}

// date :
// new Date("2021-10-06").toLocaleDateString("ko")
// -> 2023. 7. 19

// new Date("2021-10-06").toLocaleDateString("ko", {month: "long"})
// -> '10월'

// new Date("2021-10-06").toLocaleDateString("ko", {month: "long", day: "numeric"})
// -> '10월 6일'

// new Date("2021-10-06").toLocaleDateString("ko", {month: "long", day: "numeric", year: "numeric"})
// -> '2021년 10월 6일'



export default Movies;