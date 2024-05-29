import { StyleSheet, View, Dimensions } from "react-native";
import WeekDay from "./WeekDay";

const { width } = Dimensions.get("screen");

export default function Week({ dates, selectedDate, setSelectedDate }) {
  return (
    <View style={styles.week}>
      {dates.map((date, i) => {
        const isActive =
          new Date(selectedDate).toDateString() === date.date.toDateString();
        return (
          <WeekDay
            key={i}
            isActive={isActive}
            date={date}
            setSelectedDate={setSelectedDate}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  week: {
    flex: 1,
    width: width,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
});
