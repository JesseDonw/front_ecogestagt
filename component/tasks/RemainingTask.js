import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import RenderItemTask from '../RenderItemTask';
import NoTask from '../NoTask';

export default function RemainingTask({ taches, validateTask }) {
  const remainingTasks = taches.filter((tache) => tache.statut === 'en attente');

  return remainingTasks.length > 0 ? (
    <FlatList
      data={remainingTasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <RenderItemTask item={item} validateTask={validateTask} />
      )}
    />
  ) : (
    <NoTask message={"Aucune tâche restante pour l’instant"} />
  );
}
