import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AppointmentCard from "../components/AppointementCard";

export default function AppointmentScreen({}) {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        colors={["rgba(2,0,36,1)", "rgba(6,125,93,1)", "rgba(0,165,172,1)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.1, 0.4, 1]}
      />

      <Text
        style={{
          color: "#fff",
          fontSize: 23,
          paddingTop: 120,
          fontWeight: "600",
        }}
      >
        Prendre un rendez-vous :
      </Text>
      <View style={styles.appointment}>
        <AppointmentCard />
      </View>
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
  appointement: {
    marginTop: 50,
    marginBottom: 150,
    width: "100%",
    paddingLeft: 30,
  },
});
