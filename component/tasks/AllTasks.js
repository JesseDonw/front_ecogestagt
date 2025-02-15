import React from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RenderItemTask from '../RenderItemTask';
import { router } from 'expo-router';

export default function AllTasks({ taches, validateTask }) {
  return (
    <FlatList
      data={taches}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <RenderItemTask item={item} validateTask={validateTask} />
      )}
      ListEmptyComponent={<Text style={styles.emptyText}>Aucune tâche disponible </Text>}
    />
  );
}

const styles = StyleSheet.create({
  emptyText: {
    fontFamily: "AbhayaLibreRegular", 
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
});
