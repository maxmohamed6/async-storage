import React, { useState, useEffect } from 'react';

import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage'

const App = () => {

  const [name, setName] = useState(''); //estado pra armazenar o nome
  const [savedName, setSavedName] = useState(''); //estado pra armazenar o nome gravado
  
  
  useEffect(() => { //Gancho para carregar sempre que o componente for montado
  
  const loadName = async () => { //função pra carregar o nome do AsyncStorage
    
      const value = await AsyncStorage.getItem('@name')
      if(value !== null){
      
        setSavedName(value); //atualiza o estado com o nome armazenado
      
      }
    
    }
  
  }, [])//dependencias vazias
  
  const saveName = async () => {
    
      await AsyncStorage.setItem('@name', name) //chave-valor
      setSavedName(name); //Atualiza o estado com o nome gravado
      setName('')
    
    }

  const clearName = async () => {
      await AsyncStorage.removeItem('@name');
      setSavedName('') // Remove o nome do AsyncStorage
    }

    return (
        <View style={styles.container}>
            <Text style={styles.basicText}>Digite seu nome: </Text>    
            <TextInput 
                style={styles.basicInput}
                placeholder="Digite aqui"
                value={name}
                onChangeText={setName}
            />
            <Button
                title="Gravar"
                style={styles.basicButton}
                onPress={saveName}  
            />
            
            <Button
                title="Limpar"
                style={styles.basicButton}
                onPress={clearName}  
            />
            <Text style={styles.complexText}>Olá, {savedName} (Nome armazenado em AsyncStorage)</Text>
        </View>
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  basicText: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  basicInput: {
    height: 40,
    borderWidth: 1,
    marginBottom: 15,
    textAlign: 'center'
  },
  basicButton: {
    marginTop: 10,
    backgroundColor: "#B22",
    color: '#fff'
  },
  complexText: {
    marginTop: 10,
    color: '#f00'
  },
});

export default App;


