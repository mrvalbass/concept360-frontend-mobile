import { Pressable, Text, View, Modal, StyleSheet, Alert } from "react-native";

import { useState } from "react";

import { useDispatch } from "react-redux";
import { login } from "../reducers/user";

import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import FloatingTextInput from "./FloatingTextInput";

export default function SignUpModal({ navigation, signUpOpen, setSignUpOpen }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const emailTest = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    ///^[a-zA-Z0-9]+([\._%+-][a-zA-Z0-9]+)@[a-zA-Z0-9]+([\.-][a-zA-Z0-9]+)\.[a-zA-Z]{2,}$/i;

    if (!regex.test(email)) {
      return false;
    }
    const domain = email.split("@")[1];
    if (domain.includes("..")) {
      return false;
    }
    if (/^[-.]/.test(domain) || /[-.]$/.test(domain)) {
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    try {
      if (!emailTest(formData.email)) throw new Error("Email non conforme");

      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          state: "patient",
        }),
      };
      const data = await fetch(
        "https://concept360-backend-five.vercel.app/users/signup",
        options
      ).then((r) => r.json());
      if (data.result) {
        await AsyncStorage.setItem("userToken", data.newUser.token);
        dispatch(login(data.newUser));
        setFormData({
          firstName: "",
          lastName: "",
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

  const handleCloseSignUp = () => {
    handleSignUp();
    setSignUpOpen(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={signUpOpen}
      onRequestClose={() => setSignUpOpen(false)}
    >
      <View style={styles.modalView}>
        <FontAwesome
          name="times"
          size={30}
          style={styles.icon}
          onPress={() => setSignUpOpen(false)}
        />
        <Text style={styles.text}> Inscription</Text>
        <FloatingTextInput
          value={formData.firstName}
          updateValue={updateValue}
          label="Prénom"
          name="firstName"
        />
        <FloatingTextInput
          value={formData.lastName}
          updateValue={updateValue}
          label="Nom"
          name="lastName"
        />
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
        <Pressable style={styles.connect} onPress={handleCloseSignUp}>
          <Text style={styles.btnText}>Connecter</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 40,
    marginTop: "30%",
    backgroundColor: "#ffffff",
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
