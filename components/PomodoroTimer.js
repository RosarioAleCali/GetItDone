import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  Vibration,
  View,
} from 'react-native';
import { Notifications } from 'react-native-notifications';

import Card from "./Card";
import Timer from './Timer';
import TimeChanger from './TimeChanger';

export default function PomodoroTimer() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [time, setTime] = useState(sessionLength * 60);
  const [timerType, setTimerType] = useState("Session");

  const VIBRATION_PATTERN = [1000, 2000, 3000];

  useEffect(() => {
    registerNotifications();
  }, []);

  useEffect(() => {
    let timer = null;

    if (isTimerRunning) {
      timer = setTimeout(() => {
        handleTimer();
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [isTimerRunning, time]);

  function registerNotifications() {
    // Request permissions on iOS, refresh token on Android
    Notifications.registerRemoteNotifications();

    Notifications.events().registerRemoteNotificationsRegistered((event) => {
      // TO-DO: Send the token to my server so it could send back push notifications...
      console.log("Device Token Received", event.deviceToken);
    });
    Notifications.events().registerRemoteNotificationsRegistrationFailed((event) => {
      // console.error(event);
    });
  }

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

  function alertUser() {
    Vibration.vibrate(VIBRATION_PATTERN);

    const date = new Date(Date.now() + 1000);
    const notification = {
      title: "Get It Done!",
      body: `Your ${timerType} has begun!`,
      silent: false,
      userInfo: {},
      fireDate: date.toISOString(),
    };
    Notifications.postLocalNotification(notification);
  }

  function handleTimer() {
    let newTimerType = "";
    let newTime = time - 1;

    if (newTime > 0) {
      setTime(newTime);
    }
    else {
      newTimerType = timerType === "Session" ? "Break" : "Session";
      newTime = newTimerType === "Session" ? (sessionLength * 60) : (breakLength * 60);

      setTimerType(newTimerType);
      setTime(newTime);

      alertUser();
    }
  }

  return (
    <View style={styles.mainContainer}>
      <Card>
        <Text style={{ fontSize: 34, fontWeight: '800', textAlign: 'center' }}>Get It Done!</Text>
        <Timer
          isTimerRunning={isTimerRunning}
          handleResetButton={handleResetButton}
          setIsTimerRunning={setIsTimerRunning}
          time={time}
          title={timerType}
        />
        <View style={{ flexDirection: "row" }}>
          <TimeChanger
            disabled={isTimerRunning}
            onMinusPress={handleSessionTimeDecrease}
            onPlusPress={handleSessionTimeIncrease}
            time={sessionLength}
            title={"Session Length"}
          />
          <TimeChanger
            disabled={isTimerRunning}
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
