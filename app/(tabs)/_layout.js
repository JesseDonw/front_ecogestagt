import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="home"
                options={{ title: 'Accueil', tabBarIcon: ({ color }) => <FontAwesome name="home" color={color} size={24} /> }}
            />
            <Tabs.Screen
                name="profile"
                options={{ title: 'Profil', tabBarIcon: ({ color }) => <FontAwesome name="user" color={color} size={24} /> }}
            />
            <Tabs.Screen
                name="task"
                options={{ title: 'Tâches', tabBarIcon: ({ color }) => <FontAwesome name="list" color={color} size={24} /> }}
            />
            <Tabs.Screen
                name="chat"
                options={{ title: 'Chat', tabBarIcon: ({ color }) => <FontAwesome name="comment" color={color} size={24} /> }}
            />
        </Tabs>
    );
}
