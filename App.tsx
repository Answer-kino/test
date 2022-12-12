import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Intro from './src/views/intro/Intro';
import Home from './src/views/main/Home';
import Login from './src/views/login/login';
import Login2 from './src/views/login/login2';
import Connect from './src/views/connect';
import TermsOfService from './src/views/termsOfService';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaView style={styles.appContainer}>
      {/* <NavigationContainer>
        <Stack.Navigator initialRouteName="Intro">
          <Stack.Screen
            name="Intro"
            component={Intro}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer> */}
      <View>
        <TermsOfService />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});
export default App;
