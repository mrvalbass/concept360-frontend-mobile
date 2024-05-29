import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function DailyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Daily</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
