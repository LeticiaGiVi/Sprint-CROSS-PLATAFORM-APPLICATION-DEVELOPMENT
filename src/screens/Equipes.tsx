import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { IconProps } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

const SkeletonItem = ({ isLarge }) => (
  <View style={styles.skeletonContainer}>
    <View style={styles.skeletonAvatar}>
      <Ionicons name="person" size={24} color="#a3b8ff" />
    </View>
    <View style={styles.skeletonLines}>
      <View style={[styles.line, { width: '40%' }]} />
      <View style={[styles.line, { width: '30%', backgroundColor: '#e0e7ff' }]} />
      {isLarge && (
        <>
          <View style={[styles.line, { width: '100%', marginTop: 15, backgroundColor: '#e0e7ff' }]} />
          <View style={[styles.line, { width: '100%', backgroundColor: '#e0e7ff' }]} />
        </>
      )}
    </View>
  </View>
);

export default function EquipesScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.title}>Equipes de férias</Text>
        <SkeletonItem isLarge={false} />
        
        <Text style={[styles.title, { marginTop: 30 }]}>Equipes Disponiveis</Text>
        <SkeletonItem isLarge={true} />
        <SkeletonItem isLarge={true} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  skeletonContainer: { flexDirection: 'row', marginBottom: 30 },
  skeletonAvatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: '#a3b8ff', justifyContent: 'center', alignItems: 'center' },
  skeletonLines: { flex: 1, marginLeft: 15 },
  line: { height: 10, backgroundColor: '#a3b8ff', borderRadius: 5, marginBottom: 8 }
});