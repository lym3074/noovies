import React, { useEffect, useState } from "react";
import styled from "styled-components/native"
import { ActivityIndicator, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-web-swiper";
import { Dimensions } from "react-native";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur";

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

const API_KEY = 'ef0d1a8e7f2e44edcc57e73fdd30ad39';

const BgImg = styled.Image`
`;

const Title = styled.Text`
`

const {height: SCREEN_HEIGHT} = Dimensions.get("screen");

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
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
            loop
            timeout={2}
            controlsEnabled={false}
            containerStyle={{width: "100%", height: SCREEN_HEIGHT/4}}
        >
            {nowPlaying.map(movie => 
            <View key={movie.id}>
                <BgImg 
                    style={StyleSheet.absoluteFill}
                    source={{uri: makeImgPath(movie.backdrop_path)}} />
                <BlurView style={StyleSheet.absoluteFill} intensity={80}>
                    <Title>{movie.original_title}</Title>
                </BlurView>
            </View>)}
            
        </Swiper>
    </Container>
    );
}

export default Movies;