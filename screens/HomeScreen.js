import {
  Text,
  StyleSheet,
  RefreshControl,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { useState, useEffect, useCallback } from "react";
import { addPhoto } from "../reducers/user";

import { LinearGradient } from "expo-linear-gradient";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";

import CalendarInline from "../components/CalendarInLine";
import Profil from "../components/Profil";
import ProgramCard from "../components/ProgramCard";

export default function HomeScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(
    moment(new Date()).startOf("day")
  );
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={StyleSheet.absoluteFillObject}
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
        <Profil greeting editable />
        <CalendarStrip
          scrollable
          style={styles.calendar}
          calendarColor={"transparent"}
          calendarHeaderStyle={styles.calendar}
          dateNumberStyle={{ color: "white" }}
          dateNameStyle={{ color: "white" }}
          iconContainer={{ flex: 0.1 }}
        />
        <Text style={styles.title}>
          Programme du {moment(selectedDate).format("DD/MM")}
        </Text>
        <ScrollView>
          <ProgramCard selectedDate={selectedDate} navigation={navigation} />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  calendar: {},

  calendarHeader: {
    color: "white",
    alignSelf: "flex-end",
    paddingRight: 30,
  },

  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
    marginBottom: 20,
  },
});
