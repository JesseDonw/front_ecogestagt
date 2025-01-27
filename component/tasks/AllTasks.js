import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Colors } from '../../constants/Colors';
import RenderItemTask from '../RenderItemTask';

export default function AllTasks ({taches, validateTask}) {
    return (
        <FlatList
              data={taches}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <RenderItemTask item={item} validateTask={validateTask}/>
              )}
            />
      );
}

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 10,
    elevation: 2,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.noir,
  },
  taskDate: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
  },
  validateButton: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  valid: {
    backgroundColor: Colors.gradient33,
  },
  invalid: {
    backgroundColor: '#d3d3d3',
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
});