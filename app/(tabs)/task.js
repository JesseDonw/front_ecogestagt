import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Colors } from '../../constants/Colors';
import AllTasks from '../../component/tasks/AllTasks';
import TaskDone from '../../component/tasks/TaskDone';
import RemainingTask from '../../component/tasks/RemainingTask';
import CustomTabBar from '../../component/CustomTabBar';

export default function Taches() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'toutes', title: 'Toutes' },
    { key: 'faites', title: 'Faites' },
    { key: 'restantes', title: 'Restantes' },
  ]);

  const [taches, setTaches] = useState([
    { id: '1', title: 'Zogbadje', date: 'Lundi 02 oct 2024', valid: false },
    { id: '2', title: 'Arconville', date: 'Lundi 02 oct 2024', valid: false },
  ]);

  const validateTask = (id) => {
    setTaches((prevTaches) =>
      prevTaches.map((tache) =>
        tache.id === id ? { ...tache, valid: true } : tache
      )
    );
  };

  const Toutes = () => (
    <AllTasks taches={taches} validateTask={validateTask} />
  );

  const Faites = () => (
    <TaskDone taches={taches} validateTask={validateTask} />
  );

  const Restantes = () => (
    <RemainingTask taches={taches} validateTask={validateTask} />
  );

  
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
