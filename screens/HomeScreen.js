import { StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import CalendarInline from "../components/CalendarInLine";
import Profil from "../components/Profil";
import { useState } from "react";
import moment from "moment";
import ProgramCard from "../components/ProgramCard";

export default function HomeScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(
    moment(new Date()).startOf("day")
  );
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={StyleSheet.absoluteFillObject}
        colors={["#034A37", "#067D5D", "#00A5AC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.1, 0.4, 1]}
      />
      <Profil editable greeting />
      <CalendarInline
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Text style={styles.title}>
        Programme du {moment(selectedDate).format("DD/MM")}
      </Text>
      <ScrollView>
        <ProgramCard selectedDate={selectedDate} navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
    marginBottom: 20,
  },
});
