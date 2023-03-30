import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import LoginScreen from "./components/auth/Login";
import MainScreen from "./components/Main";
import AddScreen from "./components/main/Add";
import SaveScreen from "./components/main/Save";
import { View, Text } from "react-native";

import { Provider } from "react-redux";
// import { applyMiddleware } from "redux";
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";

const store = configureStore({ reducer: rootReducer }, applyMiddleware(thunk));

const Stack = createStackNavigator();
const firebaseConfig = {
  apiKey: "AIzaSyCMPDtBdQVQ_LEtsHGJpyW52tpi8jkRRPc",
  authDomain: "instagram-clone-1804b.firebaseapp.com",
  projectId: "instagram-clone-1804b",
  storageBucket: "instagram-clone-1804b.appspot.com",
  messagingSenderId: "680666752219",
  appId: "1:680666752219:web:08e0fe62153b6eadeed8fe",
  measurementId: "G-95WBLG0KXS",
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    const { loaded, loggedIn } = this.state;
    if (!loaded) {
      return (
        <View
          style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
        >
          <Text>Loading</Text>
        </View>
      );
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: true }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    if (loggedIn) {
      return (
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Main"
                component={MainScreen}
                options={{ headerShown: true }}
              />

              <Stack.Screen
                name="Add"
                component={AddScreen}
                navigation={this.props.navigation}
              />
              <Stack.Screen
                name="Save"
                component={SaveScreen}
                options={{ headerShown: true }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      );
    }
  }
}
