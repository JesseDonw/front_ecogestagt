import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { useLocalSearchParams, useRouter } from 'expo-router';

const GOOGLE_MAPS_API_KEY = "AIzaSyBTTAnxDhoifYOBsxW_C7ZyfmpU8LJMbT4";

export default function MapScreen() {
  const router = useRouter();
  const { latitude, longitude, taskId } = useLocalSearchParams();

  const [currentLocation, setCurrentLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [loading, setLoading] = useState(true);

  const destination = {
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission refusée", "Nous avons besoin de votre permission pour accéder à votre localisation.");
        setLoading(false);
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      setCurrentLocation(coords);
      await fetchRoutes(coords.latitude, coords.longitude);
    })();
  }, []);

  // Fusion des itinéraires Google Maps et OpenStreetMap
  const fetchRoutes = async (startLat, startLng) => {
    setLoading(true);
    const googleRoute = await fetchGoogleRoute(startLat, startLng);
    const osmRoute = await fetchOSMRoute(startLat, startLng);

    // Vérifie si les deux itinéraires sont disponibles
    if (googleRoute.length > 0 && osmRoute.length > 0) {
      // Choisir l'itinéraire avec le plus de points (généralement plus précis)
      setRouteCoordinates(googleRoute.length > osmRoute.length ? googleRoute : osmRoute);
    } else if (googleRoute.length > 0) {
      setRouteCoordinates(googleRoute);
    } else if (osmRoute.length > 0) {
      setRouteCoordinates(osmRoute);
    } else {
      Alert.alert("Erreur", "Impossible de récupérer l'itinéraire.");
    }
    setLoading(false);
  };

  // Itinéraire depuis Google Maps
  const fetchGoogleRoute = async (startLat, startLng) => {
    const endpoint = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLat},${startLng}&destination=${destination.latitude},${destination.longitude}&mode=driving&key=${GOOGLE_MAPS_API_KEY}`;
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      if (data.routes && data.routes.length > 0) {
        return decodePolyline(data.routes[0].overview_polyline.points);
      }
    } catch (error) {
      console.error("Erreur Google Maps :", error);
    }
    return [];
  };

  // Itinéraire depuis OpenStreetMap (via OSRM)
  const fetchOSMRoute = async (startLat, startLng) => {
    const endpoint = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${destination.longitude},${destination.latitude}?overview=full&geometries=geojson`;
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      if (data.routes && data.routes.length > 0) {
        return data.routes[0].geometry.coordinates.map(coord => ({
          latitude: coord[1],
          longitude: coord[0],
        }));
      }
    } catch (error) {
      console.error("Erreur OpenStreetMap :", error);
    }
    return [];
  };

  // Décodage de la polyline de Google Maps
  const decodePolyline = (encoded) => {
    let points = [];
    let index = 0, lat = 0, lng = 0;

    while (index < encoded.length) {
      let b, shift = 0, result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = (result & 1 ? ~(result >> 1) : (result >> 1));
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = (result & 1 ? ~(result >> 1) : (result >> 1));
      lng += dlng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    return points;
  };

  const handleValidateTask = async () => {
    try {
      const response = await fetch(`https://1889-137-255-38-133.ngrok-free.app/api/taches/${taskId}/validate`, {
        method: 'PUT',
      });

      if (response.ok) {
        Alert.alert("Succès", "La tâche a été validée avec succès !");
        router.push('/task');
      } else {
        const errorData = await response.json();
        Alert.alert("Erreur", errorData.message || "Impossible de valider la tâche.");
      }
    } catch (error) {
      console.error("Erreur lors de la validation de la tâche :", error);
      Alert.alert("Erreur", "Impossible de valider la tâche.");
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={currentLocation} title="Votre position" pinColor="green" />
          <Marker coordinate={destination} title="Destination" pinColor="red" />
          {routeCoordinates.length > 0 && (
            <Polyline coordinates={routeCoordinates} strokeWidth={4} strokeColor="blue" />
          )}
        </MapView>
      )}

      <TouchableOpacity style={styles.validateButton} onPress={handleValidateTask}>
        <Text style={styles.buttonText}>Valider</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  validateButton: {
    backgroundColor: 'green',
    padding: 15,
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    borderRadius: 10,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
