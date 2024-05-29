import { useState } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Tooltip from "react-native-walkthrough-tooltip";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Routine({ programRoutine }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const exerciceRoutines = programRoutine.routine.exercises.map(
    (routineExercice, i) => {
      return (
        <View key={i} style={styles.exerciseRoutine}>
          <Text style={styles.exerciseTitle}>
            {routineExercice.exercise.title}
          </Text>
          <View style={styles.specs}>
            <Text style={styles.specsText}>
              Séries : {routineExercice.sets}
            </Text>
            <Text style={styles.specsText}>
              Répétitions : {routineExercice.reps}
            </Text>
          </View>
        </View>
      );
    }
  );

  return (
    <View style={styles.container}>
      <View style={styles.exerciseRoutineContainer}>{exerciceRoutines}</View>
      <View style={styles.buttons}>
        <Tooltip
          isVisible={showTooltip}
          onClose={() => setShowTooltip(false)}
          content={<Text>{programRoutine.comment}</Text>}
        >
          <FontAwesome
            name="info-circle"
            size={30}
            color="black"
            onPress={() => setShowTooltip(true)}
          />
        </Tooltip>
        <BouncyCheckbox
          size={28}
          onPress={(value) => {}}
          fillColor="#067D5D"
          style={styles.checkBoxContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },

  exerciseRoutineContainer: {
    flex: 1,
    gap: 10,
  },

  exerciseRoutine: {
    justifyContent: "space-between",
  },

  exerciseTitle: {
    fontSize: 18,
    flexWrap: "wrap",
    fontWeight: "500",
  },

  specs: {
    flexDirection: "row",
    gap: 20,
  },

  buttons: {
    flexDirection: "row",
    gap: 10,
  },

  checkBoxContainer: {
    width: "10%",
  },
});
