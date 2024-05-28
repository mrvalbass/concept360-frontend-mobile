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
import { login } from "../reducers/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function SignInModal({ navigation, signInOpen, setSignInOpen }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSignin = async () => {
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
    handleSignin();
    setSignInOpen(false);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={signInOpen}
        onRequestClose={() => setSignInOpen(false)}
      >
        <View style={styles.modalView}>
          <FontAwesome
            name="times"
            size={20}
            style={{ color: "black", paddingLeft: 220 }}
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
          />

          <View style={styles.containerConnect}>
            <TouchableOpacity
              style={styles.connect}
              onPress={handleCloseSignIn}
            >
              <Text style={styles.btnText}>Connecter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
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
  },
});
