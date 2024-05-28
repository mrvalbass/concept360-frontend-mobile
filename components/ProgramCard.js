import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import moment from "moment";

import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ProgramCard({ _id, date }) {
  const user = useSelector((state) => state.user.value);
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    (async () => {
      const programsData = await fetch(
        // `https://concept360-backend-five.vercel.app/programs/${user._id}`
        `http://192.168.14.175:3000/programs/user/${user._id}`
      ).then((r) => r.json());
      setPrograms(programsData.userProgram.program);
    })();
  }, []);

  const programFilteredByDate = programs.filter((programRoutine) => {
    return (
      moment(programRoutine.date).unix() ===
      moment("2024-05-28T22:00:00.000Z").unix()
    );
  });
  console.log(programFilteredByDate);

  const programComponent = programFilteredByDate.map((program, i) => (
    <View key={i}>
      <Text>{program.comment}</Text>
      <Text>{`exercises: ${program.routine[0]}`}</Text>
    </View>
  ));
  console.log(programComponent);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {/* programme de {createdBy.firstName} {createdBy.lastName} */}
        Programme {_id}
      </Text>
      <View>{programComponent}</View>
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
