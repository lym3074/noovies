import React, { useEffect, useState } from "react";
import styled from "styled-components/native"
import { ActivityIndicator, FlatList} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";
import { useQuery } from "react-query";
import { moviesAPI } from "../api";

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

const ComingsoonTitle = styled(ListTitle)`
    margin-bottom: 30px;
`;

const VSeparator = styled.View`
    height: 20px;
`

const HSeparator = styled.View`
    width: 20px;
`

const renderVMedia = ({item}) => (
    <VMedia 
        // key={movie.id}
        posterPath={item.poster_path} // Key Extracter : 각 리스트 아이템에 어떤 key를 가져야 할 지 알려준다.
        originalTitle={item.original_title}
        voteAverage={item.vote_average}
    />
)

const renderHMedia = ({item}) => (
    <HMedia
        posterPath={item.poster_path}
        originalTitle={item.original_title}
        voteAverage={item.vote_average}
        overview={item.overview}
        releaseDate={item.release_date}
    />
)

const movieKeyExtractor = (item) => item.id + "";


const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
    const [refreshing, setRefreshing] =useState(false);

    const {isLoading: nowPlayingLoading, data: nowPlayingData} = useQuery(
        "nowPlaying",
        // caching을 위한 키, 동일 pathing을 막아준다. rn query 캐시로 넘어가서 다른 컴포넌트에 가더라도 동일한 key의 쿼리를 사용할 수 있다.
         moviesAPI.nowPlaying
    )
    const {isLoading: trendingLoading, data: trendingData} = useQuery("trending", moviesAPI.trending)
    const {isLoading: upcomingLoading, data: upcomingData} = useQuery("upcoming", moviesAPI.upcoming)
    
    const loading = nowPlayingLoading || trendingLoading || upcomingLoading;

    const onRefresh = async() => {
    }

    return (loading ? 
    <Loader >
        <ActivityIndicator />
    </Loader> 
    :
    <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={upcomingData.results}
        keyExtractor={movieKeyExtractor}
        ItemSeparatorComponent={VSeparator}
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
                {nowPlayingData.results.map(movie => (
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
                    data={trendingData.results}
                    horizontal
                    keyExtractor={movieKeyExtractor}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 20}}
                    ItemSeparatorComponent={HSeparator}
                    renderItem={renderVMedia}
                    
                />
            </ListContainer>
            
            <ComingsoonTitle>Comming Soon</ComingsoonTitle>
        </>
        )}
        renderItem={renderHMedia}
    />  
    );
}

export default Movies;