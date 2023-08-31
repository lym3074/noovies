import React, { useEffect, useState } from "react";
import styled from "styled-components/native"
import { ActivityIndicator, StyleSheet, useColorScheme } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions } from "react-native";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur";
import Swiper from "react-native-swiper";

const Container = styled.ScrollView`
`
const View = styled.View`
    flex: 1;
`;

const Loader = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Poster = styled.Image`
    width: 100px;
    height: 160px;
    border-radius: 5px;
`;

const Title = styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: white;
`;

const OverView = styled.Text`
    margin-top: 10px;
    color: rgba(255,255,255,0.6);
`;

const Votes = styled(OverView)`
    font-size: 12px;
`;

const Wrapper = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height : 100%;
`;
const Column = styled.View`
    width: 40%;
    margin-left: 15px;
    `;

const API_KEY = 'ef0d1a8e7f2e44edcc57e73fdd30ad39';

const BgImg = styled.Image`
`;



const {height: SCREEN_HEIGHT} = Dimensions.get("screen");

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
    const isDark = useColorScheme() === "dark"? true: false;
    const [loading, setLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState([]);
    const getNowPlaying = async () => {
        const {results} = await (
            await fetch(
                `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${API_KEY}`
            )
        ).json();

        setNowPlaying(results);
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
            {nowPlaying.map(movie => 
            <View key={movie.id}>
                <BgImg 
                    style={StyleSheet.absoluteFill}
                    source={{uri: makeImgPath(movie.backdrop_path)}} />
                <BlurView style={StyleSheet.absoluteFill} intensity={90} tint={isDark?"dark":"light"} >
                    <Wrapper>
                        <Poster source={{uri: makeImgPath(movie.poster_path)}}/>
                        <Column>
                            <Title>{movie.original_title}</Title>
                            {movie.vote_average > 0 &&<Votes>⭐️{movie.vote_average}/10</Votes>}
                            <OverView>{movie.overview.slice(0, 90)}...</OverView>
                            
                        </Column>
                    </Wrapper>
                </BlurView>
            </View>)}
            
        </Swiper>
    </Container>
    );
}

export default Movies;