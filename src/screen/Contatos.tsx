import React, { useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useContact } from '../hooks/useContact';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native';

type ContatosScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Contatos'>;

interface Props {
    navigation: ContatosScreenNavigationProp
}

export const Contact: React.FC<Props> = ({navigation}) => {
    const { contacts, loadContacts } = useContact();
    useFocusEffect(
        useCallback(() => {
            loadContacts();
        }, [loadContacts])
    );

    return(
        <View style={styles.container}>
            <FlatList
                data={contacts}
                keyExtractor={(item) => item.id}
                renderItem={({item}) =>(
                    <View style={styles.contactCard}>
                        <TouchableOpacity onPress={() =>  navigation.navigate('Location', {contact: item})}>
                            <Text style={styles.contactName}>{item.name}</Text>
                            <Text style={styles.contactName}>{item.address}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Form')}>
                <Ionicons name="add" size={20} color="white" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f5f5f5',
    },
    contactCard: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      marginVertical: 8,
      elevation: 3,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
    },
    contactName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    contactAddress: {
      fontSize: 14,
      color: '#555',
    },
    addButton: {
      position: 'absolute',
      bottom: 16,
      right: 16,
      backgroundColor: '#4CAF50',
      borderRadius: 30,
      width: 56,
      height: 56,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 6,
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
    },
  });