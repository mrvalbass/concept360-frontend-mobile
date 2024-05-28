import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ProgramCard({ _id }) {
  const user = useSelector((state) => state.user.value);

  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    (async () => {
      const programsData = await fetch(
        // "https://concept360-backend-five.vercel.app/programs"
        `http://192.168.14.175:3000/programs/${user._id}`
      ).then((r) => r.json());
      setPrograms(programsData.programs);
      // console.log("programs", programs.program[0].routine.exercises);
    })();
  }, []);
  console.log("programs", programs.notes);

  // const programComponents =
  //   programs &&
  //   programs.map((program, i) => <View key={i} {...program}></View>);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {/* programme de {createdBy.firstName} {createdBy.lastName} */}
        Programme {_id}
      </Text>
      <View>{programs}</View>
      {/* {checkbox && <input type='checkbox' />} */}
      <Text style={styles.text2}>
        cliquez pour plus de détails sur l'exercice
      </Text>
      <FontAwesome name='caret-down' size={25} color='white' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    margin: 5,
    padding: 10,
    justifyContent: "space-between",
    width: "90%",
    backgroundColor: "#067D5D",
    borderRadius: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
    marginBottom: 5,
  },
  text1: {
    color: "white",
    fontSize: 15,
  },
  text2: {
    color: "white",
    fontSize: 10,
    marginTop: 10,
  },
});
