import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import ProfilCard from '../../component/ProfilCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { Badge } from 'react-native-paper';
import BarChart from '../../component/BarChart';
import PuceList from '../../component/PuceList';
import axios from 'axios';

const colorsList = ['#30D080', '#53B986', '#98E8C0', '#1C4D34'];

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

  const [search, setSearch] = useState("")
  console.log('search :>> ', search);
  const filteredCities = [...(search ?
    cities.filter(city => city.name.toLocaleLowerCase().includes(search?.toLowerCase()))
    : cities)].sort((a, b) => (a.name < b.name) ? -1 : 1)
  console.log('filteredCities :>> ', filteredCities);

  const [selectedCity, setSelectedCity] = useState(cities[0]); // Ville sélectionnée
  const [profile, setProfile] = useState([])

  const fetchProfile = async () => {
    try {
      //const response = await axios.get('userProfile');
      //if (storedProfile) {
      //  setProfile(JSON.parse(storedProfile));
      //}
    } catch (error) {
      console.error("Erreur lors de la récupération du profil :", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <ProfilCard
          welText="Bienvenue!"
          name='Agent'
          prenom='Ag'
          email='agent@gmail.com'
          image="https://ui-avatars.com/api/?name=AG&background=0D8ABC&color=fff&size=80"
        />
        {/* Barre de recherche */}
        <View style={styles.searchContainerWrapper}>
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color={Colors.vert_select} style={styles.searchIcon} />
            <TextInput cursorColor={Colors.vert} value={search} onChangeText={(e) => setSearch(e)} placeholder="Rechercher une tâche" style={styles.searchInput} />
          </View>

          <TouchableOpacity activeOpacity={1} onPress={() => router.push("/notification/notif")} style={{ position: "relative" }}>
            <Ionicons
              name="notifications-outline"
              size={22}
              color={Colors.gradient}
              style={styles.notificationIcon}
            />
            <Badge size={19} style={{ position: "absolute", top: 0, right: 0, backgroundColor: Colors.danger }} visible={true}>3</Badge>
          </TouchableOpacity>
        </View>

        {/* Liste des villes */}
        <FlatList
          data={filteredCities}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.cityList}
          renderItem={({ item, index }) => (
            <TouchableOpacity

              style={[
                styles.cityButton,
                { backgroundColor: colorsList[index % colorsList.length] },
                item.id === selectedCity.id && styles.cityButtonSelected,
                index !== 0 && { marginTop: -(index + 2), zIndex: item.id === selectedCity.id ? index : -index },
              ]}
              onPress={() => setSelectedCity(item)}
              activeOpacity={0.7}
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
          <View style={styles.chartLegend}>
            <PuceList dotColor={Colors.redGraph} textColor={Colors.noir} text={"Collecte réalisée cette semaine"} />
            <PuceList dotColor={Colors.blackGraph} textColor={Colors.noir} text={"Collecte réalisée les semaines précédentes"} />
          </View>
          <BarChart
            previousData={selectedCity.lastWeek}
            currentData={selectedCity.thisWeek}
            barWidth={3.06}
            barSpacing={11}
            cornerRadius={3.06}
          />
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
    marginVertical: 16,
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
    backgroundColor: Colors.vert_rech,
    padding: 8.1,
    borderRadius: 15,
    marginHorizontal: 4,
    position: "relative"
  },
  cityList: {
  },
  cityButton: {
    backgroundColor: Colors.gradient_foncer,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 22,
    marginHorizontal: 5,
  },
  cityButtonSelected: {
    backgroundColor: Colors.vert_select,
  },
  cityButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: "AbhayaLibreRegular",
  },
  cityButtonTextSelected: {
    color: Colors.gris,
  },
  chartContainer: {
    marginTop: 18,
    backgroundColor: Colors.graphBackground,
    borderRadius: 16,
    paddingTop: 6
  },
  chartLegend: {
    textAlign: 'center',
  },
  chart: {
    borderRadius: 15,
  },
});
