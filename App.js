import React from 'react';
import {
  SafeAreaView,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import Footer from './components/Footer';
import PomodoroTimer from './components/PomodoroTimer';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <PomodoroTimer />
      <Footer />
    </SafeAreaView>
  );
};

export default App;
