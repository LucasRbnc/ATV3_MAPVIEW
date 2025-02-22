import React, {useState, useEffect} from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, {Marker, MapPressEvent} from 'react-native-maps';
import { addContact } from '../service/contactService';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import * as Location from 'expo-location';

type FormScreenNavigationProp = StackNavigationProp<RootStackParamList, "Form">;

interface Props {
    navigation: FormScreenNavigationProp;
};

export const FormScreen: React.FC<Props> = ({navigation}) =>{
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [selectedLocation, setSelectedLocation] = useState<{latitude: number; longitude: number} | null>(null);

    const getPermissions = async () => {
        const {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Erro', 'Permissão de localização não concedida');
            return;
        };
    };
    useEffect(() =>{
        getPermissions();
    }, []);

    const handleMapPress = async (event: MapPressEvent) =>{
        const {latitude, longitude} = event.nativeEvent.coordinate;
        setSelectedLocation({latitude,longitude});

        try{
            const location = await Location.reverseGeocodeAsync({latitude,longitude})

            if(location.length > 0){
                const {street, name, city, region, postalCode, country} = location[0];
                const fullAddress = `${street ?? ''} ${name ?? ''}, ${city ?? ''} - ${region ?? ''}, ${postalCode ?? ''}, ${country ?? ''}`;
                setAddress(fullAddress);
            } else{
                setAddress('Endereço não encontrado');
            }
        } catch (error) {
            Alert.alert('Erro');
            console.error('Geocoding error', error);
        }
    };

    const handleAddContact = async () =>{
        if(!selectedLocation) {
            Alert.alert('Erro');
            return;
        }

        try{
            await addContact({name,latitude: selectedLocation.latitude, longitude: selectedLocation.longitude, address});
            navigation.goBack();
        } catch (error) {
            Alert.alert('Erro');
            console.error('add contact error', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput placeholder='Nome' value={name} onChangeText={setName} style={styles.input}/>
            <TextInput placeholder='Endereço' value={address} onChangeText={setAddress} style={styles.input}/>
            <Text style={styles.addressText}>Endereço: {address}</Text>
            <TouchableOpacity style={styles.saveButton} onPress={handleAddContact}>
                <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
            <MapView style={styles.map} initialRegion={{latitude: -23.2237, longitude: -45.8992, latitudeDelta: 0.01, longitudeDelta: 0.01}} onPress={handleMapPress}>
                {selectedLocation && (
                    <Marker coordinate={selectedLocation} title='Local selecionado'/>
                )}
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f5f5f5',
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 8,
      paddingHorizontal: 8,
    },
    addressText: {
      fontSize: 14,
      color: '#555',
      marginBottom: 8,
      marginTop: 10
    },
    map: {
      flex: 1,
      width: '100%',
      height: "100%",
      marginTop: 16,
    },
    saveButton: {
      backgroundColor: '#1E90FF',
      padding: 10,
      borderRadius: 8,
      alignItems: 'center',
      width: "50%",
      alignSelf: "center"
    },
    saveButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });