import React, { ReactNode } from "react";
import { FlatList } from "react-native";
import { styled } from "styled-components/native";
import VMedia from "./VMedia";

interface HListProps {
    title: string;
    data: any[];
}

const ListTitle = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: 600;
    margin-left: 30px;
    margin-bottom: 20px;
`;

export const HListSeparator = styled.View`
    width: 20px;
`;

const ListContainer = styled.View`
    margin-bottom: 40px;
`;

const HList: React.FC<HListProps> = ({title, data}) => {
    return (
        <ListContainer>
            <ListTitle>{title}</ListTitle>
            <FlatList 
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={HListSeparator}
                contentContainerStyle={{paddingHorizontal: 30}}
                keyExtractor={(item) => item.id + ""}
                renderItem={({item}) => (
                    <VMedia 
                        posterPath = {item.poster_path}
                        originalTitle = {item.original_name ?? item.original_title}
                        voteAverage = {item.vote_average}
                    />
                )}
            />
        </ListContainer>
    )
}

export default HList;