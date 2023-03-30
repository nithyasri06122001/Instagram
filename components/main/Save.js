import React, { useState } from "react";
import { View, TextInput, Image, Button } from "react-native";
import firebase from "firebase/compat/app";
require("firebase/compat/auth");
require("firebase/compat/firestore");
require("firebase/compat/storage");

import { StackActions } from "@react-navigation/native";

const Save = (props, { navigation }) => {
  //   console.log(props.route.params.image);
  const [caption, setCaption] = useState("");
  const uploadImage = async () => {
    const uri = props.route.params.image;
    console.log(firebase.auth().currentUser.uid);
    const childPath = `post/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;
    console.log(childPath);
    const response = await fetch(uri);
    const blob = await response.blob();
    const task = firebase.storage().ref().child(childPath).put(blob);
    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };
    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
        console.log(snapshot);
      });
    };
    const taskError = (snapshot) => {
      console.log(snapshot);
    };
    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };
  const savePostData = (downloadURL) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        downloadURL,
        caption,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        // navigation.popToTop()
        navigation.dispatch(StackActions.popToTop());
      });
  };
  return (
    <View style={{ flex: 1, padding: 30 }}>
      <Image
        style={{ width: "100%", height: "50%" }}
        source={{ uri: props.route.params.image }}
      />
      <TextInput
        style={{ paddingBottom: 30, paddingTop: 30 }}
        placeholder="Write a Caption..."
        onChangeText={(caption) => setCaption(caption)}
      />
      <Button title="Save" onPress={() => uploadImage()}></Button>
    </View>
  );
};

export default Save;
