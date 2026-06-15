import React from 'react';
import  NavigationContainer  from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '@/screens/Dashboards';
import EquipesScreen from '@/screens/Equipes';
import CronogramaScreen from '@/screens/Cronograma';
// Você precisará criar um CustomDrawerContent para deixar o menu azul e estilizado como na foto

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: false, // Vamos usar um header customizado
          drawerActiveBackgroundColor: '#0088ff',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#666',
        }}
      >
        <Drawer.Screen name="Dashboard" component={DashboardScreen} />
        <Drawer.Screen name="Mapas" component={DashboardScreen} /> {/* Placeholder */}
        <Drawer.Screen name="Equipes" component={EquipesScreen} />
        <Drawer.Screen name="Cronograma" component={CronogramaScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}