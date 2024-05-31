import {
  Text,
  View,
  StyleSheet,
  RefreshControl,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { useState, useCallback } from "react";

import { LinearGradient } from "expo-linear-gradient";
import CalendarStrip from "react-native-calendar-strip";
import CalendarModal from "../components/CalendarModal";
import moment from "moment";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import Profil from "../components/Profil";
import ProgramCard from "../components/ProgramCard";

export default function HomeScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(
    moment(new Date()).startOf("day")
  );
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CalendarModal
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        showModal={showModal}
        setShowModal={setShowModal}
      />
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
          calendarHeaderStyle={styles.calendarHeader}
          dateNumberStyle={{ color: "white" }}
          dateNameStyle={{ color: "white" }}
          onDateSelected={(value) =>
            setSelectedDate(moment(new Date(value)).startOf("day"))
          }
          iconContainer={{ flex: 0.1 }}
          selectedDate={selectedDate}
        />
        <View>
          <FontAwesome
            name="calendar"
            size={25}
            style={styles.calendarIcon}
            onPress={() => setShowModal(true)}
          />
          <Text style={styles.title}>
            Programme du {moment(selectedDate).format("DD/MM")}
          </Text>
          <ScrollView>
            <ProgramCard selectedDate={selectedDate} navigation={navigation} />
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  calendar: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  calendarHeader: {
    color: "white",
    alignSelf: "flex-end",
    paddingRight: 30,
    paddingVertical: 5,
  },

  calendarIcon: {
    position: "absolute",
    color: "white",
    top: 10,
    left: 40,
    width: 40,
    height: 40,
    textAlign: "center",
  },

  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
    marginVertical: 20,
  },
});
