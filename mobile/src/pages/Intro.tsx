import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, Animated } from 'react-native';

import logoImg from '../images/logo.png';

const Intro: React.FC = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideDown] = useState(new Animated.Value(0));
  const [fadeOutAnim] = useState(new Animated.Value(1));
  const navigation = useNavigation();

  useEffect(() => {
    const fadeAnimation = (toValue = 1) =>
      Animated.timing(fadeAnim, {
        toValue,
        duration: 400,
        useNativeDriver: false,
      });
    const slideDownAnimation = (toValue = 0) =>
      Animated.timing(slideDown, {
        toValue,
        duration: 200,
        useNativeDriver: false,
        delay: 200,
      });
    const fadeOutAnimation = () =>
      Animated.timing(fadeOutAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
        delay: 150,
      });
    async function animations() {
      const animations = new Promise(resolve => {
        fadeAnimation().start();
        setTimeout(() => {
          fadeAnimation(0).start();
          slideDownAnimation(300).start();
          resolve();
        }, 1000);
      });
      await animations;
      fadeOutAnimation().start();
      setTimeout(() => {
        navigation.reset({
          routes: [{ name: 'OrphanagesMap' }],
          index: 0,
        });
      }, 350);
    }
    animations();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeOutAnim }]}>
      <LinearGradient
        colors={['#15B6D6', '#15D6D6']}
        start={{ x: 1, y: 1 }}
        end={{
          x: 0,
          y: 0,
        }}
        style={styles.gradientContainer}
      >
        <Animated.Image
          source={logoImg}
          style={{ marginTop: slideDown, opacity: fadeAnim }}
        />
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    zIndex: 150,
    backgroundColor: 'black',
  },
  gradientContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Intro;
