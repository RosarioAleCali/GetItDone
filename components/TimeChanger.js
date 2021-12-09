import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

import IconButton from "./IconButton";

import ButtonTypes from '../types/buttonTypes';

export default function TimeChanger({ disabled, onMinusPress, onPlusPress, time, title }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.timeChanger}>
        <IconButton
          disabled={disabled || time === 1}
          size={32}
          type={ButtonTypes.MINUS_ICON}
          onPress={onMinusPress}
        />
        <Text style={styles.timeChangerText}>{time}</Text>
        <IconButton
          disabled={disabled}
          size={32}
          type={ButtonTypes.PLUS_ICON}
          onPress={onPlusPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timeChanger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8
  },
  timeChangerText: {
    marginHorizontal: 6,
    fontSize: 24,
    fontWeight: '600'
  },
  section: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700'
  }
});

TimeChanger.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onMinusPress: PropTypes.func.isRequired,
  onPlusPress: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};
