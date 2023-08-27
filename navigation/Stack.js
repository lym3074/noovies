import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, TouchableOpacity } from "react-native";

const ScreenOne = ({navigation: {navigate}}) => (
    <TouchableOpacity onPress={() => navigate("Two")}>
        <View>
            <Text>go to two</Text>
        </View>
    </TouchableOpacity>
)
const ScreenTwo = ({navigation: {navigate}}) => (
    <TouchableOpacity onPress={() => navigate("Three")}>
        <View>
            <Text>go to three</Text>
        </View>
    </TouchableOpacity>
)
const ScreenThree = ({navigation: {setOptions, navigate}}) => (
    <TouchableOpacity onPress={() => navigate("Tabs", {screen: "Search"})}>
        <View>
            <Text>go to search</Text>
        </View>
    </TouchableOpacity>
)

const NativeStack = createNativeStackNavigator();

const Stack = () => (
<NativeStack.Navigator screenOptions={{headerBackTitleVisible: false}}>
    <NativeStack.Screen name="One" component={ScreenOne}/>
    <NativeStack.Screen name="Two" component={ScreenTwo}/>
    <NativeStack.Screen name="Three" component={ScreenThree}/>
</NativeStack.Navigator>)

export default Stack;