import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  SafeAreaView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import { addphoto } from "../reducers/user";
import { useDispatch } from "react-redux";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const user = useSelector((state) => state.user.value);

  // Récupération de la photo de profil depuis ses images persos et envoi dans coundinary
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const askForPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const pickImage = async () => {
    if (hasPermission) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      //console.log("result", result);
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
      const formData = new FormData();
      const uri = result.assets[0]?.uri;
      console.log("uri is", result.assets[0].uri);
      formData.append("photoFromFront", {
        uri: uri,
        name: "photo.jpg",
        type: "image/jpeg",
      });

      fetch("http://192.168.143.1:3000/users/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          data.result && dispatch(addphoto(data.url));
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        colors={["rgba(2,0,36,1)", "rgba(6,125,93,1)", "rgba(0,165,172,1)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.1, 0.4, 1]}
      />

      {hasPermission === null ? (
        <Text>Requesting for permission...</Text>
      ) : hasPermission === false ? (
        <View style={styles.containerProfil}>
          <Text>No access to media library</Text>
          <Button title='Grant Permission' onPress={askForPermission} />
        </View>
      ) : (
        <View style={styles.containerProfil}>
          {selectedImage && (
            <Image style={styles.imageProfil} source={{ uri: selectedImage }} />
          )}
          <FontAwesome
            name='pencil-square-o'
            size={20}
            style={styles.iconProfil}
            onPress={pickImage}
          />
          <View style={styles.containerHello}>
            <Text style={styles.hello}>
              Bonjour {user.firstName} {user.lastName}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  imageProfil: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  containerProfil: {
    alignItems: "center",
    paddingTop: 100,
  },
  iconProfil: {
    color: "white",
    paddingLeft: 100,
  },
  containerHello: {
    alignItems: "",
  },
  hello: {
    fontSize: 25,
  },
});
