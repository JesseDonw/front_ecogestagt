import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { useLocalSearchParams } from "expo-router";

// Clés API pour Android et iOS directement dans le code
const GOOGLE_MAPS_API_KEY_ANDROID = "AIzaSyABgK4WMfdlzYCyIGSrUcx1sLVkYivqFGE";
const GOOGLE_MAPS_API_KEY_IOS = "AIzaSyCflWYQ62JqOunKpFNRbOMvhUsLmC7KaeI";

const GOOGLE_MAPS_APIKEY = Platform.OS === 'android' ? GOOGLE_MAPS_API_KEY_ANDROID : GOOGLE_MAPS_API_KEY_IOS;

export default function MapScreen() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const { latitude, longitude } = useLocalSearchParams(); // Coordonnées de la maison

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission refusée");
        return;
      }

      // Suivi de la position en temps réel
      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, // Mise à jour toutes les 5 secondes
          distanceInterval: 10, // Mise à jour toutes les 10 mètres
        },
        (location) => {
          setCurrentLocation(location.coords);
          fetchRoute(location.coords.latitude, location.coords.longitude);
        }
      );

      return () => {
        locationSubscription.remove(); // Arrêter le suivi lors du démontage
      };
    })();
  }, []);

  const fetchRoute = async (startLat, startLng) => {
    const endpoint = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLat},${startLng}&destination=${latitude},${longitude}&mode=driving&key=${GOOGLE_MAPS_APIKEY}`;
    
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.routes.length) {
        // Convertir l'itinéraire en points GPS
        const points = decodePolyline(data.routes[0].overview_polyline.points);
        setRouteCoordinates(points);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'itinéraire :", error);
    }
  };

  // Fonction pour décoder la polyline de Google
  const decodePolyline = (encoded) => {
    let points = [];
    let index = 0, len = encoded.length;
    let lat = 0, lng = 0;

    while (index < len) {
      let b, shift = 0, result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += dlng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    return points;
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation
        followsUserLocation
      >
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

        <Marker
          coordinate={{
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          }}
          pinColor="gold"
          title="Maison de destination"
        />

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
        <Text style={styles.label}>📍 Ma position</Text>
        <Text style={styles.locationText}>Latitude: {currentLocation?.latitude}, Longitude: {currentLocation?.longitude}</Text>

        <Text style={styles.label}>🏠 Maison de destination</Text>
        <Text style={styles.locationText}>Latitude: {latitude}, Longitude: {longitude}</Text>

        <TouchableOpacity style={styles.validateButton}>
          <Text style={styles.buttonText}>Valider</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
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
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  locationText: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10,
  },
  validateButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
