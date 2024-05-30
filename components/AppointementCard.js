import {
  ScrollView,
  View,
  StyleSheet,
  Linking,
  Image,
  Text,
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
  console.log("spe is", specialistData);
  if (specialistData === null) {
    return (
      <View>
        <Text>is loading ...</Text>
      </View>
    );
  }

  const link = specialistData?.map((specialist, i) => {
    return (
      <View key={i} style={styles.containerSpe}>
        <View style={{ flexDirection: "row", gap: 15 }}>
          <Image
            source={{ uri: specialist.user.profilePictureURL }}
            style={styles.profilePicture}
          />
          <View>
            <View style={styles.containerInfo}>
              <Text style={styles.textName}>{specialist.user.lastName}</Text>
              <Text style={styles.textName}>{specialist.user.firstName}</Text>
            </View>
            <View>
              <Text style={styles.textDiscipline}>{specialist.discipline}</Text>
            </View>
          </View>
        </View>
        <FontAwesome
          name="angle-double-right"
          size={25}
          style={styles.icon}
          onPress={() => openURL(specialist.lien)}
        />
      </View>
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
  containerSpe: {
    justifyContent: "space-between",
    padding: 10,
    width: 325,
    borderRadius: 5,
    backgroundColor: "#067D5D",
    flexDirection: "row",
  },
  containerInfo: {
    flexDirection: "row",
    gap: 10,
  },
  test: {
    marginVertical: 20,
    fontSize: 20,
    gap: 20,
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
