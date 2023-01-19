// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, {useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import Home from '../../assets/Home.svg';
// import Mypage from '../../assets/Mypage.svg';
// import Setting from '../../assets/Setting.svg';
// import NFT from '../../assets/NFT.svg';

// const BottomNav = ({navigation}: any) => {
//   const enterMypage = async () => {
//     const act = await AsyncStorage.getItem('act');
//     if (act === null) {
//       alert('로그인 해주세요.');
//     } else {
//       navigation.push('Mypage');
//     }
//     // if (act) {
//     //   try {
//     //     const userInfo = await HOME_SERVICE.INFO();
//     //     console.log('tw', userInfo);
//     //     setUserInfo(userInfo);
//     //     setIsAccess(true);
//     //   } catch (error) {
//     //     setIsAccess(false);
//     //   }
//     // }
//   };

//   return (
//     <View style={styles.bottomNavContainer}>
//       <View>
//         <View style={styles.rectangleContainer}>
//           <View style={styles.rectangle} />
//         </View>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             onPress={() => {
//               navigation.navigate('Home');
//             }}
//             style={styles.imageContainer}>
//             {/* <Image source={require('../../assets/home.png')} /> */}
//             <Home></Home>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => {
//               navigation.push('NFTDocument');
//             }}
//             style={styles.imageContainer}>
//             <NFT></NFT>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => {
//               enterMypage();
//             }}
//             style={styles.imageContainer}>
//             <Mypage></Mypage>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => {
//               navigation.push('Setting');
//             }}
//             style={styles.imageContainer}>
//             <Setting></Setting>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };
// const bottomNavHeight = 90;

// const styles = StyleSheet.create({
//   bottomNavContainer: {
//     backgroundColor: 'white',
//     width: '100%',
//     position: 'absolute',
//     top: Dimensions.get('window').height - bottomNavHeight,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: bottomNavHeight,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     elevation: 100,
//     justifyContent: 'space-between',
//     overflow: 'hidden',
//   },
//   rectangleContainer: {
//     width: '100%',
//     height: 22,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   rectangle: {
//     backgroundColor: '#E0E0E0',
//     width: 37,
//     height: 7,
//     marginTop: 5,
//     borderRadius: 20,
//   },
//   buttonContainer: {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'row',
//     width: '100%',
//     padding: 10,
//     justifyContent: 'space-around',
//   },
//   imageContainer: {
//     width: 47,
//     height: 53,
//   },
// });

// export default BottomNav;
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Home from '../../assets/Home.svg';
import Nft from '../../assets/NFT.svg';
import Mypage from '../../assets/Mypage.svg';
import Settings from '../../assets/Setting.svg';

const BottomNav = ({navigation}: any) => {
  const enterMypage = async () => {
    const act = await AsyncStorage.getItem('act');
    if (act === null) {
      alert('로그인 해주세요.');
    } else {
      navigation.push('Mypage');
    }
    // if (act) {
    //   try {
    //     const userInfo = await HOME_SERVICE.INFO();
    //     console.log('tw', userInfo);
    //     setUserInfo(userInfo);
    //     setIsAccess(true);
    //   } catch (error) {
    //     setIsAccess(false);
    //   }
    // }
  };

  return (
    <View style={styles.bottomNavContainer}>
      <View>
        <View style={styles.rectangleContainer}>
          <View style={styles.rectangle} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}
            style={styles.imageContainer}>
            {/* <Image source={require('../../assets/home.png')} /> */}
            <Home />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.push('NFTDocument');
            }}
            style={styles.imageContainer}>
            {/* <Image source={require('../../assets/nft_document2.png')} /> */}
            <Nft />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              enterMypage();
            }}
            style={styles.imageContainer}>
            {/* <Image source={require('../../assets/mypage.png')} /> */}
            <Mypage />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.push('Setting');
            }}
            style={styles.imageContainer}>
            {/* <Image source={require('../../assets/setting.png')} /> */}
            <Settings />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const bottomNavHeight = 90;

const styles = StyleSheet.create({
  bottomNavContainer: {
    backgroundColor: 'white',
    width: '100%',
    position: 'absolute',
    top: Dimensions.get('window').height - bottomNavHeight,
    bottom: 0,
    left: 0,
    right: 0,
    height: bottomNavHeight,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 100,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  rectangleContainer: {
    width: '100%',
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -20,
  },
  rectangle: {
    backgroundColor: '#E0E0E0',
    width: 37,
    height: 7,
    marginTop: 5,
    borderRadius: 20,
  },
  buttonContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    justifyContent: 'space-around',
  },
  imageContainer: {
    width: 47,
    height: 49,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default BottomNav;
