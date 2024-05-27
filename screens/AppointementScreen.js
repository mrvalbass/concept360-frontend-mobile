import { View, Text, StyleSheet, Image } from "react-native";
import FlaotingTextInput from "../components/FloatingTextInput";

export default function AppointementScreen({}) {
  return (
    <View style={styles.container}>
      <Text>Appointement Screen</Text>
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
