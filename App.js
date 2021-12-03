/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
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
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.mainContainer}>
        <Card>
          <Text>Get It Done!</Text>
          <IconButton size={32} type={ButtonTypes.PLUS_ICON} />
          <IconButton size={32} type={ButtonTypes.MINUS_ICON} />
          <IconButton size={32} type={ButtonTypes.START_ICON} />
          <IconButton size={32} type={ButtonTypes.PAUSE_ICON} />
          <IconButton size={32} type={ButtonTypes.RESET_ICON} />
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
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
