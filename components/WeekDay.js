import { Pressable, View, StyleSheet, Text } from "react-native";

export default function WeekDay({ isActive, date, setSelectedDate }) {
  return (
    <Pressable onPress={() => setSelectedDate(date.date)}>
      <View
        style={[
          styles.weekDay,
          isActive && {
            backgroundColor: "#020024",
            borderRadius: 50,
          },
        ]}
      >
        <Text style={styles.weekDayName}>{date.weekday}</Text>
        <Text style={styles.weekDayNumber}>{date.date.getDate()}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  weekDay: {
    flex: 1,
    width: 50,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  weekDayName: {
    fontSize: 13,
    fontWeight: "500",
    color: "#fff",
  },

  weekDayNumber: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
});
