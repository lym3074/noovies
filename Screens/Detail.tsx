import React, { useEffect } from "react";
import { styled } from "styled-components/native";
import { Dimensions, StyleSheet, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Movie, TV, moviesAPI, tvAPI } from "../api";
import Poster from "../components/Poster";
import { makeImgPath } from "../utils";
import { LinearGradient } from 'expo-linear-gradient';
import colors from "../const";
import { useQuery } from "react-query";

const {height: SCREEN_HEIGHT} = Dimensions.get("screen");

const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
    height: ${ SCREEN_HEIGHT/4 }px;
    justify-content: flex-end;
    padding: 0px 20px;
`;

const Background = styled.Image`

`;

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
    margin-top: 20px;
    padding: 0px 20px;
`;
type RootStackParamList = {
    Detail: Movie | TV
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">

const Detail: React.FC<DetailScreenProps> = ({
    navigation:{ setOptions },
    route : {params}
}) => {

    const {isLoading: moviesLoading, data: moviesData} = useQuery(["Movies", params.id], moviesAPI.detail,
    {
        enabled: "original_title" in params
    });
    
    const {isLoading: tvLoading, data: tvData} = useQuery(["Tv", params.id], tvAPI.detail,
    {
        enabled: "original_name" in params
    });

    console.log("movie", moviesData);
    useEffect(() => {
        setOptions({
            title: "original_title" in params
            ? "Movie"
            : "Tv Show"
        })
    },[])

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
            <OverView>{params.overview}</OverView>
        </Container>
    )
}

export default Detail;