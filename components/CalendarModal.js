import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Modal } from "react-native";
import { Calendar } from "react-native-calendars";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function CalendarModal({
  showModal,
  setShowModal,
  setValue,
  value,
  navigateToSlide,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View style={styles.modalView}>
          <Text>{value.toISOString().slice(0, 10)}</Text>
          <Calendar
            current={value.toISOString().slice(0, 10)}
            onDayPress={(day) => {
              console.log("day", new Date(day.dateString));
              setValue(new Date(day.dateString));
              setShowModal(false);
            }}
          />
        </View>
      </View>
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
  closeButton: {
    marginTop: 20,
    backgroundColor: "#067D5D",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});
