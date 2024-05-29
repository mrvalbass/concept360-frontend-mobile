import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Profil from "../components/Profil";

export default function DocumentScreen({}) {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        colors={["rgba(2,0,36,1)", "rgba(6,125,93,1)", "rgba(0,165,172,1)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.1, 0.4, 1]}
      />
      <View style={{ justifyContent: "flex-start" }}>
        <Profil />
      </View>
      <Text>Document Screen</Text>
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
});
