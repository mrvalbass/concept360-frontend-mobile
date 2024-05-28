import {
  TouchableOpacity,
  Text,
  View,
  Modal,
  StyleSheet,
  Alert,
} from "react-native";
import FloatingTextInput from "./FloatingTextInput";
import { useDispatch } from "react-redux";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function SignUpModal({ navigation, signUpOpen, setSignUpOpen }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSignUp = async () => {
    try {
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
      ).then((res) => res.json());
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
    <Modal animationType="slide" transparent={true} visible={signUpOpen}>
      <View style={styles.modalView}>
        <Text style={styles.text}> Inscription</Text>
        <FontAwesome
          name="times"
          size={20}
          style={{ color: "black", paddingLeft: 220 }}
          onPress={() => setSignUpOpen(false)}
        />
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
        <View style={styles.containerConnect}>
          <TouchableOpacity style={styles.connect} onPress={handleCloseSignUp}>
            <Text>Connecter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 40,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    alignItems: "center",
    elevation: 5,
    gap: 25,
  },
  containerConnect: {
    borderWidth: 1,
    borderColor: "red",
  },

  connect: {
    borderRadius: 5,
    height: 39,
    paddingRight: 20,
    paddingBottom: 20,
    width: 100,
    borderWidth: 1.5,
    borderColor: "#c2c2c2",
  },

  text: {
    color: "black",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
});
