import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import onboardingImg from '../images/onboarding-01.png';
import onboardingImg2 from '../images/onboarding-02.png';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

interface PageProps {
  id: string;
  image: object;
  mainText: string;
  secondaryText?: string;
  onPress: () => void;
}

interface ItemProps {
  item: PageProps;
}

const Onboarding: React.FC = () => {
  const flatListRef = useRef<FlatList<PageProps>>(null);
  const navigation = useNavigation();

  const pages: PageProps[] = [
    {
      id: '0',
      image: onboardingImg,
      mainText: 'Leve felicidade para o mundo',
      secondaryText: `Visite orfanatos e mude o \ndia de muitas crianças.`,
      onPress: handleNextPageClick,
    },
    {
      id: '1',
      image: onboardingImg2,
      mainText: 'Escolha um\n orfanato no mapa\n e faça uma visita',
      onPress: handleOnboardingFinish,
    },
  ];

  function handleNextPageClick() {
    flatListRef.current?.scrollToIndex({ animated: true, index: 1 });
  }

  async function handleOnboardingFinish() {
    await AsyncStorage.setItem(
      '@happy:check_first_access',
      '{firstAccess: false}'
    );
    navigation.reset({
      routes: [{ name: 'Intro' }],
      index: 0,
    });
  }

  const Item = ({ item }: ItemProps) => (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />
      {item.secondaryText ? (
        <>
          <Text style={styles.mainText}>{item.mainText}</Text>
          <Text style={styles.secondaryText}>{item.secondaryText}</Text>
        </>
      ) : (
        <Text style={styles.secondPageText}>{item.mainText}</Text>
      )}

      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          <View
            style={item.id === '0' ? styles.indicatorActive : styles.indicator}
          />
          <View
            style={item.id === '1' ? styles.indicatorActive : styles.indicator}
          />
        </View>
        <RectButton style={styles.nextButton} onPress={item.onPress}>
          <Feather name='arrow-right' size={24} color='#15B6D6' />
        </RectButton>
      </View>
    </View>
  );

  const renderItem = (item: PageProps) => {
    return <Item item={item} />;
  };
  return (
    <FlatList
      ref={flatListRef}
      data={pages}
      renderItem={({ item }) => renderItem(item)}
      keyExtractor={item => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: '#F2F3F5',
    padding: 48,
    justifyContent: 'space-between',
  },
  image: {
    alignSelf: 'center',
  },
  mainText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 48,
    lineHeight: 53,
    color: '#0089A5',
  },
  secondaryText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 20,
    lineHeight: 30,
    color: '#5C8599',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  indicatorContainer: {
    width: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  indicatorActive: {
    width: 16,
    height: 4,
    backgroundColor: '#FFD152',
    borderRadius: 4,
  },
  indicator: {
    width: 8,
    height: 4,
    backgroundColor: '#BECFD8',
    borderRadius: 4,
  },
  nextButton: {
    width: 56,
    height: 56,
    backgroundColor: '#D1EDF2',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondPageText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 30,
    lineHeight: 36,
    color: '#0089A5',
    textAlign: 'right',
  },
});

export default Onboarding;
