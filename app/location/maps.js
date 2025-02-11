import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

const GOOGLE_MAPS_API_KEY_ANDROID = "AIzaSyBTTAnxDhoifYOBsxW_C7ZyfmpU8LJMbT4";
const GOOGLE_MAPS_API_KEY_IOS = "AIzaSyBTTAnxDhoifYOBsxW_C7ZyfmpU8LJMbT4";

const GOOGLE_MAPS_APIKEY = Platform.OS === 'android' ? GOOGLE_MAPS_API_KEY_ANDROID : GOOGLE_MAPS_API_KEY_IOS;

export default function MapScreen() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);

  // Coordonnées de la maison (exemple au Bénin : Cotonou)
  const destination = {
    latitude: 6.3703,  // Latitude de Cotonou
    longitude: 2.3912  // Longitude de Cotonou
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission refusée");
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setCurrentLocation(coords);
      fetchRoute(coords.latitude, coords.longitude);
    })();
  }, []);

  const fetchRoute = async (startLat, startLng) => {
    const endpoint = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLat},${startLng}&destination=${destination.latitude},${destination.longitude}&mode=driving&alternatives=true&key=${GOOGLE_MAPS_APIKEY}`;
    
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      console.log("API Directions Response:", data);

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const points = decodePolyline(route.overview_polyline.points);
        setRouteCoordinates(points);

        // Zoom pour afficher tout l'itinéraire
        const bounds = route.bounds;
        setRegion({
          latitude: (bounds.northeast.lat + bounds.southwest.lat) / 2,
          longitude: (bounds.northeast.lng + bounds.southwest.lng) / 2,
          latitudeDelta: Math.abs(bounds.northeast.lat - bounds.southwest.lat) * 1.5,
          longitudeDelta: Math.abs(bounds.northeast.lng - bounds.southwest.lng) * 1.5,
        });
        setLoading(false);
      } else {
        console.error("Aucune route trouvée :", data.status);
        setLoading(false);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'itinéraire :", error);
      setLoading(false);
    }
  };

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
      {loading ? (
        <ActivityIndicator size="large" color="green" style={styles.loader} />
      ) : (
        <MapView
          style={styles.map}
          region={region}
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
            coordinate={destination}
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
      )}

      <View style={styles.bottomMenu}>
        <Text style={styles.label}>📍 Ma position</Text>
        <Text style={styles.locationText}>Latitude: {currentLocation?.latitude}, Longitude: {currentLocation?.longitude}</Text>

        <Text style={styles.label}>🏠 Maison de destination</Text>
        <Text style={styles.locationText}>Latitude: {destination.latitude}, Longitude: {destination.longitude}</Text>

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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomMenu: {
    position: "absolute",
    bottom:  0,
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
