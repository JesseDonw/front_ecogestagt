import React, { useState, useEffect, useRef, useMemo, useCallback, } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ActivityIndicator, Button } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { useLocalSearchParams } from 'expo-router';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Colors } from '../../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const GOOGLE_MAPS_API_KEY_ANDROID = "AIzaSyBTTAnxDhoifYOBsxW_C7ZyfmpU8LJMbT4";
const GOOGLE_MAPS_API_KEY_IOS = "AIzaSyBTTAnxDhoifYOBsxW_C7ZyfmpU8LJMbT4";

const GOOGLE_MAPS_APIKEY = Platform.OS === 'android' ? GOOGLE_MAPS_API_KEY_ANDROID : GOOGLE_MAPS_API_KEY_IOS;

export default function MapScreen() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const { latitude, longitude } = useLocalSearchParams()

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["15%", "25%"], []);

  // Coordonnées de la maison (exemple au Bénin : Cotonou)
  const destination = {
    latitude: parseFloat(latitude),  // Latitude de Cotonou
    longitude: parseFloat(longitude)  // Longitude de Cotonou
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
      // fetchRoute(coords.latitude, coords.longitude);
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

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        {/* {loading ? (
        <ActivityIndicator size="large" color="green" style={styles.loader} />
      ) : (
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation
          followsUserLocation
          compassOffset={{ x: 0, y: 80 }}
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
      )} */}

        {/* Bottom Sheet */}

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          enableDynamicSizing={false}
          onChange={handleSheetChange}
          backgroundStyle={styles.bottomWrapper}
        >
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.bottomContent}>
              <View style={styles.labelWrapper}>
                <Text
                  style={styles.marker}
                  backgroundColor={Colors.gradient33}
                >
                  <FontAwesome5
                    name="map-marker-alt"
                    size={20}
                    color={Colors.vert}
                  />
                </Text>
                <Text style={styles.label}>Ma position</Text>
              </View>
              {/* <Text style={styles.locationText}>
              Latitude: {currentLocation?.latitude}, Longitude: {currentLocation?.longitude}
            </Text> */}
              <View style={styles.labelWrapper}>
                <Text
                  style={styles.marker}
                  backgroundColor={Colors.markerBackgroundYellow}
                >
                  <FontAwesome5
                    name="map-marker-alt"
                    size={20}
                    color={Colors.orange_foncer}
                    style={{
                      alignSelf: "center"
                    }}
                  />
                </Text>
                <Text style={styles.label}>Maison de destination</Text>
              </View>
              {/* <Text style={styles.locationText}>
              Latitude: {destination.latitude}, Longitude: {destination.longitude}
            </Text> */}

              <TouchableOpacity style={styles.validateButton}>
                <Text style={styles.buttonText}>Valider</Text>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheet>
        {/* <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}
          backgroundStyle={{ backgroundColor: "red" }}
          onChange={handleSheetChange}
        >
          <View style={styles.bottomContent}>
            <Text style={styles.label}>📍 Ma position</Text>
            <Text style={styles.locationText}>
              Latitude: {currentLocation?.latitude}, Longitude: {currentLocation?.longitude}
            </Text>

            <Text style={styles.label}>🏠 Maison de destination</Text>
            <Text style={styles.locationText}>
              Latitude: {destination.latitude}, Longitude: {destination.longitude}
            </Text>

            {/* Bouton Valider (Affiché uniquement quand le bottom sheet est ouvert) 
            <TouchableOpacity style={styles.validateButton}>
              <Text style={styles.buttonText}>Valider</Text>
            </TouchableOpacity>
          </View>
        </BottomSheet> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    width: "100%",
  },
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
  bottomWrapper: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  contentContainer: {
    display: "flex"
  },
  bottomContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 10
  },
  labelWrapper: {
    alignSelf: "flex-start",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  marker: {
    height: 33,
    aspectRatio: 1 / 1,
    textAlign: "center",
   paddingTop: 6,
    borderRadius: 18,
  },
  label: {
    fontSize: 15,
    fontFamily: "AbhayaLibreMedium",
    marginBottom: 5,
    verticalAlign: "middle"
  },
  validateButton: {
    backgroundColor: 'transparent',
    backgroundColor: Colors.vert,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: "AbhayaLibreBold",
  },
});
