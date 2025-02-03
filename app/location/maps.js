import { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from "react-native-maps";
import * as Location from "expo-location";
import { useLocalSearchParams, useFocusEffect } from "expo-router";
import { Colors } from '../../constants/Colors'
import FontAwesome from '@expo/vector-icons/FontAwesome';

const ORS_API_KEY = "5b3ce3597851110001cf6248ab9ab058321743eda1b69ca7b2258079"; // Remplace avec ta clé OpenRouteService

export default function MapScreen() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [mapRegion, setMapRegion] = useState(null);
  const { latitude, longitude } = useLocalSearchParams(); // Destination (maison)

  useFocusEffect(
    useCallback(() => {
      let locationSubscription;

      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission refusée");
          return;
        }

        // Réinitialiser l'état à chaque fois qu'on revient sur l'écran
        setCurrentLocation(null);
        setRouteCoordinates([]);

        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000,
            distanceInterval: 10,
          },
          (location) => {
            const { latitude: userLat, longitude: userLng } = location.coords;
            setCurrentLocation({ latitude: userLat, longitude: userLng });
            setMapRegion({
              latitude: userLat,
              longitude: userLng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
            fetchRoute(userLat, userLng);
          }
        );
      })();

      return () => {
        if (locationSubscription) {
          locationSubscription.remove();
        }
      };
    }, [latitude, longitude])
  );

  // Récupérer l'itinéraire avec OpenRouteService
  const fetchRoute = async (startLat, startLng) => {
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_API_KEY}&start=${startLng},${startLat}&end=${longitude},${latitude}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.features) {
        const points = data.features[0].geometry.coordinates.map(coord => ({
          latitude: coord[1],
          longitude: coord[0],
        }));
        setRouteCoordinates(points);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'itinéraire :", error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT} // Utilisation d'OpenStreetMap
        style={styles.map}
        region={mapRegion}
        onRegionChangeComplete={setMapRegion}
      >
        {/* Marqueur position actuelle */}
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            pinColor="green"
            title="Ma position"
          />
        )}

        {/* Marqueur destination */}
        <Marker
          coordinate={{
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          }}
          pinColor="gold"
          title="Maison de destination"
        />

        {/* Itinéraire en bleu */}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={4}
            strokeColor="blue"
          />
        )}
      </MapView>

      {/* Menu Modal en bas */}
      <View style={styles.bottomMenu}>
        <Text style={styles.label}>📍 Adresse de départ</Text>
        <Text style={styles.locationText}>
          {currentLocation ? `Latitude: ${currentLocation.latitude}, Longitude: ${currentLocation.longitude}` : "En attente..."}
        </Text>

        <Text style={styles.label}>🏠 Adresse de destination</Text>
        <Text style={styles.locationText}>
          Latitude: {latitude}, Longitude: {longitude}
        </Text>

        <TouchableOpacity style={styles.validateButton}>
          <Text style={styles.buttonText}>Valider</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  bottomMenu: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  label: { fontSize: 16, fontWeight: "bold" },
  locationText: { fontSize: 14, color: "gray", marginBottom: 10 },
  validateButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
