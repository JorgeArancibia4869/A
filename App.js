import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import * as Linking from 'expo-linking';

const linkToBob = async (path, param1, param2) => {
  console.log('Creando path...')
  const url = Linking.createURL(path, {
    queryParams: {
      param1: param1,
      param2: param2
    }, 
    scheme: 'wptbobpr'
  });

  console.log('Path: ' + url);

  try {
    await Linking.openURL(url);
    console.log("openURL resolved");
  } catch(e) {
    console.log("openURL rejected");
    console.error(e);
  }
  console.log('Alice link to Bob Finish');
}

export default function App() {

  const [value, onChangeText] = useState('path2');
  const [value2, onChangeText2] = useState('Hola');
  const [value3, onChangeText3] = useState('Chao');

  return (
    <View style={styles.container}>
      <Text>Mock de Alice</Text>
      <StatusBar style="auto" />
      <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText(text)}
      value={value}
    />
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText2(text)}
      value={value2}
    />
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText3(text)}
      value={value3}
    />
      {/* <Text>Url creada: </Text> */}
      <Button title="Open Bob" onPress={ () => linkToBob(value, value2, value3) } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
