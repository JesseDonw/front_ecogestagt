import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Colors } from '../../constants/Colors';
import AllTasks from '../../component/tasks/AllTasks';
import TaskDone from '../../component/tasks/TaskDone';
import RemainingTask from '../../component/tasks/RemainingTask';
import CustomTabBar from '../../component/CustomTabBar';
import { useFocusEffect } from 'expo-router';



export default function Taches() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'toutes', title: 'Toutes' },
    { key: 'faites', title: 'Faites' },
    { key: 'restantes', title: 'Restantes' },
  ]);

  const [taches, setTaches] = useState([]);

  // 🔄 Récupération des tâches depuis l'API
  const fetchTasks = async () => {
    try {
      const response = await fetch('https://ecogest1-69586dbc1b71.herokuapp.com/api/taches');
      const data = await response.json();
      setTaches(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des tâches :", error);
    }
  };

  //useEffect(() => {
   //fetchTasks();  // Charger les tâches au démarrage
  //}, []);

  useFocusEffect(
    useCallback(() => {
      fetchTasks(); // Charger les tâches à chaque fois que l'écran est affiché
    }, [])
  );

  const validateTask = async (id) => {
    try {
      const response = await fetch(`https://ecogest1-69586dbc1b71.herokuapp.com/api/taches/${id}/validate`, {
        method: 'PUT',
      });
      const updatedTask = await response.json();

      // Mettre à jour l'état local des tâches après validation
      setTaches((prevTaches) =>
        prevTaches.map((tache) =>
          tache.id === id ? { ...tache, statut: 'terminée' } : tache
        )
      );
    } catch (error) {
      console.error('Erreur lors de la validation de la tâche :', error);
    }
  };

  const Toutes = () => <AllTasks taches={taches} validateTask={validateTask} />;
  const Faites = () => <TaskDone taches={taches} validateTask={validateTask} />;
  const Restantes = () => <RemainingTask taches={taches} validateTask={validateTask} />;

  const renderScene = SceneMap({
    toutes: Toutes,
    faites: Faites,
    restantes: Restantes,
  });

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => <CustomTabBar index={index} {...props} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
