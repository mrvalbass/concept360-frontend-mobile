import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import { addPhoto } from "../reducers/user";
import { useDispatch } from "react-redux";
import CalendarInline from "./CalendarAgenda";

export default function Profil({}) {
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(null);
  const user = useSelector((state) => state.user.value);

  //Récupération de la photo de profil depuis ses images persos et envoi dans coundinary
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
      //console.log("result is", result);
      if (!result.canceled) {
        dispatch(addPhoto(result.assets[0].uri));
      }
      const formData = new FormData();
      const uri = result.assets[0]?.uri;
      //console.log("uri is", result.assets[0].uri);
      if (uri) {
        formData.append("photoFromFront", {
          uri: uri,
          name: "photo.jpg",
          type: "image/jpeg",
        });
        formData.append("token", user.token);
      }

      console.log("form is", formData);
      const data = await fetch(
        // "http://192.168.143.1:3000/users/upload",
        "https://concept360-backend-five.vercel.app/users/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((response) => response.json());
      console.log("CLOUDINARY", data);
      data.result && dispatch(addPhoto(data.url));
    }
  };
  return (
    <SafeAreaView>
      {hasPermission === null ? (
        <Text>Requesting for permission...</Text>
      ) : hasPermission === false ? (
        <View style={styles.containerProfil}>
          <Text>No access to media library</Text>
          <Button title="Grant Permission" onPress={askForPermission} />
        </View>
      ) : (
        <View style={styles.containerProfil}>
          {user.profilePictureURL && (
            <Image
              style={styles.imageProfil}
              source={{ uri: user.profilePictureURL }}
            />
          )}
          <FontAwesome
            name="pencil-square-o"
            size={20}
            style={styles.iconProfil}
            onPress={pickImage}
          />
          <View style={styles.containerHello}>
            <Text style={styles.hello}>Bonjour {user.firstName}</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    color: "#fff",
  },
});
