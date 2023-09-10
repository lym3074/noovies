import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Tv from "../Screens/Tv";
import Movies from "../Screens/Movies";
import Search from "../Screens/Search.tsx";
import { View, Text } from "react-native";
import {useColorScheme} from 'react-native';
import colors from "../const";
import {Ionicons} from "@expo/vector-icons";
import Stack from "./Stack";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    const isDark = useColorScheme() === 'dark';

    return (
        <Tab.Navigator
        sceneContainerStyle={{
            backgroundColor: isDark? colors.blackPerl : "#fff"
        }}
        
        screenOptions={{
            unmountOnBlur: true, // component를 떠나면 unmount
            tabBarStyle: { backgroundColor: isDark? colors.blackPerl : colors.white },
            tabBarActiveTintColor: isDark? "#ffa801" : colors.blackPerl,
            tabBarInactiveTintColor: isDark? colors.simpleGray : colors.darkGray,
            headerStyle: { backgroundColor: isDark? colors.blackPerl:colors.white, },
            headerTitleStyle: { color: isDark?colors.white:colors.blackPerl },
            tabBarLabelStyle: {fontSize: 12, fontWeight: "600", marginTop: -5}
        }}>
            <Tab.Screen name="Movies" component={Movies} options={{
                tabBarIcon: (({color, size}) => (<Ionicons name={"film-outline"} size={size} color={color} />))
            }}/>
            <Tab.Screen name="TV" component={Tv} options={{
                tabBarIcon: (({color, size}) => (<Ionicons name="tv-outline" size={size} color={color} />))
            }}/>
            <Tab.Screen name="Search" component={Search} options={{
                tabBarIcon: (({color, size}) => (<Ionicons name= {"search-outline"} size={size} color={color} />))
            }}/>
        </Tab.Navigator>
    )
}

export default Tabs;