import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
// import { BarChart } from 'react-native-chart-kit';
import person from '../../assets/pers.png';
import ProfilCard from '../../component/ProfilCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { Badge } from 'react-native-paper';
import BarChart from '../../component/BarChart';

export default function App() {
  const router = useRouter();

  // Liste des villes
  const [cities, setCities] = useState([
    { id: 1, name: 'CALAVI', thisWeek: [50, 20, 10, 30, 40, 7, 7], lastWeek: [30, 40, 20, 25, 35, 30, 40, 20, 25, 35, 30, 40, 20, 25] },
    { id: 2, name: 'COTONOU', thisWeek: [30, 40, 20, 60, 80, 7, 7], lastWeek: [20, 25, 15, 50, 60, 20, 25, 15, 50, 60, 20, 25, 15, 50] },
    { id: 3, name: 'SEME-PODJI', thisWeek: [70, 50, 30, 90, 100, 7, 7], lastWeek: [60, 45, 25, 80, 90, 60, 45, 25, 80, 90, 60, 45, 25, 80] },
    { id: 4, name: 'OUIDAH', thisWeek: [20, 30, 10, 50, 60, 7, 7], lastWeek: [15, 25, 5, 40, 50, 15, 25, 5, 40, 50, 15, 25, 5, 40] },
    { id: 5, name: 'ABOMEY', thisWeek: [10, 70, 60, 30, 40, 7, 7], lastWeek: [5, 60, 50, 20, 30, 5, 60, 50, 20, 30, 5, 60, 50, 20] },
  ]);

  const [selectedCity, setSelectedCity] = useState(cities[0]); // Ville sélectionnée

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <ProfilCard
          welText="Bienvenue!"
          userName='jesse DONWAHOUE'
        />
        {/* Barre de recherche */}
        <View style={styles.searchContainerWrapper}>
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color={Colors.vert_select} style={styles.searchIcon} />
            <TextInput placeholder="Rechercher une tâche" style={styles.searchInput} />
          </View>

          <View style={{position: "relative"}}>
            <Ionicons
            name="notifications-outline"
            size={22}
            color={Colors.gradient}
            style={styles.notificationIcon}
            onPress={() => router.push("/notification/notif")}
          />
          <Badge size={19} style={{position:"absolute", top: 0, right:0, backgroundColor: Colors.danger}} visible={true}>3</Badge>
          </View>
        </View>

        {/* Liste des villes */}
        <FlatList
          data={cities}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
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
            <Text style={[styles.legendText, { color: Colors.redGraph}]}>● Collecte réalisée cette semaine</Text>{'\n'}
            <Text style={[styles.legendText, { color: Colors.blackGraph}]}>● Collecte réalisée les semaines précédentes</Text>
          </Text>
          <BarChart
          previousData={selectedCity.lastWeek}
          currentData={selectedCity.thisWeek}
          barWidth={3.06}
          barSpacing={11}
          cornerRadius={3.06}
          />
          {/* <BarChart
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
          /> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeAreaView: {
    flex: 1,
    width: "100%",
    fontFamily: "AbhayaLibreRegular",
  },
  container: {
    flex: 1,

    padding: 20,
  },

  searchContainerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.vert_rech,
    borderRadius: 15,
    paddingHorizontal: 10,
    flex: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    height: 40,
    flex: 1,
    fontFamily: "AbhayaLibreRegular",
    fontSize: 15,
    lineHeight: 15,
    paddingRight: 8,
  },
  notificationIcon: {
    backgroundColor: Colors.gris_notif,
    padding: 8.1,
    borderRadius: 15,
    marginHorizontal: 4,
    position: "relative"
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
    fontFamily: "AbhayaLibreRegular",
  },
  cityButtonTextSelected: {
    color: '#f4f4f4',
  },
  chartContainer: {
    marginTop: 20,
    backgroundColor: Colors.graphBackground,
    borderRadius: 16,
    paddingTop: 8
  },
  chartLegend: {
    textAlign: 'center',
    marginVertical: 5,
  },
  chart: {
    borderRadius: 15,
  },
  legendText: {
    fontFamily: "AbhayaLibreRegular",
    fontSize: 14,
    lineHeight: 14
  }
});
