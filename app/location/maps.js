import React, { useState, useEffect, useRef, useMemo, useCallback, } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ActivityIndicator, Button, Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { useLocalSearchParams, useRouter } from 'expo-router';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from '../../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Animated } from 'react-native';

const GOOGLE_MAPS_API_KEY_ANDROID = "AIzaSyBTTAnxDhoifYOBsxW_C7ZyfmpU8LJMbT4";
const GOOGLE_MAPS_API_KEY_IOS = "AIzaSyBTTAnxDhoifYOBsxW_C7ZyfmpU8LJMbT4";

const GOOGLE_MAPS_APIKEY = Platform.OS === 'android' ? GOOGLE_MAPS_API_KEY_ANDROID : GOOGLE_MAPS_API_KEY_IOS;
const { height } = Dimensions.get("window")
console.log('height :>> ', height);
export default function MapScreen() {
  const router = useRouter();
  const { latitude, longitude, taskId } = useLocalSearchParams();

  const [currentLocation, setCurrentLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["15%", "25%"], []);
  const mapRef = useRef(null);

  const [mapType, setMapType] = useState("standard");
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [isActive, setIsActive] = useState(false);
  const [region, setRegion] = useState(null);

  const toggleMapType = () => {
    setMapType((prevType) =>
      prevType === "standard" ? "satellite" : "standard"
    );
  };

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    setIsActive(!isActive)
    toggleMapType();
  };

  const destination = {
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude)
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

  useEffect(() => {
    if (currentLocation) {
      bottomSheetRef.current?.snapToIndex(0); // Affiche le BottomSheet après récupération de la position
      console.log('currentLocation :>> ', currentLocation);
    }
  }, [currentLocation]);

  // Fusion des itinéraires Google Maps et OpenStreetMap
  const fetchRoutes = async (startLat, startLng) => {
    setLoading(true);
    const {googleRoute, boundsGoogle} = await fetchGoogleRoute(startLat, startLng);
    const {osmRoute, boundsOsm} = await fetchOSMRoute(startLat, startLng);

    console.log(' boundsGoogle, boundsOsm :>> ',  boundsGoogle, boundsOsm);

    // Vérifie si les deux itinéraires sont disponibles
    if (googleRoute.length > 0 && osmRoute.length > 0) {
      // Choisir l'itinéraire avec le plus de points (généralement plus précis)
      if(googleRoute.length > osmRoute.length){
        setRouteCoordinates(googleRoute)
        setRegion({
          latitude: (boundsGoogle.northeast.lat + boundsGoogle.southwest.lat) / 2,
          longitude: (boundsGoogle.northeast.lng + boundsGoogle.southwest.lng) / 2,
          latitudeDelta: Math.abs(boundsGoogle.northeast.lat - boundsGoogle.southwest.lat) * 1.5,
          longitudeDelta: Math.abs(boundsGoogle.northeast.lng - boundsGoogle.southwest.lng) * 1.5,
        });
      } else {
        setRouteCoordinates(osmRoute)
        setRegion({
          latitude: (boundsOsm.northeast.lat + boundsOsm.southwest.lat) / 2,
          longitude: (boundsOsm.northeast.lng + boundsOsm.southwest.lng) / 2,
          latitudeDelta: Math.abs(boundsOsm.northeast.lat - boundsOsm.southwest.lat) * 1.5,
          longitudeDelta: Math.abs(boundsOsm.northeast.lng - boundsOsm.southwest.lng) * 1.5,
        });
      }
      // setRouteCoordinates(googleRoute.length > osmRoute.length ? googleRoute : osmRoute);
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
    const endpoint = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLat},${startLng}&destination=${destination.latitude},${destination.longitude}&mode=driving&key=${GOOGLE_MAPS_APIKEY}`;
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log("API Directions Response:", data.routes[0]);
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const googleRoute = decodePolyline(route.overview_polyline.points);
        const boundsGoogle = route.bounds;
        return { googleRoute, boundsGoogle };
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
      console.log('data osrm:>> ', data.routes[0]);
      if (data.routes && data.routes.length > 0) {
        const osmRoute = data.routes[0].geometry.coordinates.map(coord => ({
          latitude: coord[1],
          longitude: coord[0],
        }));

        // Calculer les limites (bounds) de l'itinéraire
        const latitudes = osmRoute.map(coord => coord.latitude);
        const longitudes = osmRoute.map(coord => coord.longitude);

        const boundsOsm = {
          northeast: {
            lat: Math.max(...latitudes),
            lng: Math.max(...longitudes),
          },
          southwest: {
            lat: Math.min(...latitudes),
            lng: Math.min(...longitudes),
          },
        };

        return { osmRoute, boundsOsm };
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

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);

  const handleCenterPress = () => {
    if (currentLocation) {
      mapRef.current?.animateCamera({
        center: {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude
        },
        zoom: 15
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.vert} style={styles.loader} />
        ) : (
          <>
            <MapView
              style={styles.map}
              region={region}
              showsUserLocation
              followsUserLocation
              compassOffset={{ x: 0, y: 80 }}
              showsMyLocationButton={false}
              ref={mapRef}
              mapType={mapType}
            >

              {currentLocation && (
                <Marker
                  coordinate={{
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                  }}
                  pinColor={Colors.vert}
                  title="Ma position"
                />
              )}

              <Marker
                coordinate={destination}
                pinColor={Colors.orange_foncer}
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
            {/* Bouton de recentrage */}
            <TouchableOpacity style={styles.centerButton} onPress={handleCenterPress}>
              <MaterialIcons name="my-location" size={24} color={Colors.vert} />
            </TouchableOpacity>

            {/* Bouton de carte */}
            <TouchableOpacity onPress={handlePress} style={styles.mapTypeButton}>
              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <FontAwesome5 name="map" size={24} color={isActive ? Colors.vert : "black"} />
              </Animated.View>
            </TouchableOpacity>
          </>
        )}


        {/* Bottom Sheet */}

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          enableDynamicSizing={false}
          onChange={handleSheetChange}
          backgroundStyle={styles.bottomWrapper}
          index={0}
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

              <TouchableOpacity style={styles.validateButton}>
                <Text style={styles.buttonText}>Valider</Text>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheet>
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
  centerButton: {
    position: "absolute",
    top: height / 2,
    right: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  mapTypeButton: {
    position: "absolute",
    top: (height / 2) + 70,
    right: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  }
});
