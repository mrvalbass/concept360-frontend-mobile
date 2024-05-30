import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import Profil from "../components/Profil";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function SettingScreen({ navigation, ChangeContactScreen }) {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout());
    await AsyncStorage.removeItem("userToken");
    navigation.navigate("Login");
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
      <View style={styles.containerProfil}>
        <Profil />
      </View>

      <View style={styles.containerBtn}>
        <TouchableOpacity style={styles.btn}>
          <FontAwesome name="bell" size={30} style={{ color: "#FFF" }} />
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.text}>Notification</Text>
            <Text style={{ color: "#fff", fontSize: 10 }}>
              Gerez vos notifications
            </Text>
          </View>
          <FontAwesome
            name="chevron-right"
            size={20}
            style={{ color: "#FFF" }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("ChangeContact")}
        >
          <FontAwesome name="user-circle" size={30} style={{ color: "#FFF" }} />
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.text}>Profil</Text>
            <Text style={{ color: "#fff", fontSize: 10 }}>
              Modifiez vos informations
            </Text>
          </View>
          <FontAwesome
            name="chevron-right"
            size={20}
            style={{ color: "#FFF" }}
          />
        </TouchableOpacity>
      </View>

      <Pressable onPress={handleLogout} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>DECONNEXION</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  containerProfil: {
    marginBottom: 80,
  },

  containerBtn: {
    gap: 60,
  },
  btnSetting: {
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    flexDirection: "row",
    borderRadius: 10,
    height: 70,
    width: 290,
    borderWidth: 1.5,
    borderColor: "#067D5D",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#067D5D",
  },

  closeButton: {
    marginTop: 20,
    backgroundColor: "#067D5D",
    borderRadius: 10,
    marginTop: 100,
    height: 70,
    width: 290,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  closeButtonText: {
    color: "white",
    fontSize: 20,
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
});
