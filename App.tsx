import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

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
import CommunityBoardList from './src/views/pages/community/CommunityBoardList';
import CommunityBoard from './src/views/pages/community/CommunityBoard';
import CommunityBoardWrite from './src/views/pages/community/CommunityBoardWrite';
import NoticeList from './src/views/pages/notice/NoticeList';
import NoticeCategory from './src/views/pages/notice/NoticeCategory';
import Notice from './src/views/pages/notice/Notice';
import Mypage from './src/views/mypage/mypage';
import NFTDocument from './src/views/pages/nftDocument/NFTDocument';
import ChangePassword from './src/views/mypage/changePassword';
import SideMenu from './src/components/sideMenu/SideMenu';
import Inquiry from './src/views/pages/inquiry/Inquiry';
import Question from './src/views/pages/question/Question';
import CarRegister from './src/views/pages/carRegister/CarRegister';
import Insurance from './src/views/pages/insurance/Insurance';
const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaView style={styles.appContainer}>
      <KeyboardAvoidingView
        behavior={Platform.select({ios: 'padding', android: 'height'})}
        style={styles.avoid}>
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
            <Stack.Screen
              name="CommunityBoardList"
              component={CommunityBoardList}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CommunityBoard"
              component={CommunityBoard}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CommunityBoardWrite"
              component={CommunityBoardWrite}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="NoticeCategory"
              component={NoticeCategory}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="NoticeList"
              component={NoticeList}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Notice"
              component={Notice}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Mypage"
              component={Mypage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="NFTDocument"
              component={NFTDocument}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ChangePassword"
              component={ChangePassword}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Inquiry"
              component={Inquiry}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Question"
              component={Question}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CarRegister"
              component={CarRegister}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Insurance"
              component={Insurance}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
        {/* <View>
        <Intro />
      </View> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoid: {
    flex: 1,
    height: '100%',
  },
});
export default App;
