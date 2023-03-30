import React from "react";
import { View, Text, FlatList } from "react-native";
import { connect } from "react-redux";
function Profile(props) {
  const { currentUser } = props;
  console.log({ currentUser });
  return (
    <View>
      <Text>{currentUser.name}</Text>
    </View>
  );
}
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, null)(Profile);
