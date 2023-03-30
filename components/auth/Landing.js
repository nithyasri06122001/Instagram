import React from "react";
import { Text, View, Button } from "react-native";

export default function Landing({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 10,
        alignItems: "center",
      }}
    >
      <View
        style={{
          height: 120,
          width: 120,
        }}
      >
        <Button
          title="Register"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
      <View style={{ height: 120, width: 120, alignContent: "center" }}>
        <Button title="Login" onPress={() => navigation.navigate("Login")} />
      </View>
    </View>
  );
}
