import {
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  View,
} from "react-native";
import { Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Modal } from "react-native";

export default function LoginScreen({ navigation }) {
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  const handleOpenSignUp = () => {
    console.log("ok");
    setSignUpOpen(true);
  };
  const handleCloseSignUp = () => {
    setSignUpOpen(false);
  };
  const handleOpenSignIn = () => {
    setSignInOpen(true);
  };
  const handleCloseSignIn = () => {
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
            onPress={() => handleOpenSignUp()}
            style={styles.button}
          >
            <Text style={[{ color: "white" }, styles.textInput]}>Sign-up</Text>
          </TouchableOpacity>
        </LinearGradient>

        <TouchableOpacity style={[styles.button, styles.color]}>
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
});
