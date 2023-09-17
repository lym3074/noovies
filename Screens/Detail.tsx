import React, { useEffect } from "react";
import { styled } from "styled-components/native";
import { Dimensions, StyleSheet, Linking } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Movie, MovieResponse, TV, TVResponse, moviesAPI, tvAPI } from "../api";
import Poster from "../components/Poster";
import { makeImgPath } from "../utils";
import { LinearGradient } from 'expo-linear-gradient';
import colors from "../const";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import {Ionicons} from "@expo/vector-icons"
import * as WebBrowser from 'expo-web-browser';

const {height: SCREEN_HEIGHT} = Dimensions.get("screen");

const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
    height: ${ SCREEN_HEIGHT/4 }px;
    justify-content: flex-end;
    padding: 0px 20px;
`;

const Background = styled.Image``;

const Column = styled.View`
    flex-direction : row;
    width : 80%;
`;

const Title = styled.Text`
    color: white;
    font-size: 36px;
    margin-left: 15px;
    font-weight: 500;
    align-self: flex-end;
`;

const OverView = styled.Text`
    color: ${(prop)=> prop.theme.textColor};
    margin: 20px 0px;
`;

const Data = styled.View`
    padding: 0px 20px;
`;

const VideoButton = styled.TouchableOpacity`
    flex-direction: row;
    width : 90%;
`;
const ButtonText = styled.Text`
    font-weight: 600;
    color: white;
    margin-bottom: 10px;
    line-height: 24px;
    margin-left: 10px;
`

type RootStackParamList = {
    Detail: Movie | TV
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">

const Detail: React.FC<DetailScreenProps> = ({
    navigation:{ setOptions },
    route : {params}
}) => {

    const isMovie = "original_title" in params ? true : false;

    const {isLoading, data} = useQuery<MovieResponse | TVResponse>([
        isMovie?"Movies": "TV", 
        params.id
    ], isMovie? moviesAPI.detail:tvAPI.detail);

    useEffect(() => {
        setOptions({
            title: isMovie
            ? "Movie"
            : "Tv Show"
        })
    },[]);

    const openYTLink = async (videoKey: string) => {
        const baseUrl = `https://m.youtube.com/watch?v=${videoKey}`;

        // await Linking.openURL(baseUrl);
        // canOpenURL도 있다.
        // setting - ex) location을 허용하지 않은 유저에게 허용해달라고 설정을 열어준다.

        await WebBrowser.openBrowserAsync(baseUrl);
    }

    return (
        <Container>
            <Header>
                <Background 
                    style={StyleSheet.absoluteFill}
                    source={{uri: makeImgPath(params.backdrop_path) || ""}}
                />
                <LinearGradient 
                    colors={['transparent', colors.blackPerl]}
                    style={StyleSheet.absoluteFill}
                />
                <Column>
                    <Poster path={params.poster_path || ""}/>
                    <Title> {
                            "original_title" in params
                            ? params.original_title
                            : params.original_name
                        }
                    </Title>
                </Column>
            </Header>
            <Data>
                <OverView>{params.overview}</OverView>
                {isLoading? <Loader />: null}
                {data?.videos?.results?.map(video => (
                    <VideoButton
                        key={video.key}
                        onPress={() => openYTLink(video.key)}
                    >
                        <Ionicons name="logo-youtube" color={"red"} size={24} />
                        <ButtonText numberOfLines={1}>{video.name}</ButtonText>
                    </VideoButton>
                ))}
            </Data>
            
        </Container>
    )
}

export default Detail;