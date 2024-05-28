import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addPhoto } from "../reducers/user";

import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import CalendarInline from "../components/calendarAgenda";
import ProgramCard from "../components/ProgramCard";

export default function HomeScreen({}) {
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(null);
  const user = useSelector((state) => state.user.value);

  //Récupération de la photo de profil depuis ses images persos et envoi dans coundinary
  // Possible de demander la permission une fois a la première co et après dès qu'on veut changer la photo si on a dit non au début ?
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
        aspect: [1, 1],
        quality: 1,
      });
      //Possible de retirer ? un peu long a charger mais l'image ne saute pas
      if (!result.canceled) {
        dispatch(addPhoto(result.assets[0].uri));
      }
      const formData = new FormData();
      const uri = result.assets[0]?.uri;
      if (uri) {
        formData.append("photoFromFront", {
          uri: uri,
          name: "photo.jpg",
          type: "image/jpeg",
        });
        formData.append("token", user.token);
      }
      const options = {
        method: "POST",
        body: formData,
      };
      const data = await fetch(
        // "http://192.168.143.1:3000/users/upload",
        "https://concept360-backend-five.vercel.app/users/upload",
        options
      ).then((r) => r.json());
      data.result && dispatch(addPhoto(data.url));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={StyleSheet.absoluteFillObject}
        colors={["#034A37", "#067D5D", "#00A5AC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.1, 0.4, 1]}
      />
      {/* Voir la question plus haut sur la demande de permission*/}
      {hasPermission === null ? (
        <Text>Requesting for permission...</Text>
      ) : hasPermission === false ? (
        <View style={styles.containerProfil}>
          <Text>No access to media library</Text>
          <Button title="Grant Permission" onPress={askForPermission} />
        </View>
      ) : (
        <>
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
              color="white"
              onPress={pickImage}
            />
          </View>
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>Bonjour {user.firstName}</Text>
          </View>
          <ScrollView>
            <CalendarInline />
          </ScrollView>
          <ProgramCard />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerProfil: {
    alignItems: "center",
    marginTop: 100,
  },

  imageProfil: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  iconProfil: {
    position: "absolute",
    color: "white",
    right: "40%",
    bottom: 0,
  },

  greetingContainer: {
    marginTop: 20,
  },

  greeting: {
    textAlign: "center",
    color: "white",
    fontSize: 25,
  },

  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    marginBottom: 5,
  },
});
