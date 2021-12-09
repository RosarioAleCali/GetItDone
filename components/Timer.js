import React from "react";
import { Text, View } from "react-native";

import Card from "./Card";
import IconButton from "./IconButton";

import ButtonTypes from '../types/buttonTypes';

export default function Timer({ isTimerRunning, handleResetButton, setIsTimerRunning, time, title }) {
  return (
    <Card>
      <Text style={{ fontSize: 28, fontWeight: '600' }}>{title}</Text>
      <Text style={{ fontSize: 24, fontWeight: '600' }}>
        {Math.floor(time / 60).toString().padStart(2, "0") + ":" + (time % 60).toString().padStart(2, "0")}
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {isTimerRunning ?
          <IconButton
            size={32}
            margin={8}
            type={ButtonTypes.PAUSE_ICON}
            onPress={() => {
              setIsTimerRunning(false);
            }}
          /> :
          <IconButton
            size={32}
            margin={8}
            type={ButtonTypes.START_ICON}
            onPress={() => {
              setIsTimerRunning(true);
            }}
          />
        }
        <IconButton
          size={32}
          margin={8}
          type={ButtonTypes.RESET_ICON}
          onPress={handleResetButton}
        />
      </View>
    </Card>
  );
}
