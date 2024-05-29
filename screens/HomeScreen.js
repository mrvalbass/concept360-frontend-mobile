import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import { addPhoto } from "../reducers/user";
import { useDispatch } from "react-redux";
import CalendarInline from "../components/CalendarAgenda";
import Profil from "../components/Profil";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        colors={["rgba(2,0,36,1)", "rgba(6,125,93,1)", "rgba(0,165,172,1)"]}
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
    // justifyContent: "center",
    // alignItems: "center",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  calendar: {
    //backgroundColor: "pink",
    width: "100%",
    height: "95%",
  },
});
