import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import Header from '../components/Header';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.content}>
        
        <Text style={styles.sectionTitle}>Ações</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {/* Card Ação */}
          <View style={styles.actionCard}>
            <View style={styles.ribbon} />
            <Text style={styles.cardHeader}>12km - 17km</Text>
            <View style={styles.divider} />
            <Text style={styles.cardSubText}>ultima poda</Text>
            <Text style={styles.cardMainText}>22/03</Text>
            <Text style={styles.cardSubText}>Taxa de{'\n'}Crescimento</Text>
            <Text style={styles.cardSmallText}>4 cm por semana</Text>
          </View>
        </ScrollView>

        <Text style={styles.sectionTitle}>Equipes</Text>
        <View style={styles.teamContainer}>
          <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.avatar} />
          <View style={styles.teamInfo}>
            <Text style={styles.teamNameBadge}>Equipe Marcio</Text>
            <Text style={styles.teamLocationBadge}>km 21 - km 31</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Trabalhando</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Podas Agendadas</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* Card Poda */}
          <View style={styles.scheduleCard}>
            <Text style={styles.dateText}>31/05</Text>
            <View style={styles.scheduleInfo}>
              <Text style={styles.scheduleDetail}>Equipe João</Text>
              <Text style={styles.scheduleDetail}>Rodoanel</Text>
              <Text style={styles.scheduleDetail}>km 31 - km 37</Text>
              <Text style={styles.scheduleDetail}>Poda e manutenção</Text>
            </View>
          </View>
        </ScrollView>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20 },
  sectionTitle: { fontSize: 24, color: '#6c757d', marginBottom: 15, marginTop: 10 },
  horizontalScroll: { marginBottom: 20 },
  actionCard: {
    borderWidth: 1, borderColor: '#dcdcdc', borderRadius: 15, padding: 20,
    width: 200, alignItems: 'center', marginRight: 15, backgroundColor: '#fff'
  },
  ribbon: { position: 'absolute', top: -5, left: 15, width: 20, height: 40, backgroundColor: '#a52a2a' },
  cardHeader: { fontSize: 12, color: '#333' },
  divider: { height: 1, backgroundColor: '#ccc', width: '100%', marginVertical: 10 },
  cardSubText: { fontSize: 12, color: '#666', textAlign: 'center' },
  cardMainText: { fontSize: 20, marginVertical: 5 },
  cardSmallText: { fontSize: 10, marginTop: 5 },
  
  teamContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  teamInfo: { marginLeft: 15, flex: 1 },
  teamNameBadge: { backgroundColor: '#cce5ff', paddingHorizontal: 10, borderRadius: 10, fontSize: 12, alignSelf: 'flex-start', marginBottom: 5 },
  teamLocationBadge: { backgroundColor: '#e6e6ff', paddingHorizontal: 10, borderRadius: 10, fontSize: 12, alignSelf: 'flex-start' },
  statusBadge: { backgroundColor: '#a07a7a', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 15 },
  statusText: { color: '#fff', fontSize: 12 },

  scheduleCard: {
    flexDirection: 'row', borderWidth: 1, borderColor: '#dcdcdc', borderRadius: 15,
    padding: 15, alignItems: 'center', marginRight: 15, backgroundColor: '#fff', minWidth: 280
  },
  dateText: { fontSize: 28, color: '#333', marginRight: 20 },
  scheduleInfo: { flex: 1 },
  scheduleDetail: { fontSize: 12, color: '#555' }
});