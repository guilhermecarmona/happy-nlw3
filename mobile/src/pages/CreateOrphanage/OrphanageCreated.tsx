import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import successImg from '../../images/success.png';

const OrphanageCreated: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={successImg} />
      <Text style={styles.title}>Ebaaa!</Text>
      <Text style={styles.messageText}>
        O cadastro deu certo e foi enviado ao administrador para ser aprovado.
        Agora é só esperar :)
      </Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('OrphanagesMap')}
        >
          <Text style={styles.buttonText}>Ok</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#39CC83',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 40,
    lineHeight: 45,
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
    width: 310,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 310,
    marginTop: 24,
  },
  button: {
    width: 120,
    height: 56,
    backgroundColor: '#19C06D',
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

export default OrphanageCreated;
