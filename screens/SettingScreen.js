import { View, Text, StyleSheet, Image } from "react-native";
import FlaotingTextInput from "../components/floatingTextInput";

export default function SettingScreen({}) {
  return (
    <View style={styles.container}>
      <Text>Setting Screen</Text>
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
