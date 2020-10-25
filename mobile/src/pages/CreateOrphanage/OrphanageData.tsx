import React, { useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useCreateOrphanage } from '../../contexts/CreateOrphanageProvider';

export default function OrphanageData() {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const { states, setStates } = useCreateOrphanage();

  const navigation = useNavigation();

  async function handleGoToOrphanageVisit() {
    setStates({
      position: states.position,
      name,
      about,
      images,
    });

    navigation.navigate('OrphanageVisitInfo');
  }

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status !== 'granted') {
      alert('Eita, precisamos de acesso às suas fotos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    const { uri } = result;

    setImages([...images, uri]);
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' enabled>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          padding: 24,
          flexGrow: 1,
        }}
      >
        <View style={styles.subHeader}>
          <Text style={styles.title}>Dados</Text>
          <View style={styles.creationProgress}>
            <Text
              style={[
                styles.creationProgressText,
                styles.creationProgressTextActive,
              ]}
            >
              01
            </Text>
            <Text style={styles.creationProgressText}>{` - `}</Text>
            <Text style={styles.creationProgressText}>02</Text>
          </View>
        </View>

        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>Sobre</Text>
        <TextInput
          style={[styles.input, { height: 110 }]}
          multiline
          value={about}
          onChangeText={setAbout}
        />

        {/* <Text style={styles.label}>Whatsapp</Text>
      <TextInput style={styles.input} /> */}

        <Text style={styles.label}>Fotos</Text>

        <View style={styles.uploadedImagesContainer}>
          {images.map(image => {
            return (
              <Image
                key={image}
                source={{ uri: image }}
                style={styles.uploadedImage}
              />
            );
          })}
        </View>
        <TouchableOpacity
          style={styles.imagesInput}
          onPress={handleSelectImages}
        >
          <Feather name='plus' size={24} color='#15B6D6' />
        </TouchableOpacity>
      </ScrollView>
      <RectButton style={styles.nextButton} onPress={handleGoToOrphanageVisit}>
        <Text style={styles.nextButtonText}>Próximo</Text>
      </RectButton>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  uploadedImagesContainer: {
    flexDirection: 'row',
  },

  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8,
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },

  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6',
  },

  creationProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  creationProgressText: {
    color: '#8FA7B3',
    fontSize: 12,
    lineHeight: 22,
    fontFamily: 'Nunito_600SemiBold',
  },

  creationProgressTextActive: {
    fontFamily: 'Nunito_800ExtraBold',
  },
});
