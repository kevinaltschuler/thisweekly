import React from 'react';
import { Alert, StyleSheet, Text, View, TouchableHighlight, TouchableNativeFeedback } from 'react-native';

import Expo from 'expo';
import { ANDROID_OAUTH_CLIENT_ID } from './constants.js';

async function signInWithGoogleAsync() {
  try {
    const result = await Expo.Google.logInAsync({
      androidClientId: ANDROID_OAUTH_CLIENT_ID,
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
        return result;
    } else {
      return {cancelled: true};
    }
  } catch(e) {
    return {error: true};
  }
}

export default class App extends React.Component {

    async onGoogleSignIn() {
        try {
          await AsyncStorage.setItem('googleplususer', signInWithGoogleAsync());
        } catch (error) {
          // Error saving data
        }
    }

    async getGoogleUser() {
        try {
            const value = await AsyncStorage.getItem('googleplususer');
            if (value !== null) {
                // We have data!!
                console.log(value);
            }
        } catch (error) {
            // Error retrieving data
        }
    }

    render() {
        this.getGoogleUser();
        return (
          <View style={styles.container}>
              <TouchableNativeFeedback
                  background={TouchableNativeFeedback.SelectableBackground()}
                  onPress={() => this.onGoogleSignIn()}
              >
                  <View
                      style={{backgroundColor: 'white', borderRadius: 2, paddingHorizontal: 20, paddingVertical: 10, elevation: 2}}
                  >
                      <Text style={{color: 'black'}}>sign in with google</Text>
                  </View>
              </TouchableNativeFeedback>

          </View>
      );

    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
