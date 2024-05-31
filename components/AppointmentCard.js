import {
  ScrollView,
  View,
  StyleSheet,
  Linking,
  Image,
  Text,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function AppointmentCard({}) {
  const [specialistData, setSpecialistData] = useState(null);

  const openURL = (url) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Erreur", "Impossible d'ouvrir le lien : " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) =>
        Alert.alert("Erreur", "Une erreur est survenue : " + err)
      );
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://concept360-backend-five.vercel.app/users/specialists`
      ).then((r) => r.json());
      setSpecialistData(response.specialists);
    })();
  }, []);
  if (specialistData === null) {
    return (
      <View style={{ flex: 1, marginVertical: 20 }}>
        <ActivityIndicator size={"large"} color={"#ffffff"} />
      </View>
    );
  }

  const link = specialistData?.map((specialist, i) => {
    return (
      <Pressable
        key={i}
        style={styles.containerSpe}
        onPress={() => openURL(specialist.lien)}
      >
        <View style={{ flexDirection: "row", gap: 15 }}>
          <Image
            source={{ uri: specialist.user.profilePictureURL }}
            style={styles.profilePicture}
          />
          <View>
            <View style={styles.containerInfo}>
              <Text style={styles.textName}>
                {specialist.user.firstName} {specialist.user.lastName}
              </Text>
            </View>
            <View>
              <Text style={styles.textDiscipline}>{specialist.discipline}</Text>
            </View>
          </View>
        </View>
        <FontAwesome name="angle-double-right" size={25} style={styles.icon} />
      </Pressable>
    );
  });

  return (
    <View>
      <ScrollView>
        <View style={styles.test}>{link}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  test: {
    marginVertical: 20,
    fontSize: 20,
    gap: 35,
  },
  containerSpe: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: 325,
    borderRadius: 5,
    backgroundColor: "#067D5D",
    flexDirection: "row",
  },
  containerInfo: {
    flexDirection: "row",
    gap: 10,
  },
  textName: {
    fontSize: 20,
    color: "#fff",
  },
  textDiscipline: {
    fontSize: 18,
    color: "#fff",
  },
  icon: {
    color: "white",
    paddingTop: 10,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
