import React, { useEffect, useState } from "react";
import styled from "styled-components/native"
import { ActivityIndicator, FlatList} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";

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

    const onRefresh = async() => {
        // setRefreshing(true);
        // await getData();
        // setRefreshing(false);
        // console.log("refresh")
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