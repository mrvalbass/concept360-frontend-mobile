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
import CalendarInline from "../components/CalendarAgenda";

export default function HomeScreen({ _id }) {
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

      if (!result.canceled) {
        dispatch(addPhoto(result.assets[0].uri));
      }
      const formData = new FormData();
      const uri = result.assets[0]?.uri;
      console.log("uri is", result.assets[0].uri);
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
          {user.profilePictureURL && (
            <Image
              style={styles.imageProfil}
              source={{ uri: user.profilePictureURL }}
            />
          )}
          <FontAwesome
            name='pencil-square-o'
            size={20}
            style={styles.iconProfil}
            color='white'
            onPress={pickImage}
          />
          <View style={styles.containerHello}>
            <Text style={styles.hello}>Bonjour {user.firstName}</Text>
          </View>
          <View style={styles.calendar}>
            <ScrollView>
              <CalendarInline />
            </ScrollView>
          </View>
          <Text style={styles.title}>Activité du jour</Text>
          <ProgramCard />
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
