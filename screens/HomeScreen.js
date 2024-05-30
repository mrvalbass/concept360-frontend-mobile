import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  SafeAreaView,
  RefreshControl,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect, useCallback } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import { addPhoto } from "../reducers/user";
import { useDispatch } from "react-redux";
import CalendarInline from "../components/CalendarAgenda";
import Profil from "../components/Profil";
import ProgramCard from "../components/ProgramCard";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        colors={["rgba(2,0,36,1)", "rgba(6,125,93,1)", "rgba(0,165,172,1)"]}
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
        <Profil />
        <View style={styles.calendar}>
          <ScrollView>
            <CalendarInline />
          </ScrollView>
        </View>
      </ScrollView>
    </View>
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
