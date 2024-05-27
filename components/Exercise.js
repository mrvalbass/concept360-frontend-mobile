import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Exercise({ title }) {
  const [exercises, setExercises] = useState([]);

  //   useEffect(() => {
  //     (async () => {
  //       const exercisesData = await fetch(
  //         "http://concept360-backend.vercel.app/exercises"
  //       ).then((response) => response.json());
  //       setExercises(exercisesData.exercises);
  //     })();
  //   }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activité du jour</Text>
      <View style={styles.exercises}>
        <Text>TITLE: {title}</Text>
        <Text>cliquez pour plus de détails sur l'exercice</Text>
        <FontAwesome name='caretdown' size={25} color='white' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#067D5D",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    color: "white",
    borderWidth: 1.5,
    borderColor: "red",
  },
  exercises: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    borderWidth: 3,
    borderColor: "yellow",
  },
});
