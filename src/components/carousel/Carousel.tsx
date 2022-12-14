import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  View,
  Pressable,
  Image,
} from 'react-native';
import banner from '../../assets/banner.png';
import banner2 from '../../assets/banner2.png';
import Ellipse7 from '../../assets/Ellipse7.png';
import Ellipse8 from '../../assets/Ellipse8.png';
import useInterval from './useInterval';

const windowWidth = Dimensions.get('window').width;
const cardSize = {width: windowWidth, height: windowWidth / 3.54545454};
const offset = cardSize.width;
const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const data = useMemo(
    () => [
      {
        mainImageUrl: banner,
      },
      {
        mainImageUrl: banner2,
      },
      {
        mainImageUrl: banner,
      },
      {
        mainImageUrl: banner2,
      },
    ],
    [],
  );
  const snapToOffsets = useMemo(
    () => Array.from(Array(data.length)).map((_, index) => index * offset),
    [data],
  );
  useEffect(() => {
    if (currentIndex !== snapToOffsets.length) {
      flatListRef.current?.scrollToOffset({
        animated: true,
        offset: snapToOffsets[currentIndex],
      });
    }
  }, [currentIndex, snapToOffsets]);

  useInterval(() => {
    setCurrentIndex(prev => (prev === snapToOffsets.length - 1 ? 0 : prev + 1));
  }, 5000);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        renderItem={({item, index}) => (
          <Pressable>
            <ImageBackground style={styles.cardSize} source={item.mainImageUrl}>
              <View style={styles.dotContainer}>
                {data.map((_, idx) => {
                  return (
                    <Image
                      style={styles.dot}
                      source={
                        index === idx
                          ? require('../../assets/Ellipse7.png')
                          : require('../../assets/Ellipse8.png')
                      }
                    />
                  );
                })}
              </View>
            </ImageBackground>
          </Pressable>
        )}
        ref={flatListRef}
        snapToOffsets={snapToOffsets}
        keyExtractor={(_, index) => String(index)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    backgroundColor: '#fff',
  },
  cardSize: {
    width: windowWidth,
    height: windowWidth / 3.54545454,
    justifyContent: 'flex-end',
  },
  dot: {
    marginHorizontal: 3,
  },
  dotContainer: {
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default Carousel;
