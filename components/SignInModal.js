import { Pressable, Text, View, Modal, StyleSheet, Alert } from "react-native";

import { useState } from "react";

import { useDispatch } from "react-redux";
import { login } from "../reducers/user";

import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import FloatingTextInput from "./FloatingTextInput";

export default function SignInModal({ navigation, signInOpen, setSignInOpen }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      };
      const data = await fetch(
        "https://concept360-backend-five.vercel.app/users/signin",
        options
      ).then((r) => r.json());
      if (data.result) {
        await AsyncStorage.setItem("userToken", data.user.token);
        dispatch(login(data.user));
        setFormData({
          email: "",
          password: "",
        });
        navigation.navigate("TabNavigator", { screen: "Home" });
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Erreur", "Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  const updateValue = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCloseSignIn = () => {
    handleSignIn();
    setSignInOpen(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={signInOpen}
      onRequestClose={() => setSignInOpen(false)}
    >
      <View style={styles.modalView}>
        <FontAwesome
          name="times"
          size={30}
          style={styles.icon}
          onPress={() => setSignInOpen(false)}
        />
        <Text style={styles.text}>Connexion</Text>
        <FloatingTextInput
          value={formData.email}
          updateValue={updateValue}
          label="E-mail"
          name="email"
        />
        <FloatingTextInput
          value={formData.password}
          updateValue={updateValue}
          label="Mot de passe"
          name="password"
          secureTextEntry
        />
        <Pressable style={styles.connect} onPress={handleCloseSignIn}>
          <Text style={styles.btnText}>Connecter</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 40,
    marginTop: "50%",
    backgroundColor: "white",
    borderRadius: 5,
    paddingVertical: 30,
    paddingHorizontal: 50,
    alignItems: "center",
    gap: 25,
  },

  icon: {
    position: "absolute",
    color: "black",
    top: 8,
    right: 10,
  },

  text: {
    color: "black",
    fontSize: 20,
    fontWeight: "700",
  },

  connect: {
    borderRadius: 5,
    paddingHorizontal: 35,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: "#c2c2c2",
    justifyContent: "center",
    alignItems: "center",
  },

  btnText: {
    fontSize: 18,
  },
});
