import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  Vibration,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundTimer from 'react-native-background-timer';
import KeepAwake from 'react-native-keep-awake';
import { Notifications } from 'react-native-notifications';

var Sound = require('react-native-sound');

import Card from "./Card";
import Timer from './Timer';
import TimeChanger from './TimeChanger';

import PomodoroTimerTypes from '../types/pomodoroTimerTypes';

Sound.setCategory('Playback');

import seriousStrike from "../assets/serious-strike-533.mp3";

var soundEffect = new Sound(
  seriousStrike,
  (error) => {
    if (error) {
      console.error('Failed to load the sound', error);
      return;
    }
  },
);

export default function PomodoroTimer() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [time, setTime] = useState(sessionLength * 60);
  const [timerType, setTimerType] = useState(PomodoroTimerTypes.SESSION);

  const VIBRATION_PATTERN = [1000, 2000, 3000];

  useEffect(() => {
    soundEffect.setVolume(1);

    registerNotifications();

    return () => soundEffect.release();
  }, []);

  async function onStart() {
    await AsyncStorage.setItem('start_time', time.toString());

    BackgroundTimer.runBackgroundTimer(() => {
      handleTimer();
    }, 1000);
  }

  function onPause() {
    BackgroundTimer.stopBackgroundTimer();
  }

  function onReset() {
    setTimerType(PomodoroTimerTypes.SESSION);
    setTime(sessionLength * 60);

    BackgroundTimer.stopBackgroundTimer();
  }

  function registerNotifications() {
    Notifications.registerRemoteNotifications();

    Notifications.events().registerRemoteNotificationsRegistered(() => { });
    Notifications.events().registerRemoteNotificationsRegistrationFailed(() => { });
  }

  function handleSessionTimeDecrease() {
    if (sessionLength > 1) {
      const newTime = sessionLength - 1;

      setSessionLength(newTime);

      if (timerType === PomodoroTimerTypes.SESSION) {
        setTime(newTime * 60);
      }
    }
  }

  function handleSessionTimeIncrease() {
    const newTime = sessionLength + 1;

    setSessionLength(newTime);

    if (timerType === PomodoroTimerTypes.SESSION) {
      setTime(newTime * 60);
    }
  }

  function handleBreakDecrease() {
    if (breakLength > 1) {
      const newTime = breakLength - 1;

      setBreakLength(newTime);

      if (timerType === PomodoroTimerTypes.BREAK) {
        setTime(newTime * 60);
      }
    }
  }

  function handleBreakIncrease() {
    const newTime = breakLength + 1;

    setBreakLength(newTime);

    if (timerType === PomodoroTimerTypes.BREAK) {
      setTime(newTime * 60);
    }
  }

  async function alertUser() {
    soundEffect.play((success) => {
      if (!success) {
        console.error('Playback failed due to soundEffect decoding errors');
      }
    });

    Vibration.vibrate(VIBRATION_PATTERN);

    const _timerType = await AsyncStorage.getItem('timer_type');
    const date = new Date(Date.now() + 1000);
    const notification = {
      body: `Your ${_timerType.toLowerCase()} has begun!`,
      title: "Get It Done!",
      fireDate: date.toISOString(),
    };
    Notifications.postLocalNotification(notification);
  }

  async function handleTimer() {
    const startTime = parseInt(await AsyncStorage.getItem('start_time'));

    let newTimerType = "";
    let newTime = startTime - 1;

    if (newTime >= 0) {
      setTime(newTime);
      await AsyncStorage.setItem('start_time', newTime.toString());
    }
    else {
      const _timerType = await AsyncStorage.getItem('timer_type');
      newTimerType = _timerType === PomodoroTimerTypes.SESSION ? PomodoroTimerTypes.BREAK : PomodoroTimerTypes.SESSION;
      newTime = newTimerType === PomodoroTimerTypes.SESSION ? (sessionLength * 60) : (breakLength * 60);

      setTimerType(newTimerType);
      setTime(newTime);

      await AsyncStorage.setItem('timer_type', newTimerType);
      await AsyncStorage.setItem('start_time', newTime.toString());

      alertUser();
    }
  }

  return (
    <View style={styles.mainContainer}>
      {isTimerRunning ? <KeepAwake /> : <></>}
      <Card>
        <Text style={{ fontSize: 34, fontWeight: '800', textAlign: 'center' }}>Get It Done!</Text>
        <Timer
          isTimerRunning={isTimerRunning}
          handleResetButton={onReset}
          handleStartTimer={onStart}
          handlePauseTimer={onPause}
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
