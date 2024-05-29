import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addPhoto } from "../reducers/user";

import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import CalendarInline from "../components/calendarAgenda";
import Profil from "../components/Profil";
import ProgramCard from "../components/ProgramCard";

export default function HomeScreen({}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={StyleSheet.absoluteFillObject}
        colors={["#034A37", "#067D5D", "#00A5AC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.1, 0.4, 1]}
      />

      <Profil />
      <View style={styles.calendar}>
        <ScrollView>
          <CalendarInline />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerProfil: {
    alignItems: "center",
    marginTop: 100,
  },
  calendar: {
    //backgroundColor: "pink",
    width: "100%",
    height: "95%",
  },
});
