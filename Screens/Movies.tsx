import React from "react";
import styled from "styled-components/native"
import { StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const Button = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.mainBgColor};
`;

const Title = styled.Text`
    color: ${(props) => props.theme.textColor};
`

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({navigation}) => (
    <Button onPress={() => navigation.navigate("Stack", {screen: "Three"})}>
        <Title>Movie</Title>
    </Button>
);

const styles = StyleSheet.create({
    mainTitle: { flex: 1, justifyContent: "center", alignItems:"center"}
});

export default Movies;