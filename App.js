import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import * as Linking from 'expo-linking';


const appsToLink = {
  ['Bob']: { scheme: 'wptbobpr', path: '/path2', username: 'Hola', token: 'Chao' },
  ['AppConductor']: { scheme: 'wptdriverapp', path: '/login', username: 'juanito', token: '1234567890' },
  clear: { scheme: '', path: '/', username: '', token: '' }
};

const linkToBob = async (scheme, path, username, token) => {
  const url = `${scheme}:/${path}?username=${username}&token=${token}`

  console.log('Path: ' + url);
  let isPossibleOpenURL = false;
  try {
    const isPossibleOpenURL = await Linking.canOpenURL(url);
    console.log('isPossibleOpenURL='+isPossibleOpenURL);
    if (isPossibleOpenURL) {
      await Linking.openURL(url);
      console.log("openURL resolved");
    } else {
      Alert.alert('Advertencia', 'No hay ninguna app registrada con el scheme ' + scheme);
    }
  } catch(e) {
    console.log(isPossibleOpenURL ? "openURL rejection" : 'canOpenURL rejection');
    console.error(e);
    if (isPossibleOpenURL) {
      try {
        await Linking.openSettings()
      } catch(e) {
        console.error(e)
      }
    }
  }
  console.log('Alice link to Bob Finish');
}

const initialApp = 'Bob';

export default function App() {
  const [appDesc, setAppDesc] = useState(initialApp);
  const [schemeValue, onChangeScheme] = useState(appsToLink[appDesc].scheme);
  const [pathValue, onChangePath] = useState(appsToLink[appDesc].path);
  const [usernameValue, onChangeUsername] = useState(appsToLink[appDesc].username);
  const [tokenValue, onChangeToken] = useState(appsToLink[appDesc].token);

  const fillStates = (appname) => {
    const { scheme, path, username, token } = appsToLink[appname];
    setAppDesc(appname);
    onChangeScheme(scheme);
    onChangePath(path);
    onChangeUsername(username);
    onChangeToken(token);
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold' }}>Mock de Alice</Text>
      <Text />
      <StatusBar style="auto" />
      <Text>Para llamar a:</Text>
      <View style={styles.container2}>
        <Button style={styles.buttonOps} color="#841584" title="Bob" onPress={() => fillStates('Bob')} />
        <Button style={styles.buttonOps} color="#158415" title="AppConductor" onPress={() => fillStates('AppConductor')} />
        <Button style={styles.buttonOps} color="#485148" title="Clear" onPress={() => fillStates('clear')} />
      </View>
      <View style={styles.container2}>
      <Text style={styles.labelInputTxt}>Scheme:</Text>
      <TextInput
        style={styles.texts}
        onChangeText={text => onChangeScheme(text)}
        value={schemeValue}
        placeHolder="Scheme" 
      />
      </View>
      <View style={styles.container2}>
      <Text style={styles.labelInputTxt}>Path:</Text>
      <TextInput
        style={styles.texts}
        onChangeText={text => onChangePath(text)}
        value={pathValue}
        placeHolder="Path" 
      />
      </View>
      <View style={styles.container2}>
      <Text style={styles.labelInputTxt}>Username:</Text>
      <TextInput
        style={styles.texts}
        onChangeText={text => onChangeUsername(text)}
        value={usernameValue}
        placeHolder="Username" 
      />
      </View>
      <View style={styles.container2}>
      <Text style={styles.labelInputTxt}>Token:</Text>
      <TextInput
        style={styles.texts}
        onChangeText={text => onChangeToken(text)}
        value={tokenValue}
        placeHolder="Token" 
      />
      </View>
      <Text />
      <Text>Url creada:</Text>
      <Text>{schemeValue}:/{pathValue}?username={usernameValue}{'&'}token={tokenValue}</Text>
      <Button title="Open App" onPress={ () => linkToBob(schemeValue, pathValue, usernameValue, tokenValue) } />
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
  container2: {
    flexDirection: 'row'
  },
  buttonOps: {
    margin: 4, 
  },
  texts: { height: 40, width: 150, borderColor: 'gray', borderWidth: 1 },
  labelInputTxt: {
    height: 40, 
    width: 80
  }
});
