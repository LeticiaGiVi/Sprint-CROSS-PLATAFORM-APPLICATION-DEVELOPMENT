import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header';
// Recomendado instalar react-native-calendars para o calendário:
// npm install react-native-calendars
import { Calendar } from 'react-native-calendars';

export default function CronogramaScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.calendarContainer}>
          <Calendar
            current={'2021-09-01'}
            markedDates={{
              '2021-09-19': {selected: true, selectedColor: '#ff5722'},
              '2021-09-24': {selected: true, selectedColor: '#ff5722'},
            }}
            theme={{
              todayTextColor: '#00adf5',
              arrowColor: '#ccc',
            }}
          />
        </View>

        {/* Lista de Agendamentos */}
        <View style={styles.scheduleCard}>
          <Text style={styles.dateText}>19/07</Text>
          <View style={styles.scheduleInfo}>
            <Text style={styles.scheduleDetail}>Equipe João</Text>
            <Text style={styles.scheduleDetail}>Rodoanel</Text>
            <Text style={styles.scheduleDetail}>km 31 - km 37</Text>
            <Text style={styles.scheduleDetail}>Poda e manutenção</Text>
          </View>
        </View>

        <View style={styles.scheduleCard}>
          <Text style={styles.dateText}>24/07</Text>
          <View style={styles.scheduleInfo}>
            <Text style={styles.scheduleDetail}>Equipe João</Text>
            <Text style={styles.scheduleDetail}>Rodoanel</Text>
            <Text style={styles.scheduleDetail}>km 31 - km 37</Text>
            <Text style={styles.scheduleDetail}>Poda e manutenção</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20 },
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  scheduleCard: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  dateText: { fontSize: 28, color: '#333', marginRight: 20, width: 80, textAlign: 'center' },
  scheduleInfo: { flex: 1, alignItems: 'center' },
  scheduleDetail: { fontSize: 14, color: '#555', textAlign: 'center' }
});