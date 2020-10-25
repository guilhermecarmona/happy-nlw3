import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  AsyncStorage,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';

import mapMarkerImg from '../../images/map-marker.png';
import handImg from '../../images/hand.png';
import { useCreateOrphanage } from '../../contexts/CreateOrphanageProvider';

export default function SelectMapPosition() {
  const navigation = useNavigation();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [displayHelp, setDisplayHelp] = useState(false);

  const { setPosition: setContextPosition } = useCreateOrphanage();

  useEffect(() => {
    AsyncStorage.getItem('@happy:check_first_access_create_orphanage').then(
      value => {
        if (!value) {
          setDisplayHelp(true);
          AsyncStorage.setItem(
            '@happy:check_first_access_create_orphanage',
            JSON.stringify({ firstAccess: false })
          );
        }
      }
    );
  }, []);

  function handleNextStep() {
    setContextPosition(position);
    navigation.navigate('OrphanageData');
  }

  function handleSelectMapPosition(e: MapEvent) {
    setPosition(e.nativeEvent.coordinate);
  }

  return (
    <>
      <Modal animationType='fade' transparent visible={displayHelp}>
        <View style={styles.helpContainer}>
          <Image source={handImg} />
          <Text style={styles.helpText}>
            Toque no mapa para adicionar um orfanato
          </Text>
          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => setDisplayHelp(false)}
          >
            <Text style={styles.helpButtonText}>Entendi</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.container}>
        <MapView
          initialRegion={{
            latitude: -22.0180858,
            longitude: -47.8868384,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          style={styles.mapStyle}
          onPress={handleSelectMapPosition}
        >
          {position.latitude !== 0 && (
            <Marker
              icon={mapMarkerImg}
              coordinate={{
                latitude: position.latitude,
                longitude: position.longitude,
              }}
            />
          )}
        </MapView>

        {position.latitude !== 0 && (
          <RectButton style={styles.nextButton} onPress={handleNextStep}>
            <Text style={styles.nextButtonText}>Próximo</Text>
          </RectButton>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  helpContainer: {
    position: 'relative',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(21, 182, 214, 0.8)',
  },
  helpText: {
    fontFamily: 'Nunito_800ExtraBold',
    margin: 16,
    color: '#fff',
    fontSize: 24,
    lineHeight: 34,
    textAlign: 'center',
    width: 203,
  },
  helpButton: {
    backgroundColor: '#FFD152',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 60,
  },
  helpButtonText: {
    color: '#fff',
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },
});
