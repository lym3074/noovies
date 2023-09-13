import React, { useState } from "react";
import { useQuery } from "react-query";
import { styled } from "styled-components/native";
import { moviesAPI, tvAPI } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

const Container = styled.View``;

const SearchBar = styled.TextInput`
    background-color: white;
    padding: 10px 15px;
    border-radius: 15px;
    width: 90%;
    margin: 10px auto;
    margin-bottom: 40px;
`;


const Search = () => {
    const [query, setQuery] = useState("");
    const onChangeText = (text: string) => setQuery(text);

    const {isLoading : moviesLoading, data : movieData, refetch: searchMovies} = useQuery(["searchMovies", query], moviesAPI.search,{enabled:false})
    const {isLoading : tvLoading, data : tvData, refetch: searchTv} = useQuery(["searchTv", query], tvAPI.search,{enabled:false})
    const onSubmit: any = (query:string) => {
        if(query === "") return;

        // alert("search")
        searchMovies();
        searchTv();
        
    }
    console.log(moviesLoading, movieData)
    return (
        <Container>
            <SearchBar
                placeholder="Search for Movie or Tv Show"
                placeholderTextColor={"grey"}
                returnKeyType="search"
                onChangeText={onChangeText}
                onSubmitEditing={onSubmit}
                // autoCapitalize={"none"}
                // autoCorrect={false}
            />
            {moviesLoading || tvLoading && <Loader />}
            {movieData && <HList title="Search Result for Movies" data={movieData.results} />}
            {tvData && <HList title="Search Result for Tv" data={tvData.results}/>}
        </Container>
    )

}

export default Search;