import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//Simone er perfekt
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Parge Lenis!</Text>
      <Text>test</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fad4d4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
