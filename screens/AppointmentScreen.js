import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AppointmentCard from "../components/AppointmentCard";

export default function AppointmentScreen({}) {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        colors={["#034A37", "#067D5D", "#00A5AC"]}
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
  appointment: {
    marginTop: 50,
  },
});
