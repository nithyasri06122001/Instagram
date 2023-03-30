import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";
import firebase from "firebase/compat/app";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.onSignIn = this.onSignIn.bind(this);
  }
  onSignIn() {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
        <TextInput
          placeholder="email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          style={{ paddingBottom: 20, paddingTop: 20 }}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />
        <Button onPress={() => this.onSignIn()} title="Sign In" />
      </View>
    );
  }
}

export default Login;
