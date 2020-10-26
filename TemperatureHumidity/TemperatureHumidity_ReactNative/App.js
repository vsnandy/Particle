import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, Button } from 'react-native';

import VariableScreen from './screens/VariableScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <VariableScreen />
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
