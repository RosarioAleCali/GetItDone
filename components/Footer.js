import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text>Developed with ❤️ by Kalamos Technologies</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    justifyContent: 'flex-end',
    marginTop: 18,
    alignItems: 'center'
  },
});
