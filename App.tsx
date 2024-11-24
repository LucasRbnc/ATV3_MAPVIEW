import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ContactProvider } from "./src/context/context";
import { Start } from "./src/screen/Start";
import { LocationScreen } from "./src/screen/Location";
import { Contact } from "./src/screen/Contatos";
import { FormScreen } from "./src/screen/Form";
import { ContactInterface } from "./src/types/type";

export type RootStackParamList = {
  Start: undefined;
  Contatos: undefined;
  Location: {contact: ContactInterface};
  Form: undefined;
}

const Stack = createStackNavigator<RootStackParamList>();

export default function App(){
  return (
    <ContactProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start" options={{headerShown: false}} component={Start}/>
          <Stack.Screen  name="Contatos" options={{title: "Contatos", headerLeft: () => null}} component={Contact}/>
          <Stack.Screen name="Form" options={{title: "Cadastro"}}component={FormScreen} />
          <Stack.Screen name="Location" options={{title:"Localização"}} component={LocationScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ContactProvider>
  )
}