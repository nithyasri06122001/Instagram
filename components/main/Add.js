import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

export default function Add({ navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [status, requestGalleryPermission] = ImagePicker.useCameraPermissions();

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
      console.log(image);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setGallery(result.assets[0].uri);
    }
  };

  if (!permission && !status) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted && !status.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera and gallery
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={"4:3"}
        />
      </View>
      <Button onPress={toggleCameraType} title="Flip Image"></Button>
      <Button title="Take Picture" onPress={() => takePicture()} />
      <Button title="Pick Image From Gallery" onPress={() => pickImage()} />
      <Button
        title="Save"
        onPress={() => navigation.navigate("Save", { image })}
      />
      {image && (
        <Image
          source={{
            uri: image,
          }}
          style={{ flex: 1 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 0.5,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
