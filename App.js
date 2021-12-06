/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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

import IconButton from "./components/IconButton";
import Card from "./components/Card";

import ButtonTypes from './types/buttonTypes';

const App = () => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);

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
              {isTimerRunning ? <IconButton size={32} margin={8} type={ButtonTypes.PAUSE_ICON} /> : <IconButton size={32} margin={8} type={ButtonTypes.START_ICON} />}
              <IconButton size={32} margin={8} type={ButtonTypes.RESET_ICON} />
            </View>
          </Card>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Session Length</Text>
              <View style={styles.timeChanger}>
                <IconButton size={32} type={ButtonTypes.MINUS_ICON} />
                <Text style={styles.timeChangerText}>25</Text>
                <IconButton size={32} type={ButtonTypes.PLUS_ICON} />
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Break Length</Text>
              <View style={styles.timeChanger}>
                <IconButton size={32} type={ButtonTypes.MINUS_ICON} />
                <Text style={styles.timeChangerText}>5</Text>
                <IconButton size={32} type={ButtonTypes.PLUS_ICON} />
              </View>
            </View>
          </View>
        </Card>
      </View>
      <View style={styles.bottom}>
        <Text>Developed with ❤️ by Kalamos Technologies</Text>
      </View>
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
