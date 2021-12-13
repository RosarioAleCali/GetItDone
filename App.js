import React from 'react';
import { SafeAreaView } from 'react-native';

import Footer from './components/Footer';
import PomodoroTimer from './components/PomodoroTimer';

const App = () => {
  const backgroundStyle = {
    backgroundColor: "#F2F2F2",
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
