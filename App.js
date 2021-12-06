import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import Card from "./components/Card";
import Footer from './components/Footer';
import IconButton from "./components/IconButton";

import ButtonTypes from './types/buttonTypes';

const App = () => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.mainContainer}>
        <Card>
          <Text style={{ fontSize: 34, fontWeight: '800', textAlign: 'center' }}>Get It Done!</Text>
          <Card>
            <Text style={{ fontSize: 28, fontWeight: '600' }}>Session</Text>
            <Text style={{ fontSize: 24, fontWeight: '600' }}>00:00</Text>
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
                onPress={() => {
                  setIsTimerRunning(false);
                }}
              />
            </View>
          </Card>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Session Length</Text>
              <View style={styles.timeChanger}>
                <IconButton
                  size={32}
                  type={ButtonTypes.MINUS_ICON}
                  onPress={() => {
                    if (sessionLength > 1) {
                      setSessionLength(sessionLength - 1);
                    }
                  }}
                />
                <Text style={styles.timeChangerText}>{sessionLength}</Text>
                <IconButton
                  size={32}
                  type={ButtonTypes.PLUS_ICON}
                  onPress={() => {
                    setSessionLength(sessionLength + 1);
                  }}
                />
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Break Length</Text>
              <View style={styles.timeChanger}>
                <IconButton
                  size={32}
                  type={ButtonTypes.MINUS_ICON}
                  onPress={() => {
                    if (breakLength > 1) {
                      setBreakLength(breakLength - 1);
                    }
                  }}
                />
                <Text style={styles.timeChangerText}>{breakLength}</Text>
                <IconButton
                  size={32}
                  type={ButtonTypes.PLUS_ICON}
                  onPress={() => {
                    setBreakLength(breakLength + 1);
                  }}
                />
              </View>
            </View>
          </View>
        </Card>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottom: {
    justifyContent: 'flex-end',
    marginTop: 18,
    alignItems: 'center'
  },
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

export default App;
