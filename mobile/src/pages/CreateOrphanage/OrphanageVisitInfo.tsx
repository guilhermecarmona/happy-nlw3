import React, { useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { useCreateOrphanage } from '../../contexts/CreateOrphanageProvider';

export default function OrphanageVisitInfo() {
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);

  const { states } = useCreateOrphanage();

  const navigation = useNavigation();

  async function handleCreateOrphanage() {
    const { latitude, longitude } = states.position;

    const data = new FormData();
    data.append('name', states.name);
    data.append('about', states.about);
    data.append('instructions', instructions);
    data.append('latitude', latitude.toString());
    data.append('longitude', longitude.toString());
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', open_on_weekends.toString());

    states.images.forEach((image, index) => {
      data.append('images', {
        name: `image_${index}.jpg`,
        type: 'image/jpeg',
        uri: image,
      } as any);
    });

    await api.post('orphanages', data);
    navigation.navigate('OrphanageCreated');
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
          <Text style={styles.title}>Visitação</Text>
          <View style={styles.creationProgress}>
            <Text style={styles.creationProgressText}>01</Text>
            <Text style={styles.creationProgressText}>{` - `}</Text>
            <Text
              style={[
                styles.creationProgressText,
                styles.creationProgressTextActive,
              ]}
            >
              02
            </Text>
          </View>
        </View>
        <Text style={styles.label}>Instruções</Text>
        <TextInput
          style={[styles.input, { height: 110 }]}
          multiline
          value={instructions}
          onChangeText={setInstructions}
        />

        <Text style={styles.label}>Horario de visitas</Text>
        <TextInput
          style={styles.input}
          value={opening_hours}
          onChangeText={setOpeningHours}
        />

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Atende final de semana?</Text>
          <Switch
            thumbColor='#fff'
            trackColor={{ false: '#ccc', true: '#39CC83' }}
            value={open_on_weekends}
            onValueChange={setOpenOnWeekends}
          />
        </View>
      </ScrollView>
      <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
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

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
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
