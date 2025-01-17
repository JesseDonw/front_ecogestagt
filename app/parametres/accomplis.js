import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";

export default function TaskCompletedScreen() {
  const tasks = [
    { id: "1", location: "Arconville", date: "Lundi 02 oct 2024" },
    { id: "2", location: "Arconville", date: "Lundi 02 oct 2024" },
    { id: "3", location: "Arconville", date: "Lundi 02 oct 2024" },
    { id: "4", location: "Arconville", date: "Lundi 02 oct 2024" },
    { id: "5", location: "Arconville", date: "Lundi 02 oct 2024" },
  ];

  const renderTask = ({ item }) => (
    <View style={styles.taskContainer}>
      <View>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <TouchableOpacity style={styles.validateButton}>
        <Text style={styles.validateText}>Valider</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  listContent: {
    padding: 15,
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  location: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#888",
  },
  validateButton: {
    backgroundColor: "#d3d3d3", // Couleur grise pour le bouton
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  validateText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
