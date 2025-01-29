import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';

export default function CustomTabBar({index, navigationState, jumpTo }) {

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
});
