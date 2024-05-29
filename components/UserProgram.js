import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Collapsible from "react-native-collapsible";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Routine from "./Routine";

export default function UserProgram({ navigation, userProgram }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const routines = userProgram.program.map((programRoutine, i) => (
    <Routine key={i} programRoutine={programRoutine} />
  ));
  return (
    <View>
      <Pressable
        style={styles.header}
        onPress={() => setIsCollapsed((prev) => !prev)}
      >
        <Text style={styles.specialist}>
          {userProgram.specialist.user.firstName}{" "}
          {userProgram.specialist.user.lastName}
        </Text>
        <FontAwesome
          name="caret-down"
          size={25}
          color="black"
          style={[
            styles.icon,
            isCollapsed && { transform: [{ rotate: "-90deg" }] },
          ]}
        />
      </Pressable>
      <Collapsible collapsed={isCollapsed} style={styles.collapsible}>
        {userProgram.program.length > 0 ? (
          <View>
            <Pressable
              style={styles.seeMoreButton}
              onPress={() => navigation.navigate("Daily")}
            >
              <Text style={styles.seeMoreButtonText}>Détails</Text>
            </Pressable>
            {routines}
          </View>
        ) : (
          <Text style={styles.collapsibleText}>Rien de prévu</Text>
        )}
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "white",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
  },

  specialist: {
    color: "black",
    fontSize: 20,
  },

  icon: {
    transition: "transform 0.3s",
  },

  collapsible: {
    marginHorizontal: 40,
    padding: 20,
    backgroundColor: "white",
    flex: 1,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    gap: 10,
  },

  seeMoreButton: {
    position: "absolute",
    right: -5,
    top: -10,
  },

  seeMoreButtonText: {
    color: "#067D5D",
    fontWeight: "600",
    fontSize: 18,
  },

  collapsibleText: {
    color: "black",
    fontSize: 20,
  },
});
