import React from "react";
import { View, Text, ScrollView, FlatList, RefreshControl } from "react-native";
import { useQuery, useQueryClient,  } from "react-query";
import { tvAPI } from "../api";
import Loader from "../components/Loader";
import VMedia from "../components/VMedia";
import HList, { HListSeparator } from "../components/HList";

const Tv = () => {
    const qeuryClient = useQueryClient();

    const {isLoading: todayLoading, data: todayData, isRefetching: todayRefetching } = useQuery(["tv", "today"], tvAPI.airingToday);
    const {isLoading: topLoading, data: topData, isRefetching: topRefetching } = useQuery(["tv", "top"], tvAPI.topRated);
    const {isLoading: trendingLoading, data: trendingData, isRefetching: trendingRefetching } = useQuery(["tv", "trending"], tvAPI.trending);

    const loading = todayLoading || topLoading || trendingLoading;
    
    const refreshing = todayRefetching || topRefetching || trendingRefetching;

    const onRefresh = () => {
        qeuryClient.refetchQueries(["tv"]);
    }

    if (loading ) {
        return <Loader />
    }

    return (
        <ScrollView contentContainerStyle={{paddingVertical: 20}}
        refreshControl={<RefreshControl 
            onRefresh={onRefresh}
            refreshing={refreshing}
        />}
        >
            <HList 
                title={"Trending TV"}
                data={trendingData.results}
            />
            <HList
                title={"Airing Today"}
                data={todayData.results}
            />
            <HList
                title={"Top Rated"}
                data={topData.results}
            />
        </ScrollView>
    )
    
}

export default Tv;