import { View, Text, StyleSheet, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingScreen({ navigation }) {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout());
    await AsyncStorage.removeItem("userToken");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleLogout}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
