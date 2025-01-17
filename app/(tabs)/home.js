import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { BarChart } from 'react-native-chart-kit';

export default function App() {
  const router = useRouter();

  // Liste des villes
  const [cities, setCities] = useState([
    { id: 1, name: 'CALAVI', data: [50, 20, 10, 30, 40] },
    { id: 2, name: 'COTONOU', data: [30, 40, 20, 60, 80] },
    { id: 3, name: 'SEME-PODJI', data: [70, 50, 30, 90, 100] },
    { id: 4, name: 'OUIDAH', data: [20, 30, 10, 50, 60] },
    { id: 5, name: 'ABOMEY', data: [10, 70, 60, 30, 40] },
  ]);

  const [selectedCity, setSelectedCity] = useState(cities[0]); // Ville sélectionnée

  return (
    <View style={styles.container}>
      {/* Profil utilisateur */}
      <View style={styles.profileContainer}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <View style={styles.profileDetails}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }} // Remplacez par l'URL de votre image
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.profileName}>Jesse DONWAHOUE</Text>
          </View>
        </View>
      </View>

      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="gray" style={styles.searchIcon} />
        <TextInput placeholder="Search tasks" style={styles.searchInput} />
        <Ionicons name="notifications-outline" size={20} color={Colors.vert} style={styles.notificationIcon} />
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
            datasets: [{ data: selectedCity.data }],
          }}
          width={350}
          height={200}
          fromZero
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: () => 'gray',
            barPercentage: 0.7,
          }}
          style={styles.chart}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f4f4f4',
    padding: 20,
    borderRadius: 15,
  },
  welcomeText: {
    fontSize: 18,
    color: Colors.vert,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
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
    fontFamily: 'AbhayaLibreExtraBold',
  },
  notificationIcon: {
    marginLeft: 10,
  },
  cityList: {
    marginBottom: 20,
  },
  cityButton: {
    backgroundColor: Colors.vert,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  cityButtonSelected: {
    backgroundColor: '#004d40',
  },
  cityButtonText: {
    fontFamily: 'AbhayaLibreExtraBold',
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
    fontFamily: 'AbhayaLibreExtraBold',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  chart: {
    borderRadius: 15,
  },
});
