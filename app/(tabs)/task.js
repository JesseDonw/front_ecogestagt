import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Colors } from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import AllTasks from '../../component/tasks/AllTasks';

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

  const Toutes = (item) => (
    <AllTasks item={item} taches={taches} validateTask={validateTask} />
  );

  const Faites = () => {
    const doneTasks = taches.filter((tache) => tache.valid);
    return doneTasks.length > 0 ? (
      <FlatList
        data={doneTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDate}>{item.date}</Text>
          </View>
        )}
      />
    ) : (
      <View style={styles.scene}>
        <Text style={styles.placeholderText}>Aucune tâche faite pour l’instant.</Text>
      </View>
    );
  };

  const Restantes = () => {
    const remainingTasks = taches.filter((tache) => !tache.valid);
    return remainingTasks.length > 0 ? (
      <FlatList
        data={remainingTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDate}>{item.date}</Text>
          </View>
        )}
      />
    ) : (
      <View style={styles.scene}>
        <Text style={styles.placeholderText}>Aucune tâche restante pour l’instant.</Text>
      </View>
    );
  };

  const CustomTabBar = ({ navigationState, jumpTo }) => {
    return (
      <View style={styles.customTabBar}>
        {navigationState.routes.map((route, i) => {
          const focused = index === i;
          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => jumpTo(route.key)}
              style={[
                styles.tabItem,
                focused && styles.tabItemFocused,
              ]}
            >
              <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
                {route.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

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
        renderTabBar={(props) => <CustomTabBar {...props} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  customTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  tabItem: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: Colors.vert_unselect + '10',
  },
  tabItemFocused: {
    backgroundColor: Colors.vert,
  },

  tabLabel: {
    fontFamily: "AbhayaLibreSemiBold",
    fontSize: 15,
    color: Colors.vert_unselect,
  },
  tabLabelFocused: {
    color: Colors.white,
    fontFamily: "AbhayaLibreExtraBold",
  },




  taskCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    //boxShadow: "0px 0px 10px #00000033",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
  },
  taskTitle: {
    fontFamily: "AbhayaLibreExtraBold",
    fontSize: 16,
    color: Colors.noir,
  },
  taskDate: {
    fontFamily: "AbhayaLibreRegular",
    fontSize: 14,
    color: Colors.noir_fondu,
    marginVertical: 4,
  },
  validateButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    alignItems: 'center',
  },
  valid: {
    backgroundColor: Colors.gris_foncer,
  },
  invalid: {
    backgroundColor: Colors.gradient,
  },
  buttonText: {
    color: Colors.white,
    fontFamily: "AbhayaLibreSemiBold",
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
  },
});
