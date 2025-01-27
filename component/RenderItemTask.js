import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Colors } from '../constants/Colors';

export default function RenderItemTask({item, validateTask}) {
    return (
        <View style={styles.taskCard}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDate}>{item.date}</Text>
            <TouchableOpacity
                style={[styles.validateButton, item.valid ? styles.valid : styles.invalid]}
                onPress={() => validateTask(item.id)}
                disabled={item.valid}
            >
                <Text style={styles.buttonText}>{item.valid ? 'Validée' : 'Valider'}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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