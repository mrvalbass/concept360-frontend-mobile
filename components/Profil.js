import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Linking,
  Modal,
  Pressable,
} from "react-native";

import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addPhoto } from "../reducers/user";

import * as ImagePicker from "expo-image-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Profil({ editable, greeting }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    (async () => {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    })();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
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

        const data = await fetch(
          // "http://192.168.143.1:3000/users/upload",
          "https://concept360-backend-five.vercel.app/users/upload",
          {
            method: "POST",
            body: formData,
          }
        ).then((r) => r.json());
        data.result && dispatch(addPhoto(data.url));
      }
    } else {
      setShowModal(true);
    }
  };
  return (
    <SafeAreaView>
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        style={styles.modal}
      >
        <View style={styles.modalView}>
          <FontAwesome
            name="times"
            size={25}
            style={styles.closeIcon}
            onPress={() => setShowModal(false)}
          />
          <Text style={styles.modalText}>
            Vous devez donner l'autorisation à Concept 360 d'accéder à vos
            médias
          </Text>
          <Pressable
            style={styles.btn}
            onPress={() => {
              Linking.openSettings();
              setShowModal(false);
            }}
          >
            <Text style={styles.btnText}>Paramètres</Text>
          </Pressable>
        </View>
      </Modal>
      <View style={styles.containerProfil}>
        {user.profilePictureURL && (
          <Image
            style={styles.imageProfil}
            source={{ uri: user.profilePictureURL }}
          />
        )}
        {editable && (
          <FontAwesome
            name="pencil-square-o"
            size={20}
            style={styles.iconProfil}
            onPress={pickImage}
          />
        )}
      </View>
      {greeting && (
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Bonjour {user.firstName}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    padding: 20,
    width: "75%",
    marginHorizontal: "auto",
    marginVertical: "auto",
    borderRadius: 5,
    alignItems: "center",
    gap: 20,
  },

  closeIcon: {
    position: "absolute",
    right: 10,
    top: 8,
  },

  modalText: {
    marginTop: 10,
    fontSize: 18,
    lineHeight: 30,
    textAlign: "center",
  },

  btn: {
    borderRadius: 5,
    paddingHorizontal: 35,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: "#c2c2c2",
    alignSelf: "flex-end",
  },

  btnText: {
    fontSize: 16,
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
    color: "white",
    position: "absolute",
    bottom: 0,
    right: "40%",
  },

  greetingContainer: {
    marginTop: 20,
  },

  greeting: {
    textAlign: "center",
    fontSize: 25,
    color: "#fff",
  },
});
