import {
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  View,
  Pressable,
  Alert,
} from "react-native";
import { Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Modal } from "react-native";
import FloatingTextInput from "../components/floatingTextInput";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginSuccess, logout } from "../actions/authActions";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",

    password: "",
  });
  const [inData, setInData] = useState({
    email: "",
    password: "",
  });

  const updateValue = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setInData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Inscription uniquement patient et envoie des informations à la base de données
  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "http://192.168.143.1:3000/users/signup",
        {
          firstName: formData.firstname,
          lastName: formData.lastname,
          email: formData.email,
          password: formData.password,
          state: "patient",
        }
      );

      const data = await response.data;
      console.log("Data is", data);
      console.log("Response is", response.data);

      if (response.status === 200 && data.token) {
        await AsyncStorage.setItem("userToken", data.token);
        setToken(response.data.token);

        console.log("Token is", response.data.token);

        // dispatch(
        //   login({
        //     firstname: formData.firstname,
        //     lastname: formData.lastname,
        //     email: formData.email,
        //     token: data.token,
        //   })
        // );

        dispatch(loginSuccess(formData));

        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
        });

        navigation.navigate("TabNavigator", { screen: "Home" });
      }
    } catch (err) {
      Alert.alert("Erreur", "Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  //Connexion et récupération du token pour avoir accès aux infos du client
  const handleSignin = async () => {
    try {
      const response = await axios.post(
        "http://192.168.143.1:3000/users/signin",
        {
          email: inData.email,
          password: inData.password,
        }
      );
      const data = await response.data;

      console.log("data is", data);
      console.log("dataToken", data.token);
      if (response.status === 200 && data.token) {
        await AsyncStorage.setItem("userToken", data.token);
        setToken(response.data.token);
        console.log("setTokent ", token);

        // dispatch(
        //   login({
        //     email: inData.email,
        //     password: inData.password,
        //     token: data.token,
        //   })
        // );

        dispatch(loginSuccess(inData));

        setInData({
          email: "",
          password: "",
        });

        navigation.navigate("TabNavigator", { screen: "Home" });
      }
    } catch (err) {
      Alert.alert("Erreur", "Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  const handleOpenSignUp = () => {
    setSignUpOpen(true);
  };
  const handleCloseSignUp = () => {
    handleSignUp();
    setSignUpOpen(false);
  };
  const handleOpenSignIn = () => {
    setSignInOpen(true);
  };
  const handleCloseSignIn = () => {
    handleSignin();
    setSignInOpen(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Video
        source={require("../assets/videoLogin.mp4")}
        rate={1.0}
        volume={1.0}
        isMuted={true}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.containerBtn}>
        <Modal animationType="slide" transparent={true} visible={signUpOpen}>
          <View style={styles.modalView}>
            <Text style={styles.text}> Inscription</Text>
            <FloatingTextInput
              // On envoie la value du useState objet
              value={formData.firstname}
              // On récupère la valeur onChange de l'input enfant (inverse data flow)
              updateValue={updateValue}
              // On envoie le label en Français (affichage)
              label="Prénom"
              // On envoie la clée à modifier
              name="firstname"
            />
            <FloatingTextInput
              value={formData.lastname}
              updateValue={updateValue}
              label="Nom"
              name="lastname"
            />
            <FloatingTextInput
              value={formData.email}
              updateValue={updateValue}
              label="E-mail"
              name="email"
            />
            {/* <FloatingTextInput
              value={formData.phone}
              updateValue={updateValue}
              label="Numéro de téléphone"
              name="phone"
            /> */}
            <FloatingTextInput
              value={formData.password}
              updateValue={updateValue}
              label="Mot de passe"
              name="password"
            />
            <View style={styles.containerConnect}>
              <TouchableOpacity
                style={styles.connect}
                onPress={handleCloseSignUp}
              >
                <Text>Connecter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <LinearGradient
          style={styles.gradient}
          colors={[
            "rgba(2,0,36,0.7)",
            "rgba(6,125,93,0.7)",
            "rgba(0,165,172,0.7)",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          locations={[0.1, 0.5, 1]}
        >
          <TouchableOpacity
            onPress={() => setSignUpOpen(!signUpOpen)}
            style={styles.button}
          >
            <Text style={[{ color: "white" }, styles.textInput]}>Sign-up</Text>
          </TouchableOpacity>
          <Modal animationType="slide" transparent={true} visible={signInOpen}>
            <View style={styles.modalView}>
              <Text style={styles.text}>Connexion</Text>

              <FloatingTextInput
                value={inData.email}
                updateValue={updateValue}
                label="E-mail"
                name="email"
              />
              <FloatingTextInput
                value={inData.password}
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
        </LinearGradient>

        <TouchableOpacity
          onPress={() => setSignInOpen(!signInOpen)}
          style={[styles.button, styles.color]}
        >
          <Text style={styles.textInput}>Sign-in</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  videoContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1, // Met la vidéo en arrière-plan
  },
  containerBtn: {
    marginBottom: 60,
  },
  button: {
    backgroundColor: "transparent",
    borderRadius: 5,
    width: 298,
    height: 39,
    textAlign: "center",
    justifyContent: "center",
  },
  color: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  textInput: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
  },
  gradient: {
    borderRadius: 5,
    width: 298,
    height: 39,
    marginBottom: 26,
    justifyContent: "center",
    alignItems: "center",
  },
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
    //justifyContent: "center",
    //textAlign: "center",
  },
  connect: {
    borderRadius: 5,
    //width: 298,
    height: 39,

    //alignItems: "center",
    //justifyContent: "center",
    paddingRight: 20,
    paddingBottom: 20,

    width: 100,
    borderWidth: 1.5,
    borderColor: "#c2c2c2",
  },
  btnText: {
    //alignItems: "center",
    textAlign: "center",
    justifyContent: "center",

    width: 100,
    height: 40,
  },
  text: {
    color: "black",
    fontSize: 20,
    fontWeight: "700",
  },
});
