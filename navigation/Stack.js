import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "../Screens/Detail";
import {useColorScheme} from 'react-native';
import colors from "../const";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
    const isDark = useColorScheme() === 'dark';

    return (
        <NativeStack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
                headerStyle: {
                    backgroundColor: isDark? colors.blackPerl : "#fff",
                },
                headerTitleStyle: { color: isDark?colors.white:colors.blackPerl },
            }}
        >
            <NativeStack.Screen name="Detail" component={Detail} />
        </NativeStack.Navigator>
    )
}

export default Stack;