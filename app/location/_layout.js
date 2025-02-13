import { useRouter, Link, Tabs, Stack } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import Header from '../../component/Header';
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from '../../constants/Colors';

export default function MapLayout() {
    const router = useRouter();
    return(
        <Stack>
            <Stack.Screen 
             name="maps"
             options={{
                headerTransparent: true,
  headerTitle: "",
  headerLeft: () => (
    <Link href="/task" style={styles.wrapperBack}>
      <Entypo
        name="chevron-left"
        size={26}
        color={Colors.orange_foncer}
        onPress={() => {
          router.back();
        }}
      />
    </Link>
  ),
  headerRight: () => <View style={{ pointerEvents: "none" }} />,
             }}
            />
        </Stack>
    )

}

const styles = StyleSheet.create({
    wrapperBack: {
        backgroundColor: Colors.white,
        padding: 8,
        marginLeft: 2,
        borderRadius: 14,
    },
})