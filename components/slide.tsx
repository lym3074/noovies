import { BlurView } from "expo-blur";
import React from "react";
import { View, StyleSheet, useColorScheme, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native/";
import { makeImgPath } from "../utils";
import Poster from "./Poster";
import { useNavigation } from "@react-navigation/native";
import { Movie, TV } from "../api";


const Title = styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: white;
`;

const OverView = styled.Text`
    margin-top: 10px;
    color: rgba(255,255,255,0.8);
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

const BgImg = styled.Image`
`;

interface SlideProps {
    backdropPath: string;
    voteAverage: number;
    posterPath: string;
    originalTitle: string;
    overview: string;
    fullData: Movie | TV;
}

const Slide: React.FC<SlideProps> = ({
    backdropPath,
    voteAverage,
    posterPath,
    originalTitle,
    overview,
    fullData
}) => {
    const isDark = useColorScheme() === "dark"? true: false;
    const navigation = useNavigation();
    const goToDetail = () => {
        navigation.navigate("Stack", {
            screen: "Detail",
            params: {
              ...fullData
          }})
    }
    return (
        <TouchableWithoutFeedback onPress={goToDetail}>
            <View style={{flex: 1}}>
                <BgImg 
                    style={StyleSheet.absoluteFill}
                    source={{uri: makeImgPath(backdropPath)}} />
                <BlurView style={StyleSheet.absoluteFill} intensity={90} tint={isDark?"dark":"light"} >
                    <Wrapper>
                        <Poster path={posterPath}/>
                        <Column>
                            <Title>{originalTitle}</Title>
                            {voteAverage > 0 &&<Votes>⭐️{voteAverage}/10</Votes>}
                            <OverView>{overview.slice(0, 90)}...</OverView>
                            
                        </Column>
                    </Wrapper>
                </BlurView>
            </View>
        </TouchableWithoutFeedback>
    )
};

export default Slide