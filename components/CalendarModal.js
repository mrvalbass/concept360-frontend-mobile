import { View, StyleSheet, Modal, Pressable } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";

export default function CalendarModal({
  showModal,
  setShowModal,
  setSelectedDate,
  selectedDate,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
    >
      <Pressable
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
        onPress={() => setShowModal(false)}
      >
        <View style={styles.modalView}>
          <Calendar
            markedDates={{
              [selectedDate.format("YYYY-MM-DD")]: {
                selected: true,
                selectedColor: "#067D5D",
              },
            }}
            onDayPress={(day) => {
              setSelectedDate(moment(new Date(day.dateString)).startOf("day"));
              setShowModal(false);
            }}
          />
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 40,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    alignItems: "center",
    elevation: 5,
    gap: 25,
  },
});
