import React from "react";
import styled from "styled-components/native"
import { StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-web-swiper";
import { Dimensions } from "react-native";

const Container = styled.ScrollView`
    background-color: ${(props)=> props.theme.mainBgColor}
`
const View = styled.View`
    flex: 1
`;

const API_KEY = 'ef0d1a8e7f2e44edcc57e73fdd30ad39';

const {height: SCREEN_HEIGHT} = Dimensions.get("screen");

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
    const url = fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`)
    return (
        <Container>
            <Swiper
                loop
                timeout={2}
                controlsEnabled={false}
                containerStyle={{width: "100%", height: SCREEN_HEIGHT/4}}
            >
                <View style={{backgroundColor: "red"}}></View>
                <View style={{backgroundColor: "blue"}}></View>
                <View style={{backgroundColor: "red"}}></View>
                <View style={{backgroundColor: "blue"}}></View>
            </Swiper>
        </Container>
    );
}

export default Movies;