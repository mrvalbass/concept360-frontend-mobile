import React, { useState, useRef } from "react";
import { Animated, Easing, TextInput, StyleSheet } from "react-native";

const FloatingTextInput = ({
  value,
  name,
  updateValue,
  secureTextEntry,
  label = "New Title",
  titleActiveSize = 12,
  titleInActiveSize = 14,
  titleActiveColor = "#02FAFA",
  titleInactiveColor = "#c2c2c2",
}) => {
  const animatedValue = useRef(new Animated.Value(0));

  const returnAnimatedTitleStyles = {
    transform: [
      {
        translateY: animatedValue?.current?.interpolate({
          inputRange: [0, 1],
          outputRange: [12, -10],
          extrapolate: "clamp",
        }),
      },
    ],
    fontSize: animatedValue?.current?.interpolate({
      inputRange: [0, 1],
      outputRange: [titleInActiveSize, titleActiveSize],
      extrapolate: "clamp",
    }),
    color: animatedValue?.current?.interpolate({
      inputRange: [0, 1],
      outputRange: [titleInactiveColor, titleActiveColor],
    }),
    alignSelf: "flex-start",
    paddingLeft: 6,
    paddingRight: 6,
    backgroundColor: "white",
  };

  const viewStyles = {
    borderColor: animatedValue?.current?.interpolate({
      inputRange: [0, 1],
      outputRange: [titleInactiveColor, titleActiveColor],
    }),
  };
  const onFocus = () => {
    Animated.timing(animatedValue?.current, {
      toValue: 1,
      duration: 500,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      useNativeDriver: false,
    }).start();
  };

  const onBlur = () => {
    if (!value) {
      Animated.timing(animatedValue?.current, {
        toValue: 0,
        duration: 500,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <Animated.View style={[styles.subContainer, viewStyles]}>
      <Animated.Text style={[returnAnimatedTitleStyles]}>{label}</Animated.Text>
      <TextInput
        onChange={(e) => updateValue(name, e.nativeEvent.text)}
        value={value}
        style={styles.textStyle}
        onBlur={onBlur}
        onFocus={onFocus}
        secureTextEntry={secureTextEntry}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    marginHorizontal: 24,
    borderWidth: 2,
    width: 200,
    borderColor: "#c2c2c2",
    borderRadius: 5,
    height: 50,
    paddingLeft: 10,
    paddingRight: 6,
    backgroundColor: "#ffffff",
  },
  textStyle: {
    paddingBottom: 28,
    // backgroundColor: "red",
    fontSize: 16,
  },
});

export default FloatingTextInput;
