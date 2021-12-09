import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Card from "./Card";
import IconButton from "./IconButton";
import SetTimeLengthSection from './SetTimeLengthSection';

import ButtonTypes from '../types/buttonTypes';

export default function PomodoroTimer() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [time, setTime] = useState(sessionLength * 60);
  const [timerType, setTimerType] = useState("Session");

  useEffect(() => {
    let interval = null;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    } else if (!isTimerRunning && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  function handleResetButton() {
    setIsTimerRunning(false);
    setTimerType("Session");
    setTime(sessionLength * 60);
  }

  function handleSessionTimeDecrease() {
    if (sessionLength > 1) {
      const newTime = sessionLength - 1;

      setSessionLength(newTime);

      if (timerType === "Session") {
        setTime(newTime * 60);
      }
    }
  }

  function handleSessionTimeIncrease() {
    const newTime = sessionLength + 1;

    setSessionLength(newTime);

    if (timerType === "Session") {
      setTime(newTime * 60);
    }
  }

  function handleBreakDecrease() {
    if (breakLength > 1) {
      const newTime = breakLength - 1;

      setBreakLength(newTime);

      if (timerType === "Break") {
        setTime(newTime * 60);
      }
    }
  }

  function handleBreakIncrease() {
    const newTime = breakLength + 1;

    setBreakLength(newTime);

    if (timerType === "Break") {
      setTime(newTime * 60);
    }
  }

  return (
    <View style={styles.mainContainer}>
      <Card>
        <Text style={{ fontSize: 34, fontWeight: '800', textAlign: 'center' }}>Get It Done!</Text>
        <Card>
          <Text style={{ fontSize: 28, fontWeight: '600' }}>Session</Text>
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
        <View style={{ flexDirection: "row" }}>
          <SetTimeLengthSection
            onMinusPress={handleSessionTimeDecrease}
            onPlusPress={handleSessionTimeIncrease}
            time={sessionLength}
            title={"Session Length"}
          />
          <SetTimeLengthSection
            onMinusPress={handleBreakDecrease}
            onPlusPress={handleBreakIncrease}
            time={breakLength}
            title={"Break Length"}
          />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
