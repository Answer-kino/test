import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Intro from './src/views/intro/Intro';
import Home from './src/views/main/Home';
import ContractCheck from './src/views/pages/contractCheck/ContractCheck';
import CarDocument from './src/views/pages/carDocument/CarDocument';
import NFTWallet from './src/views/pages/nftWallet/NFTWallet';
import RaceInfo from './src/views/pages/raceInfo/RaceInfo';
import Login from './src/views/login/login';
import Login2 from './src/views/login/login2';
import Connect from './src/views/connect';
import TermsOfService from './src/views/termsOfService';

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
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login2"
            component={Login2}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Connect"
            component={Connect}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TermsOfService"
            component={TermsOfService}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ContractCheck"
            component={ContractCheck}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CarDocument"
            component={CarDocument}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="NFTWallet"
            component={NFTWallet}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="RaceInfo"
            component={RaceInfo}
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
    backgroundColor: 'white',
  },
});
export default App;
