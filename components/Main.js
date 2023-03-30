import React, { Component } from "react";
import { View, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FetchUser, FetchUserPosts } from "../redux/actions/index";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import FeedScreen from "./main/Feed";
import ProfileScreen from "./main/Profile";

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
  return null;
};

class Main extends Component {
  componentDidMount() {
    this.props.FetchUser();
    this.props.FetchUserPosts();
  }
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Feed"
        labeled={false}
        activeColor="green"
        barStyle={{ backgroundColor: "#777" }}
      >
        <Tab.Screen
          name="Feed"
          component={FeedScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Insert"
          component={EmptyScreen}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("Add");
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="plus-box" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-circle"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ FetchUser, FetchUserPosts }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
