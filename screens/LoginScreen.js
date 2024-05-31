import {
  KeyboardAvoidingView,
  Pressable,
  Text,
  StyleSheet,
  Platform,
  View,
} from "react-native";
import { Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";

import SignUpModal from "../components/SignUpModal";
import SignInModal from "../components/SignInModal";

import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { login, addPhoto } from "../reducers/user";

import { useIsFocused } from "@react-navigation/native";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      (async () => {
        const token = await AsyncStorage.getItem("userToken");
        if (token) {
          const { success } = await LocalAuthentication.authenticateAsync();
          if (success) {
            const data = await fetch(
              `https://concept360-backend-five.vercel.app/users/patients/token/${token}`
            ).then((r) => r.json());
            dispatch(login(data.patient.user));
            dispatch(addPhoto(data.patient.user.profilePictureURL));
            navigation.navigate("TabNavigator", { screen: "Home" });
          }
        }
      })();
    }
  }, [isFocused]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SignUpModal
        signUpOpen={signUpOpen}
        setSignUpOpen={setSignUpOpen}
        navigation={navigation}
      />
      <SignInModal
        signInOpen={signInOpen}
        setSignInOpen={setSignInOpen}
        navigation={navigation}
      />
      <Video
        source={require("../assets/videoLogin.mp4")}
        rate={1.0}
        isMuted={true}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Concept</Text>
        <Text style={styles.title}>360</Text>
      </View>
      <View style={styles.containerBtn}>
        <LinearGradient
          style={styles.gradient}
          colors={["#034A37", "#067D5D", "#00A5AC"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          locations={[0.1, 0.5, 1]}
        >
          <Pressable onPress={() => setSignUpOpen(true)} style={styles.button}>
            <Text style={[{ color: "white" }, styles.textInput]}>Sign-up</Text>
          </Pressable>
        </LinearGradient>
        <Pressable
          onPress={() => setSignInOpen(true)}
          style={[styles.button, styles.color]}
        >
          <Text style={styles.textInput}>Sign-in</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },

  titleContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: "50%",
  },

  title: {
    fontWeight: "900",
    fontSize: 100,
    color: "#067D5D",
    textAlign: "center",
  },

  containerBtn: {
    marginBottom: 60,
  },

  button: {
    borderRadius: 5,
    width: 300,
    height: 40,
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
});
