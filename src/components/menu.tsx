import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';


export default function Header() {
  return (
    <View style={styles.container}>
      {/* Logo/Menu */}
      <TouchableOpacity style={styles.logoContainer}>
      
      </TouchableOpacity>

      {/* Menu Horizontal */}
      <View style={styles.menu}>
        <TouchableOpacity style={[styles.item, styles.active]}>
       
          <Text style={styles.activeText}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
         
          <Text style={styles.text}>Mapas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
         
          <Text style={styles.text}>Equipes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
        
          <Text style={styles.text}>Cronograma</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          
          <Text style={styles.text}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    elevation: 4,
  },

  logoContainer: {
    marginRight: 15,
  },

  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 40,
    marginRight: 15,
  },

  input: {
    flex: 1,
    marginLeft: 8,
  },

  menu: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 10,
  },

  active: {
    backgroundColor: '#2196F3',
  },

  activeText: {
    color: '#FFF',
    marginLeft: 6,
    fontWeight: '600',
  },

  text: {
    color: '#666',
    marginLeft: 6,
  },
});