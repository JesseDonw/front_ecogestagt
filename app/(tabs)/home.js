import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BarChart } from 'react-native-chart-kit';
import person from '../../assets/pers.png';
import ProfilCard from '../../component/ProfilCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';

export default function App() {
  const router = useRouter();

  // Liste des villes
  const [cities, setCities] = useState([
    { id: 1, name: 'CALAVI', thisWeek: [50, 20, 10, 30, 40], lastWeek: [30, 40, 20, 25, 35] },
    { id: 2, name: 'COTONOU', thisWeek: [30, 40, 20, 60, 80], lastWeek: [20, 25, 15, 50, 60] },
    { id: 3, name: 'SEME-PODJI', thisWeek: [70, 50, 30, 90, 100], lastWeek: [60, 45, 25, 80, 90] },
    { id: 4, name: 'OUIDAH', thisWeek: [20, 30, 10, 50, 60], lastWeek: [15, 25, 5, 40, 50] },
    { id: 5, name: 'ABOMEY', thisWeek: [10, 70, 60, 30, 40], lastWeek: [5, 60, 50, 20, 30] },
  ]);

  const [selectedCity, setSelectedCity] = useState(cities[0]); // Ville sélectionnée

  return (
    <SafeAreaView style={styles.safeAreaView}>
         <View style={styles.container}>

<ProfilCard
  welText="Welcome Back!"
  userName='jesse DONWAHOUE'
/>
      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="gray" style={styles.searchIcon} />
        <TextInput placeholder="Search tasks" style={styles.searchInput} />
        <Ionicons name="notifications-outline" size={20} color="green" style={styles.notificationIcon} />
      </View>

      {/* Liste des villes */}
      <FlatList
        data={cities}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cityList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.cityButton,
              item.id === selectedCity.id && styles.cityButtonSelected,
            ]}
            onPress={() => setSelectedCity(item)}
          >
            <Text
              style={[
                styles.cityButtonText,
                item.id === selectedCity.id && styles.cityButtonTextSelected,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Graphique */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartLegend}>
          <Text style={{ color: 'red' }}>● Collecte réalisée cette semaine</Text>{' '}
          <Text style={{ color: 'black' }}>● Collecte réalisée les semaines précédentes</Text>
        </Text>
        <BarChart
          data={{
            labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'],
            datasets: [
              { data: selectedCity.thisWeek, color: () => 'rgba(255, 99, 132, 1)' }, // Rouge
              { data: selectedCity.lastWeek, color: () => 'rgba(0, 0, 0, 1)' }, // Noir
            ],
          }}
          width={350}
          height={200}
          fromZero
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: () => 'gray',
            barPercentage: 0.5,
          }}
          style={styles.chart}
          showBarTops={false}
        />
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeAreaView: {
    flex:1,
    width:"100%",

  },
  container: {
    flex: 1,
   
    padding: 20,
  },


  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: '#2E8B57',
    fontWeight: '600',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.vert_rech,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  notificationIcon: {
    marginLeft: 10,
  },
  cityList: {
    marginBottom: 20,
  },
  cityButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  cityButtonSelected: {
    backgroundColor: '#004d40',
  },
  cityButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  cityButtonTextSelected: {
    color: '#f4f4f4',
  },
  chartContainer: {
    marginTop: 20,
  },
  chartLegend: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  chart: {
    borderRadius: 15,
  },
});
