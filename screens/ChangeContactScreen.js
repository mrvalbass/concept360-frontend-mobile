import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ScrollView,
} from "react-native";
import FloatingTextInput from "../components/FloatingTextInput";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState, useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../reducers/user";

export default function ChangeContactScreen({ navigation }) {
  const goTo = () => navigation.navigate("Setting");
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    newPassword: "",
  });
  const handleClick = () => {
    updatePatient();
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const updatePatient = async () => {
    const { firstName, lastName, email, password, newPassword } = formData;
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        newPassword,
      }),
    };
    const response = await fetch(
      `https://concept360-backend-five.vercel.app/users/changeData/${user._id}`,
      options
    ).then((r) => r.json());
    if (response.result) {
      Alert.alert("Vos informations ont bien été modifiées");
      dispatch(login(response.user));
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        newPassword: "",
      });
      onRefresh();
    } else {
      Alert.alert("Une erreur s'est produite");
    }
  };

  const updateValue = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        colors={["#034A37", "#067D5D", "#00A5AC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.1, 0.4, 1]}
      />

      <ScrollView
        refreshControl={
          <RefreshControl
            style={styles.refresh}
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#067D5D"]}
            progressBackgroundColor="#FFFFFF"
          />
        }
      >
        <View style={styles.containerInput}>
          <View style={{ flexDirection: "row" }}>
            <View>
              <FontAwesome
                name="angle-double-left"
                size={35}
                style={{
                  color: "#fff",
                  position: "absolute",
                  right: 40,
                  top: 0,
                }}
                onPress={() => goTo()}
              />
            </View>
            <Text style={styles.title}>Modifier votre profil</Text>
          </View>

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
            label="Mot de passe actuel"
            name="password"
            secureTextEntry
          />
          <FloatingTextInput
            value={formData.newPassword}
            updateValue={updateValue}
            label="Nouveau mot de passe"
            name="newPassword"
            secureTextEntry
          />
          <TouchableOpacity style={styles.btn} onPress={() => handleClick()}>
            <Text style={styles.btnText}>Modifier</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  refresh: {
    flex: 1,
  },
  containerInput: {
    gap: 30,
    alignItems: "center",
    marginTop: 100,
    width: 300,
  },
  title: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
    paddingBottom: 20,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  btn: {
    backgroundColor: "#067D5D",
    borderRadius: 10,
    marginTop: 70,
    height: 50,
    width: 290,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
});
