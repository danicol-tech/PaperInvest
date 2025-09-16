import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://192.168.253.12:8080/ping")  // usa il tuo IP locale
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => setMessage("Errore: " + err.message));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
  },
});
