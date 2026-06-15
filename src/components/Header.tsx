import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de ter o expo/vector-icons
import { useNavigation } from '@react-navigation/native';

export default function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu-outline" size={32} color="#333" />
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#999" />
        <TextInput 
          style={styles.searchInput} 
          placeholder="Search anything" 
          placeholderTextColor="#999"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#e6e6e6', // Fundo cinza do topo
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginLeft: 15,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
  }
});