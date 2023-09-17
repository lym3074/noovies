import React, { useEffect, useState } from "react";
import styled from "styled-components/native"
import { ActivityIndicator, FlatList} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";
import { useQuery, QueryClient, useQueryClient, useInfiniteQuery } from "react-query";
import {  MovieResponse, moviesAPI } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

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
        fullData={item}
    />
)

const movieKeyExtractor = (item) => item.id + "";

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
    const qeuryClient = useQueryClient();
    const [refreshing, setRefreshing] = useState(false);

    const {
        isLoading: nowPlayingLoading,
        data: nowPlayingData,
    } = useQuery<MovieResponse>(
        ["movies","nowPlaying"], // caching을 위한 키, 동일 pathing을 막아준다. rn query 캐시로 넘어가서 다른 컴포넌트에 가더라도 동일한 key의 쿼리를 사용할 수 있다.
         moviesAPI.nowPlaying
    )
    const {
        isLoading: trendingLoading,
         data: trendingData,
    } = useQuery<MovieResponse>(
        ["movies","trending"],
        moviesAPI.trending
    );
    
    const {
        isLoading: upcomingLoading,
        data: upcomingData,
        hasNextPage,
        fetchNextPage
    } = useInfiniteQuery<MovieResponse>(
        ["movies","upcoming"],
        moviesAPI.upcoming,
        {
            getNextPageParam : (currentPage) => {
                const nextPage = currentPage.page + 1;
                if(nextPage > currentPage.total_pages) {
                    return null;
                }

                return currentPage.total_pages >= nextPage ? nextPage : null
            }
        }
    )
    
    const loading = nowPlayingLoading || trendingLoading || upcomingLoading;
    // const refreshing = isRefetchingNowPlaying || isRefetchingTrending || isRefetchingUpcoming;
    
    const onRefresh = async() => {
        setRefreshing(true);

        await qeuryClient.refetchQueries(["movies"]);
        
        setRefreshing(false);

        // console.log(Object.keys(nowPlayingData?.results[0]))
        // console.log(Object.values(nowPlayingData?.results[0]).map(v => typeof v))
    };

    const loadMore = async() => {
        if(hasNextPage) {
            fetchNextPage();
        }
    }

    console.log(upcomingData)

    return (loading ? 
    <Loader />
    :
    upcomingData && <FlatList
        refreshing={refreshing}
        onEndReached={loadMore}
        // onEndReachedThreshold={0.4} // 실행시키는 목록의 하단에서 내용 끝까지의 거리
        onRefresh={onRefresh}
        data={upcomingData.pages.map(page => page.results).flat()}
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
                {nowPlayingData?.results.map(movie => (
                    <Slide
                        backdropPath={movie.backdrop_path || ""}
                        posterPath={movie.poster_path || ""}
                        voteAverage={movie.vote_average}
                        originalTitle={movie.original_title}
                        overview={movie.overview}
                        key={movie.id}
                        fullData={movie}
                    />
                ))}
                
            </Swiper>
            <HList title={"Trending Movies"} data={trendingData.results}/>
            <ComingsoonTitle>Comming Soon</ComingsoonTitle>
        </>
        )}
        renderItem={renderHMedia}
    />);
}

export default Movies;

/*{
"pageParams": [undefined],
"pages": [
  {"dates": [Object], "page": 1, "results": [Array], "total_pages": 18, "total_results": 348}
  {"dates": [Object], "page": 2, "results": [Array], "total_pages": 18, "total_results": 348}
  {"dates": [Object], "page": 3, "results": [Array], "total_pages": 18, "total_results": 348}
  {"dates": [Object], "page": 4, "results": [Array], "total_pages": 18, "total_results": 348}
  ]
}*/