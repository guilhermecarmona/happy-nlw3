import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CancelCreation: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Feather name='x' size={32} color='#FF669D' />
      </View>
      <Text style={styles.title}>Cancelar cadastro</Text>
      <Text style={styles.messageText}>
        Tem certeza que quer cancelar esse cadastro?
      </Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.noButton} onPress={navigation.goBack}>
          <Text style={styles.buttonText}>Não</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.yesButton}
          onPress={() => navigation.navigate('OrphanagesMap')}
        >
          <Text style={styles.buttonText}>Sim</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF669D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 32,
    lineHeight: 34,
    color: '#fff',
    marginTop: 24,
    textAlign: 'center',
    width: 269,
  },
  messageText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 20,
    lineHeight: 30,
    color: '#fff',
    marginTop: 24,
    textAlign: 'center',
    width: 213,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 269,
  },
  noButton: {
    width: 128,
    height: 56,
    borderWidth: 2,
    borderColor: '#D6487B',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yesButton: {
    width: 128,
    height: 56,
    backgroundColor: '#D6487B',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 15,
    lineHeight: 25,
    color: '#fff',
  },
});

export default CancelCreation;
