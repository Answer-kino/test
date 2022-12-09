import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Intro from './src/views/intro/Intro';
import Home from './src/views/main/Home';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaView style={styles.appContainer}>
      <NavigationContainer>
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
      </NavigationContainer>
      {/* <View>
        <Intro />
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
});
export default App;
